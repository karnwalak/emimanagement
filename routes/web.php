<?php

use App\Http\Controllers\EmiDetailController;
use App\Http\Controllers\LoanDetailController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::resource('/loan-detail', LoanDetailController::class);
    Route::post('/foreclose-loan', [LoanDetailController::class, 'forecloseLoan']);
    Route::resource('/emi-detail', EmiDetailController::class);
    Route::post('/update-emi', [EmiDetailController::class,'updateEmi']);
});

require __DIR__.'/auth.php';
