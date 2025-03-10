<?php

namespace App\Models;

use App\Models\User;
use App\Models\Workout;
use App\Models\RoutineActive;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Routine extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'name',
        'description',
        'image'
    ];

    public function user(){
        return $this->belongsTo(User::class);
    }

    public function workouts(){
        return $this->hasMany(Workout::class);
    }

    public function routineActives(){
        return $this->hasMany(RoutineActive::class);
    }
}
