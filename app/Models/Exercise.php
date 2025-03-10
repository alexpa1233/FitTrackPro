<?php

namespace App\Models;

use App\Models\Type;
use App\Models\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Exercise extends Model
{
    use HasFactory;


    protected $fillable = [
        'user_id',
        'type_id',
        'name',
        'description',
        'image'
    ];

    public function user(){
        return $this->belongsTo(User::class);
    }

    public function type(){
        return $this->belongsTo(Type::class);
    }

    public function workouts(){
        return $this->belongsToMany(Workout::class, 'workout_exercises')
        ->withPivot(['sets'])
        ->withTimestamps();
    }
}
