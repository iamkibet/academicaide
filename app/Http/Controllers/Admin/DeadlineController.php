<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\DeadlineOption;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DeadlineController extends Controller
{
    public function index()
    {
        $deadlines = DeadlineOption::orderBy('hours')
            ->get()
            ->map(function ($deadline) {
                return [
                    'id' => $deadline->id,
                    'name' => $deadline->name,
                    'hours' => $deadline->hours,
                    'price_multiplier' => $deadline->price_multiplier,
                    'is_active' => $deadline->is_active,
                    'orders_count' => $deadline->orders_count,
                ];
            });

        return Inertia::render('Admin/Pricing/Deadlines/Index', [
            'deadlines' => $deadlines,
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Pricing/Deadlines/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:deadline_options',
            'hours' => 'required|integer|min:1|unique:deadline_options',
            'price_multiplier' => 'required|numeric|min:1',
            'is_active' => 'boolean',
        ]);

        DeadlineOption::create($validated);

        return redirect()->route('admin.pricing.deadlines.index')
            ->with('success', 'Deadline option created successfully.');
    }

    public function edit(DeadlineOption $deadline)
    {
        return Inertia::render('Admin/Pricing/Deadlines/Edit', [
            'deadline' => [
                'id' => $deadline->id,
                'name' => $deadline->name,
                'hours' => $deadline->hours,
                'price_multiplier' => $deadline->price_multiplier,
                'is_active' => $deadline->is_active,
            ],
        ]);
    }

    public function update(Request $request, DeadlineOption $deadline)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:deadline_options,name,' . $deadline->id,
            'hours' => 'required|integer|min:1|unique:deadline_options,hours,' . $deadline->id,
            'price_multiplier' => 'required|numeric|min:1',
            'is_active' => 'boolean',
        ]);

        $deadline->update($validated);

        return redirect()->route('admin.pricing.deadlines.index')
            ->with('success', 'Deadline option updated successfully.');
    }

    public function destroy(DeadlineOption $deadline)
    {
        // Check if the deadline has any associated orders
        if ($deadline->orders()->exists()) {
            return back()->with('error', 'Cannot delete deadline option with associated orders.');
        }

        $deadline->delete();

        return back()->with('success', 'Deadline option deleted successfully.');
    }
}
