<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use App\Models\Order;
use Illuminate\Http\Request;
use Inertia\Inertia;

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
            ->with(['subjectCategory', 'academicLevel'])
            ->latest()
            ->take(5)
            ->get()
            ->map(function ($order) {
                return [
                    'id' => $order->id,
                    'title' => $order->title,
                    'status' => $order->status,
                    'deadline' => $order->deadline,
                    'total_price' => $order->total_price,
                    'created_at' => $order->created_at,
                    'subject_category' => [
                        'name' => $order->subjectCategory->name ?? $order->subject,
                    ],
                    'academic_level' => [
                        'name' => $order->academicLevel->name ?? $order->academic_level,
                    ],
                ];
            });

        return Inertia::render('Client/Dashboard', [
            'auth' => [
                'user' => $user
            ],
            'stats' => $stats,
            'recent_orders' => $recent_orders,
        ]);
    }
}
