<?php

use App\Http\Controllers\Client\ProfileController;
use App\Http\Controllers\NotificationSettingController;
use App\Http\Controllers\Settings\PasswordController;
use App\Http\Controllers\Settings\PaymentMethodController;
use App\Http\Controllers\Settings\SecurityController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware('auth')->group(function () {
    Route::redirect('settings', 'settings/profile');

    Route::get('settings/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('settings/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('settings/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('settings/password', [PasswordController::class, 'edit'])->name('password.edit');
    Route::put('settings/password', [PasswordController::class, 'update'])->name('password.update');

    Route::get('settings/appearance', function () {
        return Inertia::render('settings/appearance');
    })->name('appearance');

    // Notifications
    Route::get('/notifications', [NotificationSettingController::class, 'edit'])->name('notifications.edit');
    Route::patch('/notifications', [NotificationSettingController::class, 'update'])->name('notifications.update');

    // Payment Methods
    Route::get('/payment-methods', [PaymentMethodController::class, 'index'])->name('payment-methods.index');
    Route::post('/payment-methods', [PaymentMethodController::class, 'store'])->name('payment-methods.store');
    Route::delete('/payment-methods/{method}', [PaymentMethodController::class, 'destroy'])->name('payment-methods.destroy');
    Route::post('/payment-methods/{method}/default', [PaymentMethodController::class, 'setDefault'])->name('payment-methods.set-default');

    // Security
    Route::get('/security', [SecurityController::class, 'edit'])->name('security.edit');
    Route::patch('/security/password', [SecurityController::class, 'updatePassword'])->name('security.password.update');
    Route::patch('/security/two-factor', [SecurityController::class, 'updateTwoFactor'])->name('security.two-factor.update');
});
