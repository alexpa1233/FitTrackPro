<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Workout extends Model
{
    use HasFactory;

    protected $fillable = [
        'routine_id',
        'day'
    ];
    public function routine(){
        return $this->belongsTo(Routine::class);
    }

    public function workoutExercises(){
        return $this->hasMany(WorkoutExercise::class);
    }

    public function exercises(){
        return $this->belongsToMany(Exercise::class, 'workout_exercises')->withPivot(['sets'])->withTimestamps();
    }
}
