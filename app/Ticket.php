<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * @property int current
 * @property int id
 * @method static first()
 */
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

    /**
     * An alternative method to insert a CarbLine attached to a ticket
     * @param Product $product
     * @param int $portions
     * @return CarbsLine
     */
    public function addCarbsLine(Product $product, int $portions): CarbsLine
    {
        return CarbsLine::create(['ticket_id' => $this->id, 'product_id' => $product->id, 'portions' => $portions]);
    }
}
