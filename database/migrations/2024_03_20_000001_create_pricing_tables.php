<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // Academic Levels Table
        if (!Schema::hasTable('academic_levels')) {
            Schema::create('academic_levels', function (Blueprint $table) {
                $table->id();
                $table->string('name');
                $table->string('slug')->unique();
                $table->decimal('price_multiplier', 5, 2)->default(1.00);
                $table->boolean('is_active')->default(true);
                $table->integer('display_order')->default(0);
                $table->timestamps();
            });
        }

        // Deadline Options Table
        if (!Schema::hasTable('deadline_options')) {
            Schema::create('deadline_options', function (Blueprint $table) {
                $table->id();
                $table->string('name');
                $table->integer('hours');
                $table->decimal('price_multiplier', 5, 2)->default(1.00);
                $table->boolean('is_active')->default(true);
                $table->integer('display_order')->default(0);
                $table->timestamps();
            });
        }

        // Add-ons Table
        if (!Schema::hasTable('addons')) {
            Schema::create('addons', function (Blueprint $table) {
                $table->id();
                $table->string('name');
                $table->string('slug')->unique();
                $table->text('description')->nullable();
                $table->decimal('price', 10, 2);
                $table->boolean('is_free')->default(false);
                $table->boolean('is_active')->default(true);
                $table->integer('display_order')->default(0);
                $table->timestamps();
            });
        }

        // Subject Categories Table
        if (!Schema::hasTable('subject_categories')) {
            Schema::create('subject_categories', function (Blueprint $table) {
                $table->id();
                $table->string('name');
                $table->string('slug')->unique();
                $table->text('description')->nullable();
                $table->boolean('is_active')->default(true);
                $table->integer('display_order')->default(0);
                $table->timestamps();
            });
        }

        // Base Pricing Table
        if (!Schema::hasTable('base_pricings')) {
            Schema::create('base_pricings', function (Blueprint $table) {
                $table->id();
                $table->decimal('price_per_page', 10, 2);
                $table->decimal('single_spacing_multiplier', 5, 2)->default(1.00);
                $table->decimal('double_spacing_multiplier', 5, 2)->default(1.00);
                $table->boolean('is_active')->default(true);
                $table->timestamps();
            });
        }

        // Order Add-ons Pivot Table
        if (!Schema::hasTable('order_addon')) {
            Schema::create('order_addon', function (Blueprint $table) {
                $table->id();
                $table->foreignId('order_id')->constrained()->onDelete('cascade');
                $table->foreignId('addon_id')->constrained()->onDelete('cascade');
                $table->decimal('price', 10, 2);
                $table->timestamps();
            });
        }
    }

    public function down(): void
    {
        Schema::dropIfExists('order_addon');
        Schema::dropIfExists('base_pricings');
        Schema::dropIfExists('subject_categories');
        Schema::dropIfExists('addons');
        Schema::dropIfExists('deadline_options');
        Schema::dropIfExists('academic_levels');
    }
};
