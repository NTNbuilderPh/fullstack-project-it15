<?php

namespace App\Models;

<<<<<<< HEAD
=======
// use Illuminate\Contracts\Auth\MustVerifyEmail;
>>>>>>> 5459ae8ba1721fc4b8a402ad82c6f3f154a225d7
use Database\Factories\UserFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
<<<<<<< HEAD
use Laravel\Sanctum\HasApiTokens;
=======
>>>>>>> 5459ae8ba1721fc4b8a402ad82c6f3f154a225d7

class User extends Authenticatable
{
    /** @use HasFactory<UserFactory> */
<<<<<<< HEAD
    use HasApiTokens, HasFactory, Notifiable;

=======
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
>>>>>>> 5459ae8ba1721fc4b8a402ad82c6f3f154a225d7
    protected $fillable = [
        'name',
        'email',
        'password',
    ];

<<<<<<< HEAD
=======
    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
>>>>>>> 5459ae8ba1721fc4b8a402ad82c6f3f154a225d7
    protected $hidden = [
        'password',
        'remember_token',
    ];

<<<<<<< HEAD
=======
    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
>>>>>>> 5459ae8ba1721fc4b8a402ad82c6f3f154a225d7
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }
}
