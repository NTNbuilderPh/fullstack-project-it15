<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CourseController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\StudentController;
use Illuminate\Support\Facades\Route;

Route::get('/health', function () {
    return response()->json([
        'message' => 'API is running.',
    ]);
});

Route::post('/login', [AuthController::class, 'login']);
Route::get('/weather-proxy', [DashboardController::class, 'weatherProxy']);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/me', [AuthController::class, 'me']);
    Route::post('/logout', [AuthController::class, 'logout']);

    Route::get('/students', [StudentController::class, 'index']);
    Route::get('/students/{student}', [StudentController::class, 'show']);

    Route::get('/courses', [CourseController::class, 'index']);

    Route::prefix('dashboard')->group(function () {
        Route::get('/stats', [DashboardController::class, 'stats']);
        Route::get('/enrollment-trends', [DashboardController::class, 'enrollmentTrends']);
        Route::get('/course-distribution', [DashboardController::class, 'courseDistribution']);
        Route::get('/attendance-patterns', [DashboardController::class, 'attendancePatterns']);
    });
});