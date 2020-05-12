<?php

namespace App;

use Carbon\Carbon;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

/**
 * @property int id
 * @property int target
 */
class User extends Authenticatable
{
    use Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name',
        'target',
    ];

    public $timestamps = false;

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];


    /**
     * @return HasMany
     */
    public function tickets(): hasMany
    {
        return $this->hasMany(Ticket::class);
    }

    public function averageCarbsPerDay()
    {
        return $this->tickets()->pluck('current')->average();
    }

    /**
     * Returns carbsLines that were created today
     * @return HasMany
     */
    public function dailyCarbsLines()
    {
        /** @var Ticket $ticket */
        $ticket = $this->tickets()->whereDate('created_at', Carbon::now())->firstOrFail();
        return $ticket->carbsLines();
    }
}
