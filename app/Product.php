<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $fillable = [
        'name',
        'carbsPerHundred',
        'gramsPerPortion',
        'carbsPerPortion',
        'created_at',
        'updated_at',
    ];
    public $timestamps = true;
}
