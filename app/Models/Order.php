<?php

namespace App\Models;

use App\Services\OrderPricingService;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Order extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'client_id',
        'role',
        'assignment_type',
        'service_type',
        'academic_level',
        'subject',
        'language',
        'pages',
        'words',
        'size_unit',
        'line_spacing',
        'citation_style',
        'source_count',
        'deadline',
        'instructions',
        'client_notes',
        'is_urgent',
        'addons',
        'price_per_page',
        'total_price',
        'discount',
        'payment_status',
        'payment_method',
        'status',
        'revision_count',
        'last_revision_at'
    ];

    protected $casts = [
        'deadline' => 'datetime',
        'last_revision_at' => 'datetime',
        'price_per_page' => 'decimal:2',
        'total_price' => 'decimal:2',
        'discount' => 'decimal:2',
        'is_urgent' => 'boolean',
        'addons' => 'json',
        'status' => 'string',
    ];

    public function client()
    {
        return $this->belongsTo(User::class, 'client_id');
    }

    public function files()
    {
        return $this->hasMany(OrderFile::class);
    }

    public function messages()
    {
        return $this->hasMany(Message::class);
    }

    public function academicLevel()
    {
        return $this->belongsTo(AcademicLevel::class, 'academic_level', 'slug');
    }

    public function subjectCategory()
    {
        return $this->belongsTo(SubjectCategory::class, 'subject', 'slug');
    }

    public function selectedAddons()
    {
        return $this->belongsToMany(Addon::class, 'order_addon')
            ->withPivot('price')
            ->withTimestamps();
    }

    public function calculateTotalPrice()
    {
        $pricingService = new OrderPricingService($this);
        $this->total_price = $pricingService->calculateTotalPrice();
        return $this->total_price;
    }

    public function getPriceBreakdown()
    {
        $pricingService = new OrderPricingService($this);
        return $pricingService->getPriceBreakdown();
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

    public function scopeByStatus($query, $status)
    {
        return $query->where('status', $status);
    }

    public function scopeByPaymentStatus($query, $status)
    {
        return $query->where('payment_status', $status);
    }

    public function scopeByDateRange($query, $startDate, $endDate)
    {
        return $query->whereBetween('created_at', [$startDate, $endDate]);
    }

    public function scopeByAcademicLevel($query, $level)
    {
        return $query->where('academic_level', $level);
    }

    public function scopeBySubject($query, $subject)
    {
        return $query->where('subject', $subject);
    }

    public function scopeByRole($query, $role)
    {
        return $query->where('role', $role);
    }
}
