<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\EmiDetailController;
use App\Http\Controllers\LoanDetailController;
use App\Http\Controllers\Api\LoanDetailController as ApiLoanDetailController;
use App\Http\Controllers\Auth\GoogleAuthController;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/auth/google', [GoogleAuthController::class, 'redirectToGoogle'])->name('auth.google');

Route::get('/auth/google/callback', [GoogleAuthController::class, 'loginWithGoogle']);

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::resource('/loan-detail', LoanDetailController::class);
    Route::get('/api/loan-detail', [ApiLoanDetailController::class, 'index']);
    Route::post('/foreclose-loan', [LoanDetailController::class, 'forecloseLoan']);
    Route::resource('/emi-detail', EmiDetailController::class);
    Route::post('/update-emi', [EmiDetailController::class, 'updateEmi']);
    Route::post('/emi-skipped', [EmiDetailController::class, 'emiSkipped']);
    Route::get('/pay', [PaymentController::class, 'payAmount'])->name('pay');
    Route::post('/create-order', [PaymentController::class, 'createRazorpayOrder']);
    Route::post('/verify-payment', [PaymentController::class, 'verifyPayment']);
});

require __DIR__ . '/auth.php';
