<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use App\Models\AcademicLevel;
use App\Models\Addon;
use App\Models\BasePricing;
use App\Models\DeadlineOption;
use App\Models\Order;
use App\Models\SubjectCategory;
use App\Services\OrderPricingService;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use App\Http\Resources\OrderResource;

class OrderController extends Controller
{
    protected $pricingService;

    public function __construct(OrderPricingService $pricingService)
    {
        $this->pricingService = $pricingService;
        $this->middleware(['auth', 'verified']);
    }

    public function index(Request $request)
    {
        $filters = $request->only(['status', 'search']);
        $user = $request->user();

        $orders = $user->orders()
            ->with(['subjectCategory', 'academicLevel'])
            ->when($filters['status'] ?? null, function ($query, $status) {
                $query->where('status', $status);
            })
            ->when($filters['search'] ?? null, function ($query, $search) {
                $query->where(function ($query) use ($search) {
                    $query->where('title', 'like', "%{$search}%")
                        ->orWhere('id', 'like', "%{$search}%");
                });
            })
            ->latest()
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('Client/Orders/Index', [
            'orders' => OrderResource::collection($orders),
            'filters' => $filters,
            'auth' => [
                'user' => [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'role' => $user->role,
                    'email_verified_at' => $user->email_verified_at,
                    'created_at' => $user->created_at,
                    'updated_at' => $user->updated_at,
                ]
            ]
        ]);
    }

    public function create()
    {
        $pricingData = $this->pricingService->getPricingData();

        return Inertia::render('Client/Orders/Create', [
            'pricingData' => $pricingData
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'assignment_type' => 'required|string',
            'service_type' => 'required|string',
            'academic_level' => 'required|string',
            'language' => 'required|string',
            'pages' => 'required|integer|min:1',
            'words' => 'required|integer|min:275',
            'line_spacing' => 'required|string|in:single,double,1.5',
            'deadline' => 'required|date|after:now',
            'instructions' => 'required|string',
            'client_notes' => 'nullable|string',
            'is_urgent' => 'boolean',
            'size_unit' => 'required|string|in:pages,words',
            'addons' => 'array',
            'addons.*' => 'string',
            'subject' => 'required|string',
            'files' => 'array',
            'files.*' => 'file|max:10240', // 10MB max per file
            'source_count' => 'required|string',
            'citation_style' => 'required|string',
        ]);

        try {
            DB::beginTransaction();

            $order = $request->user()->orders()->create([
                'title' => $validated['instructions'],
                'description' => $validated['client_notes'],
                'status' => 'pending',
                'academic_level_id' => $validated['academic_level'],
                'subject_category_id' => $validated['subject'],
                'deadline' => $validated['deadline'],
                'pages' => $validated['pages'],
                'words' => $validated['words'],
                'line_spacing' => $validated['line_spacing'],
                'language' => $validated['language'],
                'citation_style' => $validated['citation_style'],
                'source_count' => $validated['source_count'],
                'total_amount' => $this->pricingService->calculatePrice($validated),
            ]);

            // Handle file uploads
            if ($request->hasFile('files')) {
                foreach ($request->file('files') as $file) {
                    $path = $file->store('order-files');
                    $order->files()->create([
                        'name' => $file->getClientOriginalName(),
                        'path' => $path,
                        'size' => $file->getSize(),
                    ]);
                }
            }

            // Attach addons
            if (!empty($validated['addons'])) {
                $order->addons()->attach($validated['addons']);
            }

            DB::commit();

            return redirect()->route('client.orders.show', $order)
                ->with('success', 'Order created successfully.');
        } catch (\Exception $e) {
            DB::rollBack();
            return back()->with('error', 'Failed to create order. Please try again.');
        }
    }

    public function show(Order $order)
    {
        $this->authorize('view', $order);

        $order->load([
            'subjectCategory',
            'academicLevel',
            'addons',
            'files',
            'messages.sender',
            'messages.attachments'
        ]);

        // Debug the order data
        Log::info('Order data:', ['order' => $order->toArray()]);

        return Inertia::render('Client/Orders/Show', [
            'order' => $order,
            'auth' => [
                'user' => Auth::user()
            ]
        ]);
    }

    public function edit(Order $order)
    {
        $this->authorize('update', $order);

        $order->load(['subjectCategory', 'academicLevel', 'deadlineOption', 'addons', 'files']);

        return Inertia::render('Client/Orders/Edit', [
            'order' => $order,
            'academicLevels' => AcademicLevel::active()->orderBy('display_order')->get(),
            'deadlineOptions' => DeadlineOption::active()->orderBy('display_order')->get(),
            'addons' => Addon::active()->orderBy('display_order')->get(),
            'subjectCategories' => SubjectCategory::active()->orderBy('display_order')->get(),
            'basePricing' => BasePricing::active()->first(),
        ]);
    }

    public function update(Request $request, Order $order)
    {
        $this->authorize('update', $order);

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'subject_category_id' => 'required|exists:subject_categories,id',
            'academic_level_id' => 'required|exists:academic_levels,id',
            'deadline_option_id' => 'required|exists:deadline_options,id',
            'pages' => 'required|integer|min:1',
            'spacing' => 'required|in:single,double',
            'addon_ids' => 'nullable|array',
            'addon_ids.*' => 'exists:addons,id',
            'files' => 'nullable|array',
            'files.*' => 'file|max:10240', // 10MB max per file
        ]);

        $pricingService = new OrderPricingService();
        $pricing = $pricingService->calculatePrice(
            $validated['pages'],
            $validated['academic_level_id'],
            $validated['deadline_option_id'],
            $validated['spacing'],
            $validated['addon_ids'] ?? []
        );

        DB::beginTransaction();

        try {
            $order->update([
                'title' => $validated['title'],
                'description' => $validated['description'],
                'subject_category_id' => $validated['subject_category_id'],
                'academic_level_id' => $validated['academic_level_id'],
                'deadline_option_id' => $validated['deadline_option_id'],
                'pages' => $validated['pages'],
                'spacing' => $validated['spacing'],
                'total_amount' => $pricing['total'],
            ]);

            $order->addons()->sync($validated['addon_ids'] ?? []);

            if ($request->hasFile('files')) {
                foreach ($request->file('files') as $file) {
                    $path = $file->store('order-files');
                    $order->files()->create([
                        'name' => $file->getClientOriginalName(),
                        'path' => $path,
                        'size' => $file->getSize(),
                    ]);
                }
            }

            DB::commit();

            return redirect()->route('client.orders.show', $order)
                ->with('success', 'Order updated successfully.');
        } catch (\Exception $e) {
            DB::rollBack();
            throw $e;
        }
    }

    public function requestRevision(Order $order, Request $request)
    {
        $this->authorize('requestRevision', $order);

        $validated = $request->validate([
            'revision_comments' => 'required|string',
            'files' => 'array',
            'files.*' => 'file|max:10240',
        ]);

        try {
            DB::beginTransaction();

            $order->update([
                'status' => 'revision',
                'revision_requested_at' => now(),
            ]);

            // Create revision message
            $order->messages()->create([
                'sender_id' => $request->user()->id,
                'message' => $validated['revision_comments'],
                'type' => 'revision',
            ]);

            // Handle file uploads
            if ($request->hasFile('files')) {
                foreach ($request->file('files') as $file) {
                    $path = $file->store('order-files');
                    $order->files()->create([
                        'name' => $file->getClientOriginalName(),
                        'path' => $path,
                        'size' => $file->getSize(),
                        'type' => 'revision',
                    ]);
                }
            }

            DB::commit();

            return back()->with('success', 'Revision requested successfully.');
        } catch (\Exception $e) {
            DB::rollBack();
            return back()->with('error', 'Failed to request revision. Please try again.');
        }
    }

    public function cancel(Order $order)
    {
        $this->authorize('cancel', $order);

        $order->update(['status' => 'cancelled']);

        return back()->with('success', 'Order cancelled successfully.');
    }

    public function approve(Order $order)
    {
        $this->authorize('approve', $order);

        $order->update([
            'status' => 'completed',
            'completed_at' => now(),
        ]);

        return back()->with('success', 'Order approved and marked as completed.');
    }

    /**
     * Save a new draft order for the authenticated user.
     */
    public function saveDraft(Request $request)
    {
        $user = $request->user();
        // Only one draft per user (optional: update if exists)
        $existingDraft = $user->orders()->where('status', 'draft')->first();
        if ($existingDraft) {
            return $this->updateDraft($request, $existingDraft);
        }
        $validated = $request->validate([
            'assignment_type' => 'nullable|string',
            'service_type' => 'nullable|string',
            'academic_level' => 'nullable|string',
            'language' => 'nullable|string',
            'pages' => 'nullable|integer|min:1',
            'words' => 'nullable|integer|min:0',
            'line_spacing' => 'nullable|string',
            'deadline' => 'nullable|date',
            'instructions' => 'nullable|string',
            'client_notes' => 'nullable|string',
            'addons' => 'nullable|array',
            'addons.*' => 'string',
            'subject' => 'nullable|string',
            'files' => 'nullable|array',
            'files.*' => 'file|max:10240',
        ]);
        $order = $user->orders()->create(array_merge($validated, [
            'status' => 'draft',
        ]));
        return response()->json(['draft' => $order], 201);
    }

    /**
     * Update an existing draft order.
     */
    public function updateDraft(Request $request, Order $order)
    {
        $user = $request->user();
        if ($order->user_id !== $user->id || $order->status !== 'draft') {
            abort(403);
        }
        $validated = $request->validate([
            'assignment_type' => 'nullable|string',
            'service_type' => 'nullable|string',
            'academic_level' => 'nullable|string',
            'language' => 'nullable|string',
            'pages' => 'nullable|integer|min:1',
            'words' => 'nullable|integer|min:0',
            'line_spacing' => 'nullable|string',
            'deadline' => 'nullable|date',
            'instructions' => 'nullable|string',
            'client_notes' => 'nullable|string',
            'addons' => 'nullable|array',
            'addons.*' => 'string',
            'subject' => 'nullable|string',
            'files' => 'nullable|array',
            'files.*' => 'file|max:10240',
        ]);
        $order->update($validated);
        return response()->json(['draft' => $order]);
    }

    /**
     * Discard/delete a draft order.
     */
    public function discardDraft(Request $request, Order $order)
    {
        $user = $request->user();
        if ($order->user_id !== $user->id || $order->status !== 'draft') {
            abort(403);
        }
        $order->delete();
        return response()->json(['message' => 'Draft discarded.']);
    }

    /**
     * Upload file(s) to a draft order.
     */
    public function uploadFile(Request $request, Order $order)
    {
        $user = $request->user();
        if ($order->user_id !== $user->id || $order->status !== 'draft') {
            abort(403);
        }
        $request->validate([
            'files' => 'required|array',
            'files.*' => 'file|max:10240', // 10MB per file
        ]);
        $uploadedFiles = [];
        foreach ($request->file('files') as $file) {
            $path = $file->store('order-files');
            $orderFile = $order->files()->create([
                'filename' => basename($path),
                'original_filename' => $file->getClientOriginalName(),
                'mime_type' => $file->getMimeType(),
                'path' => $path,
                'size' => $file->getSize(),
            ]);
            $uploadedFiles[] = $orderFile;
        }
        return response()->json(['files' => $uploadedFiles]);
    }

    /**
     * Remove a file from a draft order.
     */
    public function removeFile(Request $request, Order $order, $fileId)
    {
        $user = $request->user();
        if ($order->user_id !== $user->id || $order->status !== 'draft') {
            abort(403);
        }
        $file = $order->files()->findOrFail($fileId);
        $file->delete();
        return response()->json(['message' => 'File removed.']);
    }

    /**
     * Submit order (after payment) and mark as active.
     */
    public function submitOrder(Request $request, Order $order)
    {
        $user = $request->user();
        if ($order->user_id !== $user->id || $order->status !== 'draft') {
            abort(403);
        }
        // Here you would handle payment logic (integration with payment gateway)
        // For now, we just mark as active
        $order->update(['status' => 'active']);
        return response()->json(['order' => $order]);
    }
}
