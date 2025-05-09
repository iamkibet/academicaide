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
            $table->string('assignment_type');
            $table->string('service_type');
            $table->string('academic_level');
            $table->string('language')->default('en_us');
            $table->integer('pages');
            $table->integer('words');
            $table->string('line_spacing')->default('double');
            $table->dateTime('deadline');
            $table->text('instructions');
            $table->text('client_notes')->nullable();
            $table->boolean('is_urgent')->default(false);
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
