<?php

use App\Http\Controllers\Drive\FileController;
use Illuminate\Support\Facades\Route;

Route::get('/', [FileController::class, 'index']);
Route::post('/create', [FileController::class, 'create']);
Route::put('/update/{id}', [FileController::class, 'update']);
Route::delete('/delete/{id}', [FileController::class, 'destroy']);
Route::delete('/delete/permanent/{id}', [FileController::class, 'destroyPermanent']);
Route::post('/restore/{id}', [FileController::class, 'restore']);
Route::get('/d/{id}', [FileController::class, 'getFile']);
Route::post('/uploadLargeFiles', [FileController::class, 'uploadFile'])->withoutMiddleware('throttle');
Route::get('/{id}', [FileController::class, 'show']);
