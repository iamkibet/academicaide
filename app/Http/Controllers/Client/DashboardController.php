<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use App\Models\Order;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Http\Resources\OrderResource;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();

        $stats = [
            'total_orders' => $user->orders()->count(),
            'active_orders' => $user->orders()->whereIn('status', ['pending', 'in_progress', 'revision'])->count(),
            'completed_orders' => $user->orders()->where('status', 'completed')->count(),
            'total_spent' => $user->orders()->where('status', 'completed')->sum('total_price'),
        ];

        $recent_orders = $user->orders()
            ->with(['files', 'subjectCategory', 'academicLevel'])
            ->whereNotIn('status', ['draft', 'cancelled'])
            ->latest()
            ->take(5)
            ->get();

        return Inertia::render('Client/Dashboard', [
            'auth' => [
                'user' => $user
            ],
            'stats' => $stats,
            'recent_orders' => OrderResource::collection($recent_orders)->toArray(request()),
        ]);
    }

    public function ordersList(Request $request)
    {
        $user = $request->user();
        $tab = $request->query('tab', 'recent');
        $query = $user->orders()->with(['files', 'subjectCategory', 'academicLevel']);
        if ($tab === 'finished') {
            $query->where('status', 'completed');
        } elseif ($tab === 'canceled') {
            $query->where('status', 'cancelled');
        } else {
            $query->whereNotIn('status', ['draft', 'cancelled']);
        }
        $orders = $query->latest()->get();
        return Inertia::render('Client/Orders/List', [
            'auth' => ['user' => $user],
            'orders' => OrderResource::collection($orders)->toArray($request),
            'tab' => $tab,
        ]);
    }

    public function orderInfo(Request $request, Order $order)
    {
        $this->authorize('view', $order);
        $order->load(['files', 'subjectCategory', 'academicLevel', 'client']);
        return Inertia::render('Client/Orders/ShowInfo', [
            'auth' => ['user' => $request->user()],
            'order' => new OrderResource($order),
        ]);
    }
}
