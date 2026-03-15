<?php

namespace App\Http\Controllers;

use App\Models\Student;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class StudentController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $perPage = (int) $request->query('per_page', 20);
        $perPage = max(1, min($perPage, 100));

        $students = Student::with('course')
            ->when($request->filled('search'), function ($query) use ($request) {
                $search = trim($request->query('search'));

                $query->where(function ($q) use ($search) {
                    $q->where('student_number', 'like', "%{$search}%")
                        ->orWhere('first_name', 'like', "%{$search}%")
                        ->orWhere('last_name', 'like', "%{$search}%");
                });
            })
            ->when($request->filled('course_id'), function ($query) use ($request) {
                $query->where('course_id', $request->query('course_id'));
            })
            ->latest()
            ->paginate($perPage);

        return response()->json($students);
    }

    public function show(Student $student): JsonResponse
    {
        $student->load('course');

        return response()->json($student);
    }
}