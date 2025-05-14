<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $stats = [
            'total_orders' => Order::count(),
            'pending_orders' => Order::where('status', 'pending')->count(),
            'active_orders' => Order::whereIn('status', ['in_progress', 'revision'])->count(),
            'completed_orders' => Order::where('status', 'completed')->count(),
            'total_revenue' => Order::where('status', 'completed')->sum('total_amount'),
            'total_clients' => User::where('role', 'client')->count(),
        ];

        $recent_orders = Order::with(['user', 'subjectCategory', 'academicLevel'])
            ->latest()
            ->take(5)
            ->get()
            ->map(function ($order) {
                return [
                    'id' => $order->id,
                    'title' => $order->title,
                    'client' => [
                        'name' => $order->user->name,
                        'email' => $order->user->email,
                    ],
                    'subject' => $order->subjectCategory->name,
                    'academic_level' => $order->academicLevel->name,
                    'status' => $order->status,
                    'deadline' => $order->deadline,
                    'total_amount' => $order->total_amount,
                    'created_at' => $order->created_at,
                ];
            });

        return Inertia::render('Admin/Dashboard', [
            'stats' => $stats,
            'recent_orders' => $recent_orders,
        ]);
    }
}
