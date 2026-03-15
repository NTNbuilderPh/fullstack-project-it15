<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('students', function (Blueprint $table) {
            $table->id();
            $table->string('student_number', 50)->unique();
            $table->string('first_name', 100);
            $table->string('last_name', 100);
            $table->enum('gender', ['Male', 'Female']);
            $table->date('birthdate');
            $table->string('address')->nullable();
            $table->foreignId('course_id')->constrained()->cascadeOnDelete();
            $table->date('enrollment_date');
            $table->enum('year_level', ['1st Year', '2nd Year', '3rd Year', '4th Year']);
            $table->enum('status', ['Regular', 'Irregular'])->default('Regular');
            $table->boolean('is_present')->default(true);
            $table->timestamps();

            $table->index(['course_id', 'enrollment_date']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('students');
    }
};