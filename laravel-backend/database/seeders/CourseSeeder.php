<?php

namespace Database\Seeders;

use App\Models\Course;
use Illuminate\Database\Seeder;

class CourseSeeder extends Seeder
{
    public function run(): void
    {
        $courses = [
            ['course_code' => 'BSIT', 'course_name' => 'Bachelor of Science in Information Technology', 'department' => 'CCS'],
            ['course_code' => 'BSCS', 'course_name' => 'Bachelor of Science in Computer Science', 'department' => 'CCS'],
            ['course_code' => 'BSEMC', 'course_name' => 'Bachelor of Science in Entertainment and Multimedia Computing', 'department' => 'CCS'],
            ['course_code' => 'BSIS', 'course_name' => 'Bachelor of Science in Information Systems', 'department' => 'CCS'],

            ['course_code' => 'BEED', 'course_name' => 'Bachelor of Elementary Education', 'department' => 'COE'],
            ['course_code' => 'BSED-ENG', 'course_name' => 'Bachelor of Secondary Education Major in English', 'department' => 'COE'],
            ['course_code' => 'BSED-MATH', 'course_name' => 'Bachelor of Secondary Education Major in Mathematics', 'department' => 'COE'],
            ['course_code' => 'BSED-SCI', 'course_name' => 'Bachelor of Secondary Education Major in Science', 'department' => 'COE'],

            ['course_code' => 'BSBA-MM', 'course_name' => 'Bachelor of Science in Business Administration Major in Marketing Management', 'department' => 'CBA'],
            ['course_code' => 'BSBA-FM', 'course_name' => 'Bachelor of Science in Business Administration Major in Financial Management', 'department' => 'CBA'],
            ['course_code' => 'BSA', 'course_name' => 'Bachelor of Science in Accountancy', 'department' => 'CBA'],
            ['course_code' => 'BSAIS', 'course_name' => 'Bachelor of Science in Accounting Information System', 'department' => 'CBA'],

            ['course_code' => 'BPA', 'course_name' => 'Bachelor of Public Administration', 'department' => 'CAS'],
            ['course_code' => 'AB-POLSCI', 'course_name' => 'Bachelor of Arts in Political Science', 'department' => 'CAS'],
            ['course_code' => 'AB-ENG', 'course_name' => 'Bachelor of Arts in English Language', 'department' => 'CAS'],

            ['course_code' => 'BSCRIM', 'course_name' => 'Bachelor of Science in Criminology', 'department' => 'CCJE'],
            ['course_code' => 'BSN', 'course_name' => 'Bachelor of Science in Nursing', 'department' => 'CON'],
            ['course_code' => 'BSHM', 'course_name' => 'Bachelor of Science in Hospitality Management', 'department' => 'CTHM'],
            ['course_code' => 'BSTM', 'course_name' => 'Bachelor of Science in Tourism Management', 'department' => 'CTHM'],
            ['course_code' => 'BSAGRI', 'course_name' => 'Bachelor of Science in Agriculture', 'department' => 'CA'],
        ];

        foreach ($courses as $course) {
            Course::updateOrCreate(
                ['course_code' => $course['course_code']],
                $course
            );
        }
    }
}