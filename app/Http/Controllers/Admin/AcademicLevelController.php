<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\AcademicLevel;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AcademicLevelController extends Controller
{
    public function index()
    {
        $levels = AcademicLevel::orderBy('display_order')
            ->get()
            ->map(function ($level) {
                return [
                    'id' => $level->id,
                    'name' => $level->name,
                    'description' => $level->description,
                    'price_multiplier' => $level->price_multiplier,
                    'display_order' => $level->display_order,
                    'is_active' => $level->is_active,
                    'orders_count' => $level->orders_count,
                ];
            });

        return Inertia::render('Admin/Pricing/AcademicLevels/Index', [
            'levels' => $levels,
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Pricing/AcademicLevels/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:academic_levels',
            'description' => 'required|string',
            'price_multiplier' => 'required|numeric|min:1',
            'display_order' => 'required|integer|min:0',
            'is_active' => 'boolean',
        ]);

        AcademicLevel::create($validated);

        return redirect()->route('admin.pricing.academic-levels.index')
            ->with('success', 'Academic level created successfully.');
    }

    public function edit(AcademicLevel $level)
    {
        return Inertia::render('Admin/Pricing/AcademicLevels/Edit', [
            'level' => [
                'id' => $level->id,
                'name' => $level->name,
                'description' => $level->description,
                'price_multiplier' => $level->price_multiplier,
                'display_order' => $level->display_order,
                'is_active' => $level->is_active,
            ],
        ]);
    }

    public function update(Request $request, AcademicLevel $level)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:academic_levels,name,' . $level->id,
            'description' => 'required|string',
            'price_multiplier' => 'required|numeric|min:1',
            'display_order' => 'required|integer|min:0',
            'is_active' => 'boolean',
        ]);

        $level->update($validated);

        return redirect()->route('admin.pricing.academic-levels.index')
            ->with('success', 'Academic level updated successfully.');
    }

    public function destroy(AcademicLevel $level)
    {
        // Check if the level has any associated orders
        if ($level->orders()->exists()) {
            return back()->with('error', 'Cannot delete academic level with associated orders.');
        }

        $level->delete();

        return back()->with('success', 'Academic level deleted successfully.');
    }
}
