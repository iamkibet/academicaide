<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class AssignmentTypeSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('assignment_types')->insert([
            ['name' => 'essay', 'label' => 'Essay (any type)', 'popular' => true],
            ['name' => 'research_paper', 'label' => 'Research paper', 'popular' => true],
            ['name' => 'discussion_post', 'label' => 'Discussion post', 'popular' => true],
            ['name' => 'powerpoint', 'label' => 'PowerPoint PPT', 'popular' => true],
            ['name' => 'case_study', 'label' => 'Case study', 'popular' => true],
            ['name' => 'assignment', 'label' => 'Assignment', 'popular' => false],
            ['name' => 'admission_essay', 'label' => 'Admission essay', 'popular' => false],
            ['name' => 'analysis', 'label' => 'Analysis (any type)', 'popular' => false],
            ['name' => 'annotated_bibliography', 'label' => 'Annotated bibliography', 'popular' => false],
            ['name' => 'article_review', 'label' => 'Article review', 'popular' => false],
            ['name' => 'article_writing', 'label' => 'Article writing', 'popular' => false],
            ['name' => 'book_review', 'label' => 'Book/Movie review', 'popular' => false],
            ['name' => 'business_plan', 'label' => 'Business plan', 'popular' => false],
            ['name' => 'business_proposal', 'label' => 'Business proposal', 'popular' => false],
            ['name' => 'coursework', 'label' => 'Coursework', 'popular' => false],
            ['name' => 'capstone', 'label' => 'Capstone project', 'popular' => false],
            ['name' => 'creative_writing', 'label' => 'Creative writing', 'popular' => false],
        ]);
    }
}
