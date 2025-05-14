<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use App\Models\Message;
use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class MessageController extends Controller
{
    public function index(Request $request)
    {
        $messages = $request->user()
            ->messages()
            ->with(['order', 'sender'])
            ->latest()
            ->paginate(20);

        return Inertia::render('Client/Messages/Index', [
            'messages' => $messages
        ]);
    }

    public function store(Request $request, Order $order)
    {
        $this->authorize('message', $order);

        $validated = $request->validate([
            'message' => 'required|string',
            'files' => 'array',
            'files.*' => 'file|max:10240', // 10MB max per file
        ]);

        try {
            DB::beginTransaction();

            $message = $order->messages()->create([
                'sender_id' => $request->user()->id,
                'message' => $validated['message'],
            ]);

            // Handle file uploads
            if ($request->hasFile('files')) {
                foreach ($request->file('files') as $file) {
                    $path = $file->store('message-files');
                    $message->attachments()->create([
                        'name' => $file->getClientOriginalName(),
                        'path' => $path,
                        'size' => $file->getSize(),
                    ]);
                }
            }

            DB::commit();

            return back()->with('success', 'Message sent successfully.');
        } catch (\Exception $e) {
            DB::rollBack();
            return back()->with('error', 'Failed to send message. Please try again.');
        }
    }

    public function markAsRead(Message $message)
    {
        $this->authorize('markAsRead', $message);

        $message->update(['read_at' => now()]);

        return back();
    }
}
