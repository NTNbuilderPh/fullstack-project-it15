<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class CourseFactory extends Factory
{
    public function definition(): array
    {
        return [
            'course_code' => strtoupper(fake()->unique()->bothify('BS??-##')),
            'course_name' => fake()->sentence(4),
            'department' => fake()->randomElement(['CCS', 'COE', 'CBA', 'CAS', 'CCJE', 'CON', 'CTHM', 'CA']),
        ];
    }
}