<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\AcademicLevel;
use App\Models\Addon;
use App\Models\BasePricing;
use App\Models\DeadlineOption;
use App\Models\SubjectCategory;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PricingController extends Controller
{
    public function index()
    {
        $pricingData = [
            'basePricing' => BasePricing::active()->first(),
            'academicLevels' => AcademicLevel::orderBy('display_order')->get()->map(function ($level) {
                return [
                    'id' => $level->id,
                    'name' => $level->name,
                    'price_multiplier' => $level->price_multiplier,
                    'is_active' => $level->is_active,
                ];
            }),
            'deadlineOptions' => DeadlineOption::orderBy('hours')->get()->map(function ($deadline) {
                return [
                    'id' => $deadline->id,
                    'name' => $deadline->name,
                    'hours' => $deadline->hours,
                    'price_multiplier' => $deadline->price_multiplier,
                    'is_active' => $deadline->is_active,
                ];
            }),
            'addons' => Addon::orderBy('display_order')->get()->map(function ($addon) {
                return [
                    'id' => $addon->id,
                    'name' => $addon->name,
                    'price' => $addon->price,
                    'is_free' => $addon->is_free,
                    'is_active' => $addon->is_active,
                ];
            }),
            'subjectCategories' => SubjectCategory::orderBy('display_order')->get()->map(function ($subject) {
                return [
                    'id' => $subject->id,
                    'name' => $subject->name,
                    'is_active' => $subject->is_active,
                ];
            }),
        ];

        return Inertia::render('Admin/Pricing/Index', [
            'pricingData' => $pricingData,
        ]);
    }

    public function editBase()
    {
        $basePricing = BasePricing::active()->firstOrFail();

        return Inertia::render('Admin/Pricing/BasePricingForm', [
            'basePricing' => $basePricing,
        ]);
    }

    public function updateBase(Request $request, BasePricing $pricing)
    {
        $validated = $request->validate([
            'price_per_page' => 'required|numeric|min:0',
            'single_spacing_multiplier' => 'required|numeric|min:1',
            'double_spacing_multiplier' => 'required|numeric|min:1',
            'is_active' => 'boolean',
        ]);

        $pricing->update($validated);

        return redirect()->route('admin.pricing.index')
            ->with('success', 'Base pricing updated successfully.');
    }
}
