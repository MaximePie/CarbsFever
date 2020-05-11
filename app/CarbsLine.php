<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * @method static create(array $array)
 * @method static first()
 * @property int id
 * @property int portions
 */
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

    /**
     * @return BelongsTo
     */
    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class);
    }

    /**
     * @return BelongsTo
     */
    public function ticket(): BelongsTo
    {
        return $this->belongsTo(Ticket::class);
    }

    /**
     * Returns the calculated carbs
     */
    public function carbs(): int
    {
        return $this->portions * $this->product()->first()->carbsPerPortion;
    }
}
