<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PricingConfigSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('pricing_configs')->insert([
            [
                'base_price_per_page' => 12.99,
                'multipliers' => json_encode([
                    'academic_level' => [
                        'high_school' => 1,
                        'college' => 1.1,
                        'bachelors' => 1.2,
                        'masters' => 1.3,
                    ],
                    'deadline' => [
                        '24' => 1.5,
                        '48' => 1.2,
                        '120' => 1,
                    ],
                    'spacing' => [
                        'single' => 1.5,
                        'double' => 1,
                    ],
                ]),
            ],
        ]);
    }
}
