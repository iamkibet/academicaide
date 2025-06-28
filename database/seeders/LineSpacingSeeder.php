<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class LineSpacingSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('line_spacings')->insert([
            ['name' => 'single', 'label' => 'Single'],
            ['name' => 'double', 'label' => 'Double'],
        ]);
    }
}
