<?php

namespace App\Http\Controllers;

use App\Models\Course;
use App\Models\SchoolDay;
use App\Models\Student;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Http;

class DashboardController extends Controller
{
    public function stats(): JsonResponse
    {
        return response()->json([
            'students_count' => Student::count(),
            'courses_count' => Course::count(),
            'school_days_count' => SchoolDay::count(),
            'male_students_count' => Student::where('gender', 'Male')->count(),
            'female_students_count' => Student::where('gender', 'Female')->count(),
            'present_students_count' => Student::where('is_present', true)->count(),
        ]);
    }

    public function enrollmentTrends(): JsonResponse
    {
        $driver = DB::getDriverName();

        $monthExpression = match ($driver) {
            'pgsql' => "TO_CHAR(enrollment_date, 'YYYY-MM')",
            default => "DATE_FORMAT(enrollment_date, '%Y-%m')",
        };

        $data = Student::selectRaw("{$monthExpression} as month, COUNT(*) as total")
            ->groupBy('month')
            ->orderBy('month')
            ->get();

        return response()->json($data);
    }

    public function courseDistribution(): JsonResponse
    {
        $data = Course::withCount('students')
            ->get()
            ->map(fn ($course) => [
                'course' => $course->course_code,
                'course_name' => $course->course_name,
                'department' => $course->department,
                'students' => $course->students_count,
            ])
            ->values();

        return response()->json($data);
    }

    public function attendancePatterns(): JsonResponse
    {
        $data = SchoolDay::query()
            ->select('date', 'attendance_count', 'type', 'title')
            ->orderBy('date')
            ->get()
            ->map(fn ($day) => [
                'date' => $day->date->format('Y-m-d'),
                'attendance_count' => $day->attendance_count,
                'type' => $day->type,
                'title' => $day->title,
            ]);

        return response()->json($data);
    }

    public function weatherProxy(): JsonResponse
    {
        $latitude = env('WEATHER_LATITUDE', '7.4467');
        $longitude = env('WEATHER_LONGITUDE', '125.8094');
        $timezone = env('WEATHER_TIMEZONE', 'Asia/Manila');

        $url = 'https://api.open-meteo.com/v1/forecast';

        $response = Http::timeout(15)->retry(2, 500)->get($url, [
            'latitude' => $latitude,
            'longitude' => $longitude,
            'current' => 'temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m',
            'daily' => 'weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum',
            'forecast_days' => 5,
            'timezone' => $timezone,
        ]);

        if ($response->failed()) {
            return response()->json([
                'message' => 'Unable to fetch weather data at the moment.',
            ], $response->status() ?: 500);
        }

        return response()->json($response->json());
    }
}