<?php

use App\Http\Controllers\Drive\PageController;
use Illuminate\Support\Facades\Route;

Route::get('/fil', [PageController::class, 'test'])->withoutMiddleware('auth:sanctum');
Route::get('/folder/{id}', [PageController::class, 'folder']);
Route::get('/{page}', [PageController::class, 'index']);
