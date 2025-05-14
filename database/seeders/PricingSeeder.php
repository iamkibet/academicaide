<?php

namespace Database\Seeders;

use App\Models\AcademicLevel;
use App\Models\Addon;
use App\Models\BasePricing;
use App\Models\DeadlineOption;
use App\Models\SubjectCategory;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class PricingSeeder extends Seeder
{
    public function run(): void
    {
        // Create base pricing
        BasePricing::create([
            'price_per_page' => 15.00,
            'single_spacing_multiplier' => 1.00,
            'double_spacing_multiplier' => 1.00,
            'is_active' => true,
        ]);

        // Create academic levels
        $levels = [
            ['name' => 'High School', 'multiplier' => 1.00],
            ['name' => 'College', 'multiplier' => 1.20],
            ['name' => 'Undergraduate', 'multiplier' => 1.40],
            ['name' => 'Master\'s', 'multiplier' => 1.60],
            ['name' => 'PhD', 'multiplier' => 1.80],
        ];

        foreach ($levels as $index => $level) {
            AcademicLevel::create([
                'name' => $level['name'],
                'slug' => Str::slug($level['name']),
                'price_multiplier' => $level['multiplier'],
                'is_active' => true,
                'display_order' => $index + 1,
            ]);
        }

        // Create deadline options
        $deadlines = [
            ['hours' => 3, 'multiplier' => 2.50],
            ['hours' => 6, 'multiplier' => 2.00],
            ['hours' => 12, 'multiplier' => 1.75],
            ['hours' => 24, 'multiplier' => 1.50],
            ['hours' => 48, 'multiplier' => 1.25],
            ['hours' => 72, 'multiplier' => 1.15],
            ['hours' => 168, 'multiplier' => 1.00],
        ];

        foreach ($deadlines as $index => $deadline) {
            $hours = $deadline['hours'];
            $name = $hours < 24 ? "{$hours} Hours" : (floor($hours / 24) . " Days");

            DeadlineOption::create([
                'name' => $name,
                'hours' => $hours,
                'price_multiplier' => $deadline['multiplier'],
                'is_active' => true,
                'display_order' => $index + 1,
            ]);
        }

        // Create add-ons
        $addons = [
            [
                'name' => 'Plagiarism Report',
                'description' => 'Detailed originality report',
                'price' => 0,
                'is_free' => true,
            ],
            [
                'name' => '1-Page Abstract',
                'description' => 'A concise summary of your paper',
                'price' => 12.99,
                'is_free' => false,
            ],
            [
                'name' => 'Graphics & Tables',
                'description' => 'Professional visual elements',
                'price' => 8.99,
                'is_free' => false,
            ],
            [
                'name' => 'Printable Sources',
                'description' => 'All sources in printable format',
                'price' => 6.99,
                'is_free' => false,
            ],
            [
                'name' => 'Detailed Outline',
                'description' => 'Comprehensive paper structure',
                'price' => 9.99,
                'is_free' => false,
            ],
            [
                'name' => 'Unlimited Revisions',
                'description' => 'Make as many changes as needed',
                'price' => 0,
                'is_free' => true,
            ],
            [
                'name' => 'Unlimited Sources',
                'description' => 'Access to all reference materials',
                'price' => 0,
                'is_free' => true,
            ],
            [
                'name' => 'Title Page and Formatting',
                'description' => 'Professional formatting included',
                'price' => 0,
                'is_free' => true,
            ],
        ];

        foreach ($addons as $index => $addon) {
            Addon::create([
                'name' => $addon['name'],
                'slug' => Str::slug($addon['name']),
                'description' => $addon['description'],
                'price' => $addon['price'],
                'is_free' => $addon['is_free'],
                'is_active' => true,
                'display_order' => $index + 1,
            ]);
        }

        // Create subject categories
        $subjects = [
            'Global Studies',
            'Government',
            'Political Science',
            'Social Sciences',
            'Psychology',
            'Sociology',
            'Business',
            'Economics',
            'History',
            'Literature',
            'Philosophy',
            'Education',
            'Law',
            'Medicine',
            'Engineering',
            'Computer Science',
            'Mathematics',
            'Physics',
            'Chemistry',
            'Biology',
        ];

        foreach ($subjects as $index => $subject) {
            SubjectCategory::create([
                'name' => $subject,
                'slug' => Str::slug($subject),
                'is_active' => true,
                'display_order' => $index + 1,
            ]);
        }
    }
}
