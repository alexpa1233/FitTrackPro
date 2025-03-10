<?php

namespace App\Models;


use App\Models\Routine;
use App\Models\Exercise;
use App\Models\LoginLog;
use App\Models\RoutineActive;
use App\Models\ExerciseStatistic;
use Laravel\Sanctum\HasApiTokens;
use Spatie\Permission\Traits\HasRoles;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;


/**
 * @method static \Illuminate\Database\Eloquent\Builder|User load($relations)
 * @method string createToken(string $name)
 */
class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable, HasRoles;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password'
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];


    public function routineActive(){
        return $this->hasOne(RoutineActive::class);
    }

    public function routines(){
            return $this->hasMany(Routine::class);
    }

    public function exerciseStatistics(){
        return $this->hasMany(ExerciseStatistic::class);
    }

    public function exercises(){
        return $this->hasMany(Exercise::class);
    }
    
    public function loginLogs(){
        return $this->hasMany(LoginLog::class);
    }

    
}
