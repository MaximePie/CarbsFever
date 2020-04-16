<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class CarbsLine extends Model
{
    protected $fillable = [
        'portions',
        'product_id',
        'ticket_id',
        'created_at',
        'updated_at',
    ];
    public $timestamps = true;
}
