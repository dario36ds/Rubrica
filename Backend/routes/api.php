<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\EmailController;
use App\Http\Controllers\LocationController;
use App\Http\Controllers\PhoneNumberController;

Route::apiResource('contacts', ContactController::class);
Route::apiResource('emails', EmailController::class);
Route::apiResource('numbers', PhoneNumberController::class);
Route::apiResource('locations', LocationController::class);