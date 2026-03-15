<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('school_days', function (Blueprint $table) {
            $table->id();
            $table->date('date')->unique();
            $table->enum('type', ['class_day', 'holiday', 'event']);
            $table->string('title');
            $table->unsignedInteger('attendance_count')->default(0);
            $table->string('notes')->nullable();
            $table->timestamps();

            $table->index(['date', 'type']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('school_days');
    }
};