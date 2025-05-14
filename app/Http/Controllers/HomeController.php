<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function index()
    {
        return Inertia::render('Welcome', [
            'features' => [
                [
                    'title' => 'Expert Writers',
                    'description' => 'Our team of professional writers are experts in their fields.',
                ],
                [
                    'title' => 'On-Time Delivery',
                    'description' => 'We guarantee delivery of your work before the deadline.',
                ],
                [
                    'title' => 'Quality Assurance',
                    'description' => 'Every paper goes through our rigorous quality check process.',
                ],
                [
                    'title' => '24/7 Support',
                    'description' => 'Our support team is available round the clock to assist you.',
                ],
            ],
            'testimonials' => [
                [
                    'name' => 'John D.',
                    'role' => 'Student',
                    'content' => 'The quality of work I received was exceptional. Will definitely use the service again.',
                ],
                [
                    'name' => 'Sarah M.',
                    'role' => 'Graduate Student',
                    'content' => 'Very professional service with great attention to detail.',
                ],
                [
                    'name' => 'Michael R.',
                    'role' => 'Undergraduate',
                    'content' => 'Fast, reliable, and high-quality work. Highly recommended!',
                ],
            ],
            'stats' => [
                'completed_orders' => '10,000+',
                'satisfied_clients' => '5,000+',
                'expert_writers' => '500+',
                'success_rate' => '98%',
            ],
        ]);
    }
}
