<?php

namespace Database\Seeders;

use App\Models\Course;
use App\Models\Student;
use Illuminate\Database\Seeder;

class StudentSeeder extends Seeder
{
    public function run(): void
    {
        $courses = Course::all();

        if ($courses->isEmpty()) {
<<<<<<< HEAD
            $this->command?->warn('No courses found. Skipping StudentSeeder.');
=======
            $this->command->warn('No courses found. Skipping StudentSeeder.');
>>>>>>> 5459ae8ba1721fc4b8a402ad82c6f3f154a225d7
            return;
        }

        for ($i = 1; $i <= 500; $i++) {
            $course = $courses->random();
<<<<<<< HEAD
            $studentNumber = '2025-'.str_pad((string) $i, 5, '0', STR_PAD_LEFT);

            Student::updateOrCreate(
                ['student_number' => $studentNumber],
                [
                    'first_name' => fake()->firstName(),
                    'last_name' => fake()->lastName(),
                    'gender' => fake()->randomElement(['Male', 'Female']),
                    'birthdate' => fake()->dateTimeBetween('-25 years', '-16 years')->format('Y-m-d'),
                    'address' => fake()->address(),
                    'course_id' => $course->id,
                    'enrollment_date' => fake()->dateTimeBetween('2025-06-01', '2026-03-01')->format('Y-m-d'),
                    'year_level' => fake()->randomElement(['1st Year', '2nd Year', '3rd Year', '4th Year']),
                    'status' => fake()->randomElement(['Regular', 'Irregular']),
                    'is_present' => fake()->boolean(85),
                ]
            );
        }
    }
}
=======

            Student::create([
                'student_number' => '2025-' . str_pad((string) $i, 5, '0', STR_PAD_LEFT),
                'first_name' => fake()->firstName(),
                'last_name' => fake()->lastName(),
                'gender' => fake()->randomElement(['Male', 'Female']),
                'birthdate' => fake()->dateTimeBetween('-25 years', '-16 years')->format('Y-m-d'),
                'address' => fake()->address(),
                'course_id' => $course->id,
                'enrollment_date' => fake()->dateTimeBetween('2025-06-01', '2026-03-01')->format('Y-m-d'),
                'year_level' => fake()->randomElement(['1st Year', '2nd Year', '3rd Year', '4th Year']),
                'status' => fake()->randomElement(['Regular', 'Irregular']),
                'is_present' => fake()->boolean(85),
            ]);
        }
    }
}
>>>>>>> 5459ae8ba1721fc4b8a402ad82c6f3f154a225d7
