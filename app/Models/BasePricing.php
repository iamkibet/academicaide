<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BasePricing extends Model
{
    use HasFactory;

    protected $fillable = [
        'price_per_page',
        'single_spacing_multiplier',
        'double_spacing_multiplier',
        'is_active',
    ];

    protected $casts = [
        'price_per_page' => 'decimal:2',
        'single_spacing_multiplier' => 'decimal:2',
        'double_spacing_multiplier' => 'decimal:2',
        'is_active' => 'boolean',
    ];

    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    public static function getCurrent()
    {
        return static::active()->latest()->first();
    }
}
