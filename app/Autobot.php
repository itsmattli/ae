<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Autobot extends Model
{
    public $timestamps = false;
    protected $fillable = [
        'name', 'strength', 'intelligence', 'speed', 'endurance', 'rank', 'courage', 'firepower', 'skill',
    ];
}
