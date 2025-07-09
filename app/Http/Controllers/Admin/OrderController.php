<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class OrderController extends Controller
{
    public function index(Request $request)
    {
        $filters = $request->only(['status', 'search', 'date_range']);

        $orders = Order::with(['client', 'subjectCategory', 'academicLevel'])
            ->when($filters['status'] ?? null, function ($query, $status) {
                $query->where('status', $status);
            })
            ->when($filters['search'] ?? null, function ($query, $search) {
                $query->where(function ($query) use ($search) {
                    $query->where('title', 'like', "%{$search}%")
                        ->orWhere('id', 'like', "%{$search}%")
                        ->orWhereHas('client', function ($query) use ($search) {
                            $query->where('name', 'like', "%{$search}%")
                                ->orWhere('email', 'like', "%{$search}%");
                        });
                });
            })
            ->when($filters['date_range'] ?? null, function ($query, $dateRange) {
                $dates = explode(' to ', $dateRange);
                if (count($dates) === 2) {
                    $query->whereBetween('created_at', $dates);
                }
            })
            ->latest()
            ->paginate(15)
            ->withQueryString();

        return Inertia::render('Admin/Orders/Index', [
            'orders' => $orders,
            'filters' => $filters,
        ]);
    }

    public function show(Order $order)
    {
        $order->load([
            'client',
            'subjectCategory',
            'academicLevel',
            'selectedAddons',
            'files',
            'messages.sender',
            'messages.attachments',
        ]);

        return Inertia::render('Admin/Orders/Show', [
            'order' => $order,
        ]);
    }

    public function assign(Order $order, Request $request)
    {
        $validated = $request->validate([
            'admin_notes' => 'nullable|string',
        ]);

        $order->update([
            'status' => 'in_progress',
            'assigned_to' => $request->user()->id,
            'assigned_at' => now(),
            'admin_notes' => $validated['admin_notes'],
        ]);

        return back()->with('success', 'Order assigned successfully.');
    }

    public function complete(Order $order, Request $request)
    {
        $validated = $request->validate([
            'completion_notes' => 'required|string',
            'files' => 'required|array',
            'files.*' => 'file|max:10240',
        ]);

        try {
            DB::beginTransaction();

            $order->update([
                'status' => 'completed',
                'completed_at' => now(),
                'completion_notes' => $validated['completion_notes'],
            ]);

            // Handle completed files
            if ($request->hasFile('files')) {
                foreach ($request->file('files') as $file) {
                    $path = $file->store('completed-files');
                    $order->files()->create([
                        'name' => $file->getClientOriginalName(),
                        'path' => $path,
                        'size' => $file->getSize(),
                        'type' => 'completed',
                    ]);
                }
            }

            // Create completion message
            $order->messages()->create([
                'sender_id' => $request->user()->id,
                'message' => $validated['completion_notes'],
                'type' => 'completion',
            ]);

            DB::commit();

            return back()->with('success', 'Order marked as completed successfully.');
        } catch (\Exception $e) {
            DB::rollBack();
            return back()->with('error', 'Failed to complete order. Please try again.');
        }
    }

    public function reject(Order $order, Request $request)
    {
        $validated = $request->validate([
            'rejection_reason' => 'required|string',
        ]);

        $order->update([
            'status' => 'cancelled',
            'rejection_reason' => $validated['rejection_reason'],
            'rejected_at' => now(),
        ]);

        // Create rejection message
        $order->messages()->create([
            'sender_id' => $request->user()->id,
            'message' => $validated['rejection_reason'],
            'type' => 'rejection',
        ]);

        return back()->with('success', 'Order rejected successfully.');
    }

    public function updateStatus(Order $order, Request $request)
    {
        $this->authorize('update', $order); // Ensure only admins can update

        $validated = $request->validate([
            'status' => 'required|in:draft,active,completed,cancelled,pending,revision',
        ]);

        $order->status = $validated['status'];
        $order->save();

        return redirect()->back()->with('success', 'Order status updated successfully.');
    }
}
