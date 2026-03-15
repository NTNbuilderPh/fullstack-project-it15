<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Student extends Model
{
    use HasFactory;

    protected $fillable = [
        'student_number',
        'first_name',
        'last_name',
        'gender',
        'birthdate',
        'address',
        'course_id',
        'enrollment_date',
        'year_level',
        'status',
        'is_present',
    ];

    protected function casts(): array
    {
        return [
            'birthdate' => 'date',
            'enrollment_date' => 'date',
            'is_present' => 'boolean',
        ];
    }

    protected $appends = ['full_name'];

    public function getFullNameAttribute(): string
    {
        return "{$this->first_name} {$this->last_name}";
    }

    public function course()
    {
        return $this->belongsTo(Course::class);
    }
}