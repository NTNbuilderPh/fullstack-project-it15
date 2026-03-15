<?php

namespace Database\Seeders;

use App\Models\SchoolDay;
use Carbon\Carbon;
use Illuminate\Database\Seeder;

class SchoolDaySeeder extends Seeder
{
    public function run(): void
    {
        $start = Carbon::create(2025, 6, 1);
        $end = Carbon::create(2026, 3, 31);

        $holidays = [
            '2025-08-21' => 'Ninoy Aquino Day',
            '2025-08-25' => 'National Heroes Day',
            '2025-11-01' => 'All Saints\' Day',
            '2025-11-30' => 'Bonifacio Day',
            '2025-12-25' => 'Christmas Day',
            '2025-12-30' => 'Rizal Day',
            '2026-01-01' => 'New Year\'s Day',
            '2026-02-25' => 'EDSA People Power Revolution',
        ];

        $events = [
            '2025-07-14' => 'Orientation Week',
            '2025-09-15' => 'University Foundation Celebration',
            '2025-10-20' => 'Intramurals',
            '2026-02-14' => 'College Days',
            '2026-03-20' => 'Recognition Program',
        ];

        while ($start->lte($end)) {
            if ($start->isSunday()) {
                $start->addDay();
                continue;
            }

            $date = $start->format('Y-m-d');
            $type = 'class_day';
            $title = 'Regular Class Day';
            $attendance = rand(320, 500);
            $notes = null;

            if (array_key_exists($date, $holidays)) {
                $type = 'holiday';
                $title = $holidays[$date];
                $attendance = 0;
                $notes = 'No classes.';
            } elseif (array_key_exists($date, $events)) {
                $type = 'event';
                $title = $events[$date];
                $attendance = rand(120, 300);
                $notes = 'Special academic/campus event.';
            } elseif ($start->isSaturday()) {
                $type = 'event';
                $title = 'Weekend Campus Activity';
                $attendance = rand(80, 220);
                $notes = 'Optional school-based activity.';
            }

            SchoolDay::updateOrCreate(
                ['date' => $date],
                [
                    'type' => $type,
                    'title' => $title,
                    'attendance_count' => $attendance,
                    'notes' => $notes,
                ]
            );

            $start->addDay();
        }
    }
}