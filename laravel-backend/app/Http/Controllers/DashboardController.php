<?php

namespace App\Http\Controllers;

use App\Models\Course;
use App\Models\SchoolDay;
use App\Models\Student;
use Illuminate\Http\JsonResponse;
<<<<<<< HEAD
use Illuminate\Http\Request;
=======
>>>>>>> 5459ae8ba1721fc4b8a402ad82c6f3f154a225d7
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
<<<<<<< HEAD
            'sqlite' => "strftime('%Y-%m', enrollment_date)",
            default => "DATE_FORMAT(enrollment_date, '%Y-%m')",
        };

        $data = DB::table('students')
            ->selectRaw("{$monthExpression} as month, COUNT(*) as total")
=======
            default => "DATE_FORMAT(enrollment_date, '%Y-%m')",
        };

        $data = Student::selectRaw("{$monthExpression} as month, COUNT(*) as total")
>>>>>>> 5459ae8ba1721fc4b8a402ad82c6f3f154a225d7
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

<<<<<<< HEAD
    public function weatherProxy(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'city' => ['nullable', 'string', 'min:2', 'max:120'],
            'latitude' => ['nullable', 'numeric', 'between:-90,90'],
            'longitude' => ['nullable', 'numeric', 'between:-180,180'],
            'timezone' => ['nullable', 'string', 'max:80'],
        ]);

        if ($request->filled('latitude') xor $request->filled('longitude')) {
            return response()->json([
                'message' => 'Both latitude and longitude are required when using geolocation.',
            ], 422);
        }

        $latitude = (string) env('WEATHER_LATITUDE', '7.4467');
        $longitude = (string) env('WEATHER_LONGITUDE', '125.8094');
        $timezone = (string) env('WEATHER_TIMEZONE', 'Asia/Manila');
        $locationLabel = (string) env('WEATHER_DEFAULT_LOCATION', 'Tagum City, Davao del Norte');

        if ($request->filled('city')) {
            $city = trim((string) $validated['city']);

            if ($city === '') {
                return response()->json([
                    'message' => 'City name cannot be empty.',
                ], 422);
            }

            $geoResponse = Http::timeout(10)->retry(1, 350)->get('https://geocoding-api.open-meteo.com/v1/search', [
                'name' => $city,
                'count' => 1,
                'language' => 'en',
                'format' => 'json',
            ]);

            if ($geoResponse->status() === 429) {
                return $this->rateLimitedResponse();
            }

            if ($geoResponse->failed()) {
                return response()->json([
                    'message' => 'Unable to resolve the requested city right now.',
                ], $geoResponse->status() ?: 502);
            }

            $result = collect($geoResponse->json('results'))->first();

            if (! $result) {
                return response()->json([
                    'message' => 'No location found for that city name.',
                ], 404);
            }

            $latitude = (string) ($result['latitude'] ?? $latitude);
            $longitude = (string) ($result['longitude'] ?? $longitude);
            $timezone = (string) ($result['timezone'] ?? $timezone);
            $locationLabel = collect([
                $result['name'] ?? null,
                $result['admin1'] ?? null,
                $result['country'] ?? null,
            ])->filter()->implode(', ');
        } elseif ($request->filled('latitude') && $request->filled('longitude')) {
            $latitude = (string) $validated['latitude'];
            $longitude = (string) $validated['longitude'];
            $timezone = (string) ($validated['timezone'] ?? 'auto');
            $locationLabel = 'Current device location';
        }

        $forecastResponse = Http::timeout(15)->retry(2, 500)->get('https://api.open-meteo.com/v1/forecast', [
=======
    public function weatherProxy(): JsonResponse
    {
        $latitude = env('WEATHER_LATITUDE', '7.4467');
        $longitude = env('WEATHER_LONGITUDE', '125.8094');
        $timezone = env('WEATHER_TIMEZONE', 'Asia/Manila');

        $url = 'https://api.open-meteo.com/v1/forecast';

        $response = Http::timeout(15)->retry(2, 500)->get($url, [
>>>>>>> 5459ae8ba1721fc4b8a402ad82c6f3f154a225d7
            'latitude' => $latitude,
            'longitude' => $longitude,
            'current' => 'temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m',
            'daily' => 'weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum',
            'forecast_days' => 5,
            'timezone' => $timezone,
        ]);

<<<<<<< HEAD
        if ($forecastResponse->status() === 429) {
            return $this->rateLimitedResponse();
        }

        if ($forecastResponse->failed()) {
            return response()->json([
                'message' => 'Unable to fetch weather data at the moment.',
            ], $forecastResponse->status() ?: 502);
        }

        $payload = $forecastResponse->json();
        $payload['location'] = [
            'label' => $locationLabel,
            'latitude' => (float) $latitude,
            'longitude' => (float) $longitude,
            'timezone' => $timezone,
        ];

        return response()->json($payload);
    }

    private function rateLimitedResponse(): JsonResponse
    {
        return response()->json([
            'message' => 'Weather service rate limit reached. Please try again shortly.',
        ], 429);
    }
}
=======
        if ($response->failed()) {
            return response()->json([
                'message' => 'Unable to fetch weather data at the moment.',
            ], $response->status() ?: 500);
        }

        return response()->json($response->json());
    }
}
>>>>>>> 5459ae8ba1721fc4b8a402ad82c6f3f154a225d7
