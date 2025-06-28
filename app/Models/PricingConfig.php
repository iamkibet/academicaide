<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PricingConfig extends Model
{
    use HasFactory;

    protected $fillable = [
        'base_price_per_page',
        'multipliers',
    ];

    protected $casts = [
        'multipliers' => 'array',
    ];
}
