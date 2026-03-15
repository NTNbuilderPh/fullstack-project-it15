<?php

namespace Database\Factories;

use App\Models\Course;
use Illuminate\Database\Eloquent\Factories\Factory;

class StudentFactory extends Factory
{
    public function definition(): array
    {
        return [
            'student_number' => '2025-' . fake()->unique()->numerify('#####'),
            'first_name' => fake()->firstName(),
            'last_name' => fake()->lastName(),
            'gender' => fake()->randomElement(['Male', 'Female']),
            'birthdate' => fake()->dateTimeBetween('-25 years', '-16 years')->format('Y-m-d'),
            'address' => fake()->address(),
            'course_id' => Course::query()->inRandomOrder()->value('id') ?? 1,
            'enrollment_date' => fake()->dateTimeBetween('2025-06-01', '2026-03-01')->format('Y-m-d'),
            'year_level' => fake()->randomElement(['1st Year', '2nd Year', '3rd Year', '4th Year']),
            'status' => fake()->randomElement(['Regular', 'Irregular']),
            'is_present' => fake()->boolean(85),
        ];
    }
}