<?php

namespace App\Notifications;

use App\Models\Order;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class NewOrderNotification extends Notification implements ShouldQueue
{
    use Queueable;

    public function __construct(
        protected Order $order
    ) {}

    public function via(object $notifiable): array
    {
        return ['mail', 'database'];
    }

    public function toMail(object $notifiable): MailMessage
    {
        return (new MailMessage)
            ->subject('New Order: ' . $this->order->title)
            ->line('A new order has been placed.')
            ->line('Title: ' . $this->order->title)
            ->line('Subject: ' . $this->order->subject)
            ->line('Deadline: ' . $this->order->deadline->format('Y-m-d H:i'))
            ->action('View Order', url('/orders/' . $this->order->id))
            ->line('Thank you for using our service!');
    }

    public function toArray(object $notifiable): array
    {
        return [
            'order_id' => $this->order->id,
            'title' => $this->order->title,
            'subject' => $this->order->subject,
            'deadline' => $this->order->deadline,
        ];
    }
}
