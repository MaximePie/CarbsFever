<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Ticket extends Model
{
    protected $fillable = [
        'target',
        'current',
        'user_id',
        'created_at',
        'updated_at',
    ];
    public $timestamps = true;

}
