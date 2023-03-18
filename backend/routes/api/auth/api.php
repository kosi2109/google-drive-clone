<?php

use App\Http\Controllers\ApiAuthController;
use Illuminate\Support\Facades\Route;

// Google Auth
Route::post('/google', [ApiAuthController::class, 'googleLogin'])->withoutMiddleware('auth:sanctum');
Route::post('/logout', [ApiAuthController::class, 'logout']);

