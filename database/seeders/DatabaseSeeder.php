<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        // Create admin user
        User::create([
            'name' => 'Admin User',
            'email' => 'admin@example.com',
            'password' => Hash::make('adminuser'),
            'role' => 'A',
        ]);

        // Create test client
        User::create([
            'name' => 'Test Client',
            'email' => 'client@example.com',
            'password' => Hash::make('testuser'),
            'role' => 'U',
        ]);

        // Seed pricing data
        $this->call([
            PricingSeeder::class,
            AssignmentTypeSeeder::class,
            ServiceTypeSeeder::class,
            LanguageSeeder::class,
            LineSpacingSeeder::class,
            PricingConfigSeeder::class,
        ]);
    }
}
