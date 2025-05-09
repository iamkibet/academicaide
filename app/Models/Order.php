<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Order extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'client_id',
        'admin_id',
        'title',
        'subject',
        'academic_level',
        'citation_style',
        'deadline',
        'pages',
        'word_count',
        'instructions',
        'status',
        'price',
        'price_per_page',
        'discount',
        'total_price',
        'payment_status',
        'payment_method',
        'paid_at',
        'assigned_at',
        'completed_at',
        'admin_notes',
        'client_notes',
        'is_urgent',
        'revision_count',
        'last_revision_at',
    ];

    protected $casts = [
        'deadline' => 'datetime',
        'paid_at' => 'datetime',
        'assigned_at' => 'datetime',
        'completed_at' => 'datetime',
        'last_revision_at' => 'datetime',
        'price' => 'decimal:2',
        'price_per_page' => 'decimal:2',
        'discount' => 'decimal:2',
        'total_price' => 'decimal:2',
        'is_urgent' => 'boolean',
    ];

    public function client()
    {
        return $this->belongsTo(User::class, 'client_id');
    }

    public function admin()
    {
        return $this->belongsTo(User::class, 'admin_id');
    }

    public function messages()
    {
        return $this->hasMany(Message::class);
    }

    public function files()
    {
        return $this->hasMany(OrderFile::class);
    }

    public function calculateTotalPrice()
    {
        $basePrice = $this->pages * $this->price_per_page;
        $discountAmount = $basePrice * ($this->discount / 100);
        $this->total_price = $basePrice - $discountAmount;
        return $this->total_price;
    }

    public function isOverdue()
    {
        return $this->deadline->isPast() && $this->status !== 'completed';
    }

    public function timeUntilDeadline()
    {
        return now()->diffForHumans($this->deadline, ['parts' => 2]);
    }

    public function canBeEdited()
    {
        return $this->status === 'draft' || ($this->status === 'active' && $this->revision_count < 3);
    }

    public function markAsPaid($paymentMethod)
    {
        $this->update([
            'payment_status' => 'paid',
            'payment_method' => $paymentMethod,
            'paid_at' => now(),
        ]);
    }

    public function assignToAdmin($adminId)
    {
        $this->update([
            'admin_id' => $adminId,
            'assigned_at' => now(),
            'status' => 'active',
        ]);
    }

    public function markAsCompleted()
    {
        $this->update([
            'status' => 'completed',
            'completed_at' => now(),
        ]);
    }

    public function requestRevision()
    {
        $this->increment('revision_count');
        $this->update([
            'last_revision_at' => now(),
            'status' => 'active',
        ]);
    }

    public function scopeUrgent($query)
    {
        return $query->where('is_urgent', true);
    }

    public function scopeOverdue($query)
    {
        return $query->where('deadline', '<', now())
            ->whereNotIn('status', ['completed', 'cancelled']);
    }

    public function scopeNeedsAttention($query)
    {
        return $query->where(function ($q) {
            $q->where('status', 'active')
                ->where('deadline', '<', now()->addDays(2));
        });
    }
}
