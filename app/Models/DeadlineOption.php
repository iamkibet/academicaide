<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DeadlineOption extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'hours',
        'price_multiplier',
        'is_active',
        'display_order',
    ];

    protected $casts = [
        'hours' => 'integer',
        'price_multiplier' => 'decimal:2',
        'is_active' => 'boolean',
    ];

    public function orders()
    {
        return $this->hasMany(Order::class);
    }

    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    public function scopeOrdered($query)
    {
        return $query->orderBy('display_order');
    }

    public function getFormattedDeadline()
    {
        if ($this->hours < 24) {
            return $this->hours . ' hours';
        }

        $days = floor($this->hours / 24);
        return $days . ' day' . ($days > 1 ? 's' : '');
    }
}
