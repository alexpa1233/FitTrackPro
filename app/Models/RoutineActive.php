<?php

namespace App\Models;

use App\Models\User;
use App\Models\Routine;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class RoutineActive extends Model
{
    use HasFactory;
    protected $fillable = [
        'user_id',
        'routine_id',
        
    ];

    public function user(){
        return $this->belongsTo(User::class);
    }

    public function routine(){
        return $this->belongsTo(Routine::class);
    }
}
