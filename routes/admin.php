<?php

use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\OrderController;
use App\Http\Controllers\Admin\PricingController;
use App\Http\Controllers\Admin\SubjectController;
use App\Http\Controllers\Admin\AcademicLevelController;
use App\Http\Controllers\Admin\DeadlineController;
use App\Http\Controllers\Admin\AddonController;
use Illuminate\Support\Facades\Route;

Route::middleware(['web', 'auth', 'verified', 'role:A'])->prefix('admin')->name('admin.')->group(function () {
    // Dashboard
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

    // Orders Management
    Route::get('/orders', [OrderController::class, 'index'])->name('orders.index');
    Route::get('/orders/{order}', [OrderController::class, 'show'])->name('orders.show');
    Route::post('/orders/{order}/assign', [OrderController::class, 'assign'])->name('orders.assign');
    Route::post('/orders/{order}/complete', [OrderController::class, 'complete'])->name('orders.complete');
    Route::post('/orders/{order}/reject', [OrderController::class, 'reject'])->name('orders.reject');

    // Pricing Management
    Route::prefix('pricing')->name('pricing.')->group(function () {
        // Base Pricing
        Route::get('/', [PricingController::class, 'index'])->name('index');
        Route::get('/base/edit', [PricingController::class, 'editBase'])->name('base.edit');
        Route::patch('/base/{pricing}', [PricingController::class, 'updateBase'])->name('base.update');

        // Academic Levels
        Route::get('/academic-levels', [AcademicLevelController::class, 'index'])->name('academic-levels.index');
        Route::get('/academic-levels/create', [AcademicLevelController::class, 'create'])->name('academic-levels.create');
        Route::post('/academic-levels', [AcademicLevelController::class, 'store'])->name('academic-levels.store');
        Route::get('/academic-levels/{level}/edit', [AcademicLevelController::class, 'edit'])->name('academic-levels.edit');
        Route::patch('/academic-levels/{level}', [AcademicLevelController::class, 'update'])->name('academic-levels.update');
        Route::delete('/academic-levels/{level}', [AcademicLevelController::class, 'destroy'])->name('academic-levels.destroy');

        // Deadlines
        Route::get('/deadlines', [DeadlineController::class, 'index'])->name('deadlines.index');
        Route::get('/deadlines/create', [DeadlineController::class, 'create'])->name('deadlines.create');
        Route::post('/deadlines', [DeadlineController::class, 'store'])->name('deadlines.store');
        Route::get('/deadlines/{deadline}/edit', [DeadlineController::class, 'edit'])->name('deadlines.edit');
        Route::patch('/deadlines/{deadline}', [DeadlineController::class, 'update'])->name('deadlines.update');
        Route::delete('/deadlines/{deadline}', [DeadlineController::class, 'destroy'])->name('deadlines.destroy');

        // Add-ons
        Route::get('/addons', [AddonController::class, 'index'])->name('addons.index');
        Route::get('/addons/create', [AddonController::class, 'create'])->name('addons.create');
        Route::post('/addons', [AddonController::class, 'store'])->name('addons.store');
        Route::get('/addons/{addon}/edit', [AddonController::class, 'edit'])->name('addons.edit');
        Route::patch('/addons/{addon}', [AddonController::class, 'update'])->name('addons.update');
        Route::delete('/addons/{addon}', [AddonController::class, 'destroy'])->name('addons.destroy');

        // Subject Categories
        Route::get('/subjects', [SubjectController::class, 'index'])->name('subjects.index');
        Route::get('/subjects/create', [SubjectController::class, 'create'])->name('subjects.create');
        Route::post('/subjects', [SubjectController::class, 'store'])->name('subjects.store');
        Route::get('/subjects/{subject}/edit', [SubjectController::class, 'edit'])->name('subjects.edit');
        Route::patch('/subjects/{subject}', [SubjectController::class, 'update'])->name('subjects.update');
        Route::delete('/subjects/{subject}', [SubjectController::class, 'destroy'])->name('subjects.destroy');
    });
});
