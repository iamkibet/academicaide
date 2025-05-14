<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('base_pricings', function (Blueprint $table) {
            $table->id();
            $table->decimal('price_per_page', 10, 2);
            $table->decimal('single_spacing_multiplier', 5, 2)->default(1.00);
            $table->decimal('double_spacing_multiplier', 5, 2)->default(1.00);
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('base_pricings');
    }
};
