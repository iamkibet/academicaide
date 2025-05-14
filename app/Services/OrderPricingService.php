<?php

namespace App\Services;

use App\Models\AcademicLevel;
use App\Models\Addon;
use App\Models\BasePricing;
use App\Models\DeadlineOption;
use Carbon\Carbon;

class OrderPricingService
{
    public function getPricingData()
    {
        return [
            'basePricing' => BasePricing::active()->first(),
            'academicLevels' => AcademicLevel::active()->orderBy('display_order')->get(),
            'deadlineOptions' => DeadlineOption::active()->orderBy('hours')->get(),
            'addons' => Addon::active()->orderBy('display_order')->get(),
        ];
    }

    public function calculatePrice(array $orderData): float
    {
        $basePricing = BasePricing::active()->firstOrFail();
        $academicLevel = AcademicLevel::findOrFail($orderData['academic_level']);
        $deadline = Carbon::parse($orderData['deadline']);
        $now = Carbon::now();
        $hours = $now->diffInHours($deadline);

        // Get the appropriate deadline option based on hours
        $deadlineOption = DeadlineOption::where('hours', '>=', $hours)
            ->orderBy('hours')
            ->first();

        if (!$deadlineOption) {
            $deadlineOption = DeadlineOption::orderBy('hours', 'desc')->first();
        }

        // Calculate base price
        $basePrice = $basePricing->price_per_page * $orderData['pages'];

        // Apply line spacing multiplier
        $basePrice *= match ($orderData['line_spacing']) {
            'single' => $basePricing->single_spacing_multiplier,
            'double' => $basePricing->double_spacing_multiplier,
            '1.5' => ($basePricing->single_spacing_multiplier + $basePricing->double_spacing_multiplier) / 2,
            default => $basePricing->double_spacing_multiplier,
        };

        // Apply academic level multiplier
        $basePrice *= $academicLevel->price_multiplier;

        // Apply deadline multiplier
        $basePrice *= $deadlineOption->price_multiplier;

        // Apply urgency multiplier if requested
        if (!empty($orderData['is_urgent'])) {
            $basePrice *= 1.2; // 20% increase for urgent orders
        }

        // Add addon prices
        $addonPrice = 0;
        if (!empty($orderData['addons'])) {
            $addons = Addon::whereIn('id', $orderData['addons'])->get();
            foreach ($addons as $addon) {
                if (!$addon->is_free) {
                    $addonPrice += $addon->price;
                }
            }
        }

        return round($basePrice + $addonPrice, 2);
    }
}
