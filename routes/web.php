<?php

use App\Http\Controllers\HomeController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;

// Public routes
Route::get('/', [HomeController::class, 'index'])->name('home');

// Load route files
require __DIR__ . '/auth.php';
require __DIR__ . '/client.php';
require __DIR__ . '/admin.php';
require __DIR__ . '/settings.php';

// Writers
Route::get('/writers', function () {
    return Inertia::render('Writers/Index');
})->name('writers.index');

// How to Order
Route::get('/how-to-order', function () {
    return Inertia::render('HowToOrder/Index');
})->name('how-to-order');

// Reviews
Route::get('/reviews', function () {
    return Inertia::render('Reviews/Index');
})->name('reviews');

// About Us
Route::get('/about', function () {
    return Inertia::render('About/Index');
})->name('about');

// Services Routes
Route::prefix('services')->group(function () {
    Route::get('/', function () {
        return Inertia::render('Services/Index');
    })->name('services.index');

    Route::get('/custom-essay', function () {
        return Inertia::render('Services/CustomEssay');
    })->name('services.custom-essay');

    Route::get('/dissertation', function () {
        return Inertia::render('Services/Dissertation');
    })->name('services.dissertation');

    Route::get('/research-paper', function () {
        return Inertia::render('Services/ResearchPaper');
    })->name('services.research-paper');

    Route::get('/term-paper', function () {
        return Inertia::render('Services/TermPaper');
    })->name('services.term-paper');

    Route::get('/admission-essay', function () {
        return Inertia::render('Services/AdmissionEssay');
    })->name('services.admission-essay');

    Route::get('/essay-editing', function () {
        return Inertia::render('Services/EssayEditing');
    })->name('services.essay-editing');

    Route::get('/coursework', function () {
        return Inertia::render('Services/Coursework');
    })->name('services.coursework');

    Route::get('/physics', function () {
        return Inertia::render('Services/Physics');
    })->name('services.physics');

    Route::get('/buy-research-paper', function () {
        return Inertia::render('Services/BuyResearchPaper');
    })->name('services.buy-research-paper');

    Route::get('/buy-dissertation', function () {
        return Inertia::render('Services/BuyDissertation');
    })->name('services.buy-dissertation');
});

// Offers Routes
Route::prefix('offers')->group(function () {
    Route::get('/buy-essay', function () {
        return Inertia::render('Offers/BuyEssay');
    })->name('offers.buy-essay');

    Route::get('/college-essay', function () {
        return Inertia::render('Offers/CollegeEssay');
    })->name('offers.college-essay');

    Route::get('/rewrite-essay', function () {
        return Inertia::render('Offers/RewriteEssay');
    })->name('offers.rewrite-essay');

    Route::get('/homework', function () {
        return Inertia::render('Offers/Homework');
    })->name('offers.homework');

    Route::get('/math-homework', function () {
        return Inertia::render('Offers/MathHomework');
    })->name('offers.math-homework');

    Route::get('/pay-homework', function () {
        return Inertia::render('Offers/PayHomework');
    })->name('offers.pay-homework');

    Route::get('/economics', function () {
        return Inertia::render('Offers/Economics');
    })->name('offers.economics');
});

// Additional Pages
Route::get('/contact', function () {
    return Inertia::render('Contact/Index');
})->name('contact');

Route::get('/faq', function () {
    return Inertia::render('FAQ/Index');
})->name('faq');

Route::get('/terms', function () {
    return Inertia::render('Terms/Index');
})->name('terms');

Route::get('/blog', function () {
    return Inertia::render('Blog/Index');
})->name('blog');

Route::get('/newsletter', function () {
    return Inertia::render('Newsletter/Index');
})->name('newsletter');

// Global dashboard route for all authenticated users
Route::middleware(['auth', 'verified'])->get('/dashboard', function () {
    $user = Auth::user();
    if ($user->isAdmin()) {
        return Redirect::route('admin.dashboard');
    } elseif ($user->isClient()) {
        // Updated to use the new dashboard orders route
        return Redirect::route('client.dashboard.orders');
    }
    abort(403);
})->name('dashboard');

// Dashboard Orders List (with tab param)
Route::middleware(['auth', 'verified', 'role:U'])->get('/dashboard/orders', [\App\Http\Controllers\Client\DashboardController::class, 'ordersList'])->name('dashboard.orders');
// Single Order Info Page
Route::middleware(['auth', 'verified', 'role:U'])->get('/dashboard/order/{order}/info', [\App\Http\Controllers\Client\DashboardController::class, 'orderInfo'])->name('dashboard.order.info');
