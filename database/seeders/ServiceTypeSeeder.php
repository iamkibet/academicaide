<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ServiceTypeSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('service_types')->insert([
            ['name' => 'writing', 'label' => 'Writing'],
            ['name' => 'rewriting', 'label' => 'Rewriting'],
            ['name' => 'editing', 'label' => 'Editing'],
            ['name' => 'proofreading', 'label' => 'Proofreading'],
        ]);
    }
}
