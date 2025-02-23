<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class WorkoutExercise extends Model
{
    use HasFactory;

    protected $fillable = [
        'workout_id',
        'exercise_id',
        'sets'
    ];

    public function workout(){
        return $this->belongsTo(Workout::class);
    }

    public function exercise(){
        return $this->belongsTo(Exercise::class);
    }

    public function exerciseStatistics(){
        return $this->hasMany(ExerciseStatistic::class);
    }
}
