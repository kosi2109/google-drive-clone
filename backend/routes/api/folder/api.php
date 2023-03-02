<?php

use App\Http\Controllers\Drive\FolderController;
use Illuminate\Support\Facades\Route;

Route::get('/', [FolderController::class, 'index']);
Route::post('/create', [FolderController::class, 'create']);
Route::put('/update/{id}', [FolderController::class, 'update']);
Route::delete('/delete/permanent/{id}', [FolderController::class, 'destroyPermanent']);
Route::delete('/restore/{id}', [FolderController::class, 'restore']);
Route::delete('/delete/{id}', [FolderController::class, 'destroy']);
Route::get('/{id}', [FolderController::class, 'show']);
