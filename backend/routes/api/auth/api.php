<?php

use App\Http\Controllers\GoogleAuthController;
use Illuminate\Support\Facades\Route;

// Google Auth
Route::get('/google', [GoogleAuthController::class, 'redirectToAuth']);
Route::get('/google/callback', [GoogleAuthController::class, 'handleAuthCallback']);
