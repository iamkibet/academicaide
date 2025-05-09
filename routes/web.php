<?php

use App\Http\Controllers\MessageController;
use App\Http\Controllers\NotificationSettingController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\Settings\ProfileController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::get('/orders/create', [OrderController::class, 'create'])->name('orders.create');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    // Profile routes
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // Order routes
    Route::get('/orders', [OrderController::class, 'index'])->name('orders.index');

    Route::post('/orders', [OrderController::class, 'store'])->name('orders.store');
    Route::get('/orders/{order}', [OrderController::class, 'show'])->name('orders.show');
    Route::get('/orders/{order}/edit', [OrderController::class, 'edit'])->name('orders.edit');
    Route::put('/orders/{order}', [OrderController::class, 'update'])->name('orders.update');
    Route::delete('/orders/{order}', [OrderController::class, 'destroy'])->name('orders.destroy');

    // Enhanced order features
    Route::post('/orders/{order}/revision', [OrderController::class, 'requestRevision'])->name('orders.revision');
    Route::post('/orders/{order}/assign', [OrderController::class, 'assignAdmin'])->name('orders.assign');
    Route::post('/orders/{order}/complete', [OrderController::class, 'markAsCompleted'])->name('orders.complete');

    // Message routes
    Route::post('/orders/{order}/messages', [MessageController::class, 'store'])->name('messages.store');
    Route::put('/messages/{message}/read', [MessageController::class, 'markAsRead'])->name('messages.read');

    // Notification settings routes
    Route::get('/notification-settings', [NotificationSettingController::class, 'edit'])->name('notification-settings.edit');
    Route::put('/notification-settings', [NotificationSettingController::class, 'update'])->name('notification-settings.update');
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
