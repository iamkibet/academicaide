<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            // Basic order information
            $table->string('assignment_type')->nullable();
            $table->string('service_type')->nullable();
            $table->string('academic_level')->nullable();
            $table->string('subject')->nullable();
            $table->string('language')->default('en_us')->nullable();

            // Size and formatting
            $table->integer('pages')->nullable();
            $table->integer('words')->nullable();
            $table->string('size_unit')->default('pages')->nullable();
            $table->string('line_spacing')->default('double')->nullable();
            $table->string('citation_style')->nullable();
            $table->string('source_count')->nullable();

            // Timing and urgency
            $table->dateTime('deadline')->nullable();
            $table->boolean('is_urgent')->default(false);

            // Content and instructions
            $table->text('instructions')->nullable();
            $table->text('client_notes')->nullable();
            $table->json('addons')->nullable();

            // Pricing and payment
            $table->decimal('price_per_page', 10, 2)->nullable();
            $table->decimal('total_price', 10, 2)->nullable();
            $table->decimal('discount', 10, 2)->nullable();
            $table->string('payment_status')->default('pending');
            $table->string('payment_method')->nullable();

            // Order status and revisions
            $table->enum('status', [
                'draft',
                'pending_payment',
                'writer_pending',
                'in_progress',
                'review',
                'completed',
                'cancelled'
            ])->default('draft');
            $table->integer('revision_count')->default(0);
            $table->timestamp('last_revision_at')->nullable();

            // Relationships
            $table->foreignId('client_id')->constrained('users')->onDelete('cascade');
            $table->enum('role', ['U', 'A'])->default('U');

            // Timestamps
            $table->timestamps();
            $table->softDeletes();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
