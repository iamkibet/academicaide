<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Http\Resources\OrderResource;

class DashboardController extends Controller
{
    public function index()
    {
        $stats = [
            'total_orders' => Order::count(),
            'pending_orders' => Order::where('status', 'pending')->count(),
            'active_orders' => Order::whereIn('status', ['in_progress', 'revision', 'active'])->count(),
            'completed_orders' => Order::where('status', 'completed')->count(),
            'total_revenue' => Order::where('status', 'completed')->sum('total_price'),
            'total_clients' => User::where('role', 'client')->count(),
        ];

        $recent_orders = Order::with(['files', 'client', 'subjectCategory', 'academicLevel'])
            ->latest()
            ->take(5)
            ->get();

        // Trends: last 14 days
        $orderTrends = Order::selectRaw('DATE(created_at) as date, COUNT(*) as orders, SUM(total_price) as revenue')
            ->where('created_at', '>=', now()->subDays(13)->startOfDay())
            ->groupBy('date')
            ->orderBy('date')
            ->get();

        return Inertia::render('Admin/Dashboard', [
            'metrics' => $stats,
            'recent_orders' => OrderResource::collection($recent_orders)->toArray(request()),
            'orderTrends' => $orderTrends,
        ]);
    }
}
