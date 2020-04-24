<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

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

    /**
     * @return BelongsTo
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * @return HasMany
     */
    public function carbsLines(): hasMany
    {
        return $this->hasMany(CarbsLine::class);
    }

    /**
     * Update the current Ticket based on the current carbslines
     * @return $this
     */
    public function updateFromCarbsLine(): self
    {
        $current = 0;

        $this->carbsLines()->each(function(CarbsLine $line) use (&$current){
           $current += $line->carbs();
        });

        $this->current = $current;
        $this->save();
        return $this;
    }
}
