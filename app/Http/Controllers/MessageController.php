<?php

namespace App\Http\Controllers;

use App\Models\Message;
use App\Models\Order;
use App\Notifications\NewMessageNotification;
use Illuminate\Http\Request;

class MessageController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function store(Request $request, Order $order)
    {
        $this->authorize('view', $order);

        $validated = $request->validate([
            'content' => 'required|string|max:1000',
        ]);

        $message = $order->messages()->create([
            'sender_id' => auth()->id(),
            'receiver_id' => auth()->user()->isAdmin() ? $order->client_id : $order->admin_id,
            'content' => $validated['content'],
        ]);

        // Notify the receiver
        $receiver = $message->receiver;
        $receiver->notify(new NewMessageNotification($message));

        return back()->with('success', 'Message sent successfully.');
    }

    public function markAsRead(Message $message)
    {
        $this->authorize('update', $message);

        $message->update(['is_read' => true]);

        return response()->json(['success' => true]);
    }
}
