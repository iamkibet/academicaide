<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class AssignmentTypeSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('assignment_types')->insert([
            ['id' => 101, 'name' => 'unspecified', 'label' => 'Unspecified', 'popular' => false, 'inc_type' => 'amount', 'amount' => 0],
            ['id' => 100, 'name' => 'web_design', 'label' => 'Web Design', 'popular' => false, 'inc_type' => '', 'amount' => 0],
            ['id' => 98, 'name' => 'architectural_design', 'label' => 'Architectural Design', 'popular' => false, 'inc_type' => '', 'amount' => 0],
            ['id' => 97, 'name' => 'tourism', 'label' => 'Tourism', 'popular' => false, 'inc_type' => 'percent', 'amount' => 0],
            ['id' => 96, 'name' => 'web_design_percent', 'label' => 'Web Design', 'popular' => false, 'inc_type' => 'percent', 'amount' => 50],
            ['id' => 95, 'name' => 'it_management', 'label' => 'IT management', 'popular' => false, 'inc_type' => 'percent', 'amount' => 50],
            ['id' => 94, 'name' => 'internet', 'label' => 'Internet', 'popular' => false, 'inc_type' => 'percent', 'amount' => 50],
            ['id' => 93, 'name' => 'computer_science', 'label' => 'Computer Science', 'popular' => false, 'inc_type' => 'percent', 'amount' => 0],
            ['id' => 92, 'name' => 'aviation', 'label' => 'Aviation', 'popular' => false, 'inc_type' => 'percent', 'amount' => 50],
            ['id' => 91, 'name' => 'aeronautics', 'label' => 'Aeronautics', 'popular' => false, 'inc_type' => 'percent', 'amount' => 0],
        ]);
    }
}
