<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Http\Resources\OrderResource;
use App\Notifications\NewOrderNotification;
use App\Notifications\OrderUpdateNotification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

class OrderController extends BaseController
{
    use AuthorizesRequests;

    public function __construct()
    {
        $this->middleware('auth')->except(['create', 'store']);
    }

    public function index(Request $request)
    {
        $user = Auth::user();
        $query = $user->isAdmin()
            ? Order::with(['client', 'files', 'messages.sender', 'messages.receiver'])
            : Order::where('client_id', $user->id)->with(['client', 'files', 'messages.sender', 'messages.receiver']);

        // Apply filters
        if ($request->has('status')) {
            $query->where('status', $request->status);
        }
        if ($request->has('is_urgent')) {
            $query->where('is_urgent', true);
        }
        if ($request->has('overdue')) {
            $query->overdue();
        }
        if ($request->has('needs_attention')) {
            $query->needsAttention();
        }

        $orders = $query->latest()->paginate(10);

        return Inertia::render('Client/Orders/Index', [
            'orders' => OrderResource::collection($orders),
            'filters' => $request->only(['status', 'is_urgent', 'overdue', 'needs_attention']),
        ]);
    }

    public function create()
    {
        return Inertia::render('Client/Orders/Create', [
            'auth' => [
                'user' => Auth::user(),
                'check' => Auth::check(),
            ],
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'assignment_type' => 'required|string|max:255',
            'service_type' => 'required|string|max:255',
            'academic_level' => 'required|string|max:255',
            'subject' => 'nullable|string|max:255',
            'language' => 'required|string|max:10',
            'pages' => 'required|integer|min:1',
            'words' => 'required|integer|min:275',
            'size_unit' => 'required|string|in:pages,words',
            'line_spacing' => 'required|string|in:single,double,1.5',
            'citation_style' => 'nullable|string|max:255',
            'source_count' => 'nullable|string|max:255',
            'deadline' => 'required|date|after:now',
            'instructions' => 'required|string',
            'client_notes' => 'nullable|string',
            'is_urgent' => 'boolean',
            'addons' => 'nullable|array',
            'files' => 'nullable|array',
            'files.*' => 'file|max:153600', // 150MB max
        ]);

        // Calculate price based on academic level and urgency
        $pricePerPage = $this->calculatePricePerPage($validated['academic_level'], $validated['is_urgent']);
        $totalPrice = $pricePerPage * $validated['pages'];

        // Create the order
        $order = Order::create([
            'client_id' => Auth::id(),
            'role' => Auth::check() ? Auth::user()->role : 'U',
            'assignment_type' => $validated['assignment_type'],
            'service_type' => $validated['service_type'],
            'academic_level' => $validated['academic_level'],
            'subject' => $validated['subject'],
            'language' => $validated['language'],
            'pages' => $validated['pages'],
            'words' => $validated['words'],
            'size_unit' => $validated['size_unit'],
            'line_spacing' => $validated['line_spacing'],
            'citation_style' => $validated['citation_style'],
            'source_count' => $validated['source_count'],
            'deadline' => $validated['deadline'],
            'instructions' => $validated['instructions'],
            'client_notes' => $validated['client_notes'],
            'is_urgent' => $validated['is_urgent'],
            'addons' => json_encode($validated['addons'] ?? []),
            'price_per_page' => $pricePerPage,
            'total_price' => $totalPrice,
            'status' => 'draft',
            'payment_status' => 'pending',
        ]);

        // Handle file uploads
        if ($request->hasFile('files')) {
            foreach ($request->file('files') as $file) {
                $path = $file->store('order-files/' . $order->id);
                $order->files()->create([
                    'path' => $path,
                    'original_name' => $file->getClientOriginalName(),
                    'mime_type' => $file->getMimeType(),
                    'size' => $file->getSize(),
                ]);
            }
        }

        // If user is not authenticated, redirect to login with order ID
        if (!Auth::check()) {
            return redirect()->route('login', [
                'order_id' => $order->id,
                'redirect' => route('client.orders.show', $order)
            ]);
        }

        return redirect()->route('client.orders.show', $order)
            ->with('success', 'Order created successfully.');
    }

    public function show(Order $order)
    {
        $this->authorize('view', $order);
        $order->load(['client', 'files', 'messages.sender', 'messages.receiver']);

        return Inertia::render('Client/Orders/Show', [
            'order' => new OrderResource($order),
        ]);
    }

    public function edit(Order $order)
    {
        $this->authorize('update', $order);
        $order->load(['client', 'files']);

        return Inertia::render('Client/Orders/Edit', [
            'order' => new OrderResource($order),
        ]);
    }

    public function update(Request $request, Order $order)
    {
        $this->authorize('update', $order);

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'subject' => 'required|string|max:255',
            'academic_level' => 'required|string|in:high_school,undergraduate,masters,phd',
            'citation_style' => 'nullable|string|in:apa,mla,chicago,harvard',
            'pages' => 'required|integer|min:1',
            'word_count' => 'nullable|integer|min:0',
            'deadline' => 'required|date|after:now',
            'instructions' => 'required|string',
            'client_notes' => 'nullable|string',
            'is_urgent' => 'boolean',
        ]);

        $pricePerPage = $this->calculatePricePerPage($validated['academic_level'], $validated['is_urgent']);
        $totalPrice = $pricePerPage * $validated['pages'];

        $order->update([
            'title' => $validated['title'],
            'subject' => $validated['subject'],
            'academic_level' => $validated['academic_level'],
            'citation_style' => $validated['citation_style'],
            'pages' => $validated['pages'],
            'word_count' => $validated['word_count'],
            'price_per_page' => $pricePerPage,
            'total_price' => $totalPrice,
            'deadline' => $validated['deadline'],
            'instructions' => $validated['instructions'],
            'client_notes' => $validated['client_notes'],
            'is_urgent' => $validated['is_urgent'],
        ]);

        return redirect()->route('client.orders.show', $order)
            ->with('success', 'Order updated successfully.');
    }

    public function destroy(Order $order)
    {
        $this->authorize('delete', $order);

        // Delete associated files
        foreach ($order->files as $file) {
            $file->delete();
        }

        $order->delete();

        return redirect()->route('client.orders.index')
            ->with('success', 'Order deleted successfully.');
    }

    public function requestRevision(Order $order)
    {
        $this->authorize('update', $order);

        if (!$order->canBeEdited()) {
            return back()->with('error', 'This order cannot be revised.');
        }

        $order->requestRevision();
        $order->client->notify(new OrderUpdateNotification($order, 'revision_requested'));

        return back()->with('success', 'Revision requested successfully.');
    }

    public function markAsCompleted(Order $order)
    {
        $this->authorize('update', $order);

        $order->update(['status' => 'completed']);
        $order->client->notify(new OrderUpdateNotification($order, 'completed'));

        return back()->with('success', 'Order marked as completed.');
    }

    protected function calculatePricePerPage(string $academicLevel, bool $isUrgent): float
    {
        $basePrice = match ($academicLevel) {
            'high_school' => 10.00,
            'undergraduate' => 15.00,
            'masters' => 20.00,
            'phd' => 25.00,
            default => 15.00,
        };

        return $isUrgent ? $basePrice * 1.5 : $basePrice;
    }
}
