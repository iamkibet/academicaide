<?php


use App\Http\Controllers\Client\DashboardController;
use App\Http\Controllers\Client\MessageController;
use App\Http\Controllers\Client\ProfileController;
use App\Http\Controllers\OrderController;
use Illuminate\Support\Facades\Route;

Route::middleware(['web', 'auth', 'verified', 'role:U'])->prefix('client')->name('client.')->group(function () {
    // Dashboard
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

    // Orders
    Route::get('/orders', [OrderController::class, 'index'])->name('orders.index');
    Route::get('/orders/create', [OrderController::class, 'create'])->name('orders.create');
    Route::post('/orders', [OrderController::class, 'store'])->name('orders.store');
    Route::get('/orders/{order}', [OrderController::class, 'show'])->name('orders.show');
    Route::post('/orders/{order}/request-revision', [OrderController::class, 'requestRevision'])->name('orders.request-revision');
    Route::post('/orders/{order}/cancel', [OrderController::class, 'cancel'])->name('orders.cancel');
    Route::post('/orders/{order}/approve', [OrderController::class, 'approve'])->name('orders.approve');

    // Messages
    Route::get('/messages', [MessageController::class, 'index'])->name('messages.index');
    Route::post('/orders/{order}/messages', [MessageController::class, 'store'])->name('messages.store');
    Route::patch('/messages/{message}/read', [MessageController::class, 'markAsRead'])->name('messages.mark-read');

    // Profile
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});
