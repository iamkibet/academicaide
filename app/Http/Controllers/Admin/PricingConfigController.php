<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\PricingConfig;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PricingConfigController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $configs = PricingConfig::all();
        return Inertia::render('Admin/PricingConfig/Index', [
            'configs' => $configs,
            'success' => session('success'),
            'error' => session('error'),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Admin/PricingConfig/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'base_price_per_page' => 'required|numeric|min:0',
            'multipliers' => 'required|array',
        ]);
        PricingConfig::create($validated);
        return redirect()->route('admin.pricing-configs.index')->with('success', 'Pricing config created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(PricingConfig $pricingConfig)
    {
        return Inertia::render('Admin/PricingConfig/Edit', [
            'pricingConfig' => $pricingConfig,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, PricingConfig $pricingConfig)
    {
        $validated = $request->validate([
            'base_price_per_page' => 'required|numeric|min:0',
            'multipliers' => 'required|array',
        ]);
        $pricingConfig->update($validated);
        return redirect()->route('admin.pricing-configs.index')->with('success', 'Pricing config updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(PricingConfig $pricingConfig)
    {
        $pricingConfig->delete();
        return redirect()->route('admin.pricing-configs.index')->with('success', 'Pricing config deleted successfully.');
    }
}
