<?php

namespace App\Models;

use App\Models\Exercise;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Type extends Model
{
    use HasFactory;
    protected $fillable = [
        'name'
    ];

    public function exercises(){
        return $this->hasMany(Exercise::class);
    }
}
