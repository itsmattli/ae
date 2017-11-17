<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Decepticon extends Model
{
    public $timestamps = false;
    protected $fillable = [
        'name', 'strength', 'intelligence', 'speed', 'endurance', 'rank', 'courage', 'firepower', 'skill',
    ];
}
