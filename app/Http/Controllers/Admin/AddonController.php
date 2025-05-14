<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Addon;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AddonController extends Controller
{
    public function index()
    {
        $addons = Addon::orderBy('display_order')
            ->get()
            ->map(function ($addon) {
                return [
                    'id' => $addon->id,
                    'name' => $addon->name,
                    'description' => $addon->description,
                    'price' => $addon->price,
                    'is_free' => $addon->is_free,
                    'display_order' => $addon->display_order,
                    'is_active' => $addon->is_active,
                    'orders_count' => $addon->orders_count,
                ];
            });

        return Inertia::render('Admin/Pricing/Addons/Index', [
            'addons' => $addons,
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Pricing/Addons/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:addons',
            'description' => 'required|string',
            'price' => 'required_if:is_free,false|numeric|min:0|nullable',
            'is_free' => 'boolean',
            'display_order' => 'required|integer|min:0',
            'is_active' => 'boolean',
        ]);

        if ($validated['is_free']) {
            $validated['price'] = 0;
        }

        Addon::create($validated);

        return redirect()->route('admin.pricing.addons.index')
            ->with('success', 'Add-on created successfully.');
    }

    public function edit(Addon $addon)
    {
        return Inertia::render('Admin/Pricing/Addons/Edit', [
            'addon' => [
                'id' => $addon->id,
                'name' => $addon->name,
                'description' => $addon->description,
                'price' => $addon->price,
                'is_free' => $addon->is_free,
                'display_order' => $addon->display_order,
                'is_active' => $addon->is_active,
            ],
        ]);
    }

    public function update(Request $request, Addon $addon)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:addons,name,' . $addon->id,
            'description' => 'required|string',
            'price' => 'required_if:is_free,false|numeric|min:0|nullable',
            'is_free' => 'boolean',
            'display_order' => 'required|integer|min:0',
            'is_active' => 'boolean',
        ]);

        if ($validated['is_free']) {
            $validated['price'] = 0;
        }

        $addon->update($validated);

        return redirect()->route('admin.pricing.addons.index')
            ->with('success', 'Add-on updated successfully.');
    }

    public function destroy(Addon $addon)
    {
        // Check if the addon has any associated orders
        if ($addon->orders()->exists()) {
            return back()->with('error', 'Cannot delete add-on with associated orders.');
        }

        $addon->delete();

        return back()->with('success', 'Add-on deleted successfully.');
    }
}
