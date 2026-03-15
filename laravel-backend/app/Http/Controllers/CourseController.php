<?php

namespace App\Http\Controllers;

use App\Models\Course;
use Illuminate\Http\JsonResponse;

class CourseController extends Controller
{
    public function index(): JsonResponse
    {
        $courses = Course::withCount('students')
            ->orderBy('department')
            ->orderBy('course_code')
            ->get();

        return response()->json($courses);
    }
}