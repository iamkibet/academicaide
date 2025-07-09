<?php

use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\OrderController;
use App\Http\Controllers\Admin\PricingController;
use App\Http\Controllers\Admin\SubjectController;
use App\Http\Controllers\Admin\AcademicLevelController;
use App\Http\Controllers\Admin\DeadlineController;
use App\Http\Controllers\Admin\AddonController;
use App\Http\Controllers\Admin\AssignmentTypeController;
use App\Http\Controllers\Admin\LanguageController;
use App\Http\Controllers\Admin\ServiceTypeController;
use App\Http\Controllers\Admin\LineSpacingController;
use App\Http\Controllers\Admin\WritingStyleController;
use App\Http\Controllers\Admin\PricingConfigController;
use Illuminate\Support\Facades\Route;

Route::middleware(['web', 'auth', 'verified', 'role:A'])
    ->prefix('admin')
    ->name('admin.')
    ->group(function () {

        // Dashboard
        Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

        // Orders Management - Using resource route with custom actions
        Route::resource('orders', OrderController::class)->only(['index', 'show']);

        // Custom order actions
        Route::patch('/orders/{order}/status', [OrderController::class, 'updateStatus'])->name('orders.update-status');
        Route::post('/orders/{order}/assign', [OrderController::class, 'assign'])->name('orders.assign');
        Route::post('/orders/{order}/complete', [OrderController::class, 'complete'])->name('orders.complete');
        Route::post('/orders/{order}/reject', [OrderController::class, 'reject'])->name('orders.reject');

        // Pricing Management
        Route::prefix('pricing')->name('pricing.')->group(function () {
            // Base Pricing
            Route::get('/', [PricingController::class, 'index'])->name('index');
            Route::get('/base/edit', [PricingController::class, 'editBase'])->name('base.edit');
            Route::patch('/base/{pricing}', [PricingController::class, 'updateBase'])->name('base.update');

            // Academic Levels - Full resource
            Route::resource('academic-levels', AcademicLevelController::class, [
                'parameters' => ['academic-levels' => 'level']
            ])->except(['show']);

            // Deadlines - Full resource
            Route::resource('deadlines', DeadlineController::class)->except(['show']);

            // Add-ons - Full resource
            Route::resource('addons', AddonController::class, [
                'parameters' => ['addons' => 'addon']
            ])->except(['show']);

            // Subject Categories - Full resource
            Route::resource('subjects', SubjectController::class, [
                'parameters' => ['subjects' => 'subject']
            ])->except(['show']);
        });

        // Resource routes for other entities
        Route::resource('assignment-types', AssignmentTypeController::class)->except(['show']);
        Route::resource('service-types', ServiceTypeController::class)->except(['show']);
        Route::resource('line-spacings', LineSpacingController::class)->only(['index', 'store', 'update', 'destroy']);
        Route::resource('languages', LanguageController::class);
        Route::resource('writing-styles', WritingStyleController::class);
        Route::resource('pricing-configs', PricingConfigController::class);
    });
