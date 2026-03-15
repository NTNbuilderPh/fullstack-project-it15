<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class SchoolDayFactory extends Factory
{
    public function definition(): array
    {
        return [
            'date' => fake()->unique()->dateTimeBetween('2025-06-01', '2026-03-31')->format('Y-m-d'),
            'type' => fake()->randomElement(['class_day', 'holiday', 'event']),
            'title' => fake()->randomElement(['Regular Class Day', 'Holiday', 'Campus Event']),
            'attendance_count' => fake()->numberBetween(0, 500),
            'notes' => fake()->optional()->sentence(),
        ];
    }
}