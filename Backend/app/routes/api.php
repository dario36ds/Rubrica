<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ContactController;

Route::apiResource('contacts', ContactController::class);
Route::apiResource('emails', ContactController::class);
Route::apiResource('phone_numbers', ContactController::class);
Route::apiResource('locations', ContactController::class);

