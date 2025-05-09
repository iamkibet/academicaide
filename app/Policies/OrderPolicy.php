<?php

namespace App\Policies;

use App\Models\Order;
use App\Models\User;

class OrderPolicy
{
    public function viewAny(User $user): bool
    {
        return true;
    }

    public function view(User $user, Order $order): bool
    {
        return $user->isAdmin() || $user->id === $order->client_id;
    }

    public function create(User $user): bool
    {
        return $user->isClient();
    }

    public function update(User $user, Order $order): bool
    {
        if ($user->isAdmin()) {
            return true;
        }

        if ($user->isClient() && $user->id === $order->client_id) {
            return $order->status === 'draft' ||
                ($order->status === 'active' && $order->revision_count < 3);
        }

        return false;
    }

    public function delete(User $user, Order $order): bool
    {
        return $user->isAdmin() ||
            ($user->isClient() && $user->id === $order->client_id && $order->status === 'draft');
    }

    public function assign(User $user, Order $order): bool
    {
        return $user->isAdmin() && $order->status === 'draft';
    }

    public function requestRevision(User $user, Order $order): bool
    {
        return $user->isClient() &&
            $user->id === $order->client_id &&
            $order->status === 'active' &&
            $order->revision_count < 3;
    }

    public function markAsCompleted(User $user, Order $order): bool
    {
        return $user->isAdmin() && $order->status === 'active';
    }

    public function uploadFiles(User $user, Order $order): bool
    {
        return $this->update($user, $order);
    }

    public function downloadFiles(User $user, Order $order): bool
    {
        return $this->view($user, $order);
    }
}
