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
            ->latest()
            ->take(5)
            ->get();

        return Inertia::render('Client/Dashboard', [
            'auth' => [
                'user' => $user
            ],
            'stats' => $stats,
            'recent_orders' => OrderResource::collection($recent_orders),
        ]);
    }
}
