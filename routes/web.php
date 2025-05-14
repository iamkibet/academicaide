<?php

use App\Http\Controllers\HomeController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Public routes
Route::get('/', [HomeController::class, 'index'])->name('home');

// Load route files
require __DIR__ . '/auth.php';
require __DIR__ . '/client.php';
require __DIR__ . '/admin.php';
require __DIR__ . '/settings.php';
