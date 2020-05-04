<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

/**
 * @method static first()
 * @method static find(int $id)
 * @property string name
 * @property int carbsPerHundred
 * @property int gramsPerPortion
 * @property int carbsPerPortion
 */
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
