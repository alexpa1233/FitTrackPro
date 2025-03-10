<?php

namespace App\Models;

use App\Models\Routine;
use App\Models\Exercise;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Workout extends Model
{
    use HasFactory;

    protected $fillable = [
        'routine_id',
        'name'
    ];
    public function routine(){
        return $this->belongsTo(Routine::class);
    }

    public function exercises(){
        return $this->belongsToMany(Exercise::class, 'workout_exercises')
        ->withPivot(['sets'])
        ->withTimestamps();
    }
}
