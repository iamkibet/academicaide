<?php

namespace App\Http\Controllers;

use App\Models\Order;
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
        $this->middleware('auth');
    }

    public function index(Request $request)
    {
        $user = Auth::user();
        $query = $user->isAdmin()
            ? Order::with(['client', 'admin'])
            : $user->clientOrders()->with(['admin']);

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

        return Inertia::render('orders/Index', [
            'orders' => $orders,
            'filters' => $request->only(['status', 'is_urgent', 'overdue', 'needs_attention']),
        ]);
    }

    public function create()
    {
        return Inertia::render('orders/Create');
    }

    public function store(Request $request)
    {
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

        $order = Order::create([
            'client_id' => Auth::id(),
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
            'status' => 'draft',
            'payment_status' => 'pending',
        ]);

        return redirect()->route('orders.show', $order)
            ->with('success', 'Order created successfully.');
    }

    public function show(Order $order)
    {
        $this->authorize('view', $order);
        return Inertia::render('orders/Show', [
            'order' => $order->load(['client', 'admin', 'files', 'messages.sender', 'messages.receiver']),
        ]);
    }

    public function edit(Order $order)
    {
        $this->authorize('update', $order);
        return Inertia::render('orders/Edit', [
            'order' => $order,
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

        return redirect()->route('orders.show', $order)
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

        return redirect()->route('orders.index')
            ->with('success', 'Order deleted successfully.');
    }

    public function requestRevision(Order $order)
    {
        $this->authorize('update', $order);

        if (!$order->canBeEdited()) {
            return back()->with('error', 'This order cannot be revised.');
        }

        $order->requestRevision();
        $order->admin->notify(new OrderUpdateNotification($order, 'revision_requested'));

        return back()->with('success', 'Revision requested successfully.');
    }

    public function assignAdmin(Request $request, Order $order)
    {
        $this->authorize('assign', $order);

        $validated = $request->validate([
            'admin_id' => 'required|exists:users,id',
        ]);

        $order->assignToAdmin($validated['admin_id']);
        $order->client->notify(new OrderUpdateNotification($order, 'assigned'));

        return back()->with('success', 'Admin assigned successfully.');
    }

    public function markAsCompleted(Order $order)
    {
        $this->authorize('update', $order);

        $order->markAsCompleted();
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
