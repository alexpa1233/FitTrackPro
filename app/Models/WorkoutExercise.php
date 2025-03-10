<?php

namespace App\Models;

use App\Models\Workout;
use App\Models\Exercise;
use App\Models\ExerciseStatistic;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

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
