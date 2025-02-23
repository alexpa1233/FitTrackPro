<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ExerciseStatistic extends Model
{
    use HasFactory;


    protected $fillable = [
        'user_id',
        'exercise_id',
        'sets',
        'reps',
        'weight',
        'duration',
        'date'
    ];


    public function user(){
        return $this->belongsTo(User::class);
    }

   
    public function workoutExercise(){
        return $this->belongsTo(WorkoutExercise::class);
    }
}
