<?php


use App\Http\Controllers\Client\DashboardController;
use App\Http\Controllers\Client\MessageController;
use App\Http\Controllers\Settings\ProfileController;
use App\Http\Controllers\Client\OrderController;
use Illuminate\Support\Facades\Route;

Route::middleware(['web', 'auth', 'verified', 'role:U'])->prefix('client')->name('client.')->group(function () {
    // Dashboard (update to /dashboard/orders)
    Route::get('/dashboard/orders', [DashboardController::class, 'index'])->name('dashboard.orders');
    // Optionally, redirect /dashboard to /dashboard/orders for backward compatibility
    Route::redirect('/dashboard', '/client/dashboard/orders?tab=recent');

    // Orders
    Route::get('/orders', [OrderController::class, 'index'])->name('orders.index');
    Route::get('/orders/create', [OrderController::class, 'create'])->name('orders.create');
    Route::post('/orders', [OrderController::class, 'store'])->name('orders.store');
    Route::get('/orders/{order}', [OrderController::class, 'show'])->name('orders.show');
    Route::post('/orders/{order}/request-revision', [OrderController::class, 'requestRevision'])->name('orders.request-revision');
    Route::post('/orders/{order}/cancel', [OrderController::class, 'cancel'])->name('orders.cancel');
    Route::post('/orders/{order}/approve', [OrderController::class, 'approve'])->name('orders.approve');
    Route::post('/orders/{order}/pay-later', [\App\Http\Controllers\Client\OrderController::class, 'payLater'])->name('client.orders.pay_later');

    // Messages
    Route::get('/messages', [MessageController::class, 'index'])->name('messages.index');
    Route::post('/orders/{order}/messages', [MessageController::class, 'store'])->name('messages.store');
    Route::patch('/messages/{message}/read', [MessageController::class, 'markAsRead'])->name('messages.mark-read');

    // Profile
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // Drafts
    Route::post('/orders/draft', [OrderController::class, 'saveDraft'])->name('orders.draft.save');
    Route::patch('/orders/{order}/draft', [OrderController::class, 'updateDraft'])->name('orders.draft.update');
    Route::delete('/orders/{order}/draft', [OrderController::class, 'discardDraft'])->name('orders.draft.discard');

    // File upload/removal for drafts
    Route::post('/orders/{order}/files', [OrderController::class, 'uploadFile'])->name('orders.files.upload');
    Route::delete('/orders/{order}/files/{file}', [OrderController::class, 'removeFile'])->name('orders.files.remove');

    // Submit order (after payment)
    Route::post('/orders/{order}/submit', [OrderController::class, 'submitOrder'])->name('orders.submit');
});
