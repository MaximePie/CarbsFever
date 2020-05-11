<?php

namespace App\Observers;

use App\CarbsLine;
use App\Ticket;

class CarbsLineObserver
{
    /**
     * Handle the carbs line "created" event.
     *
     * @param CarbsLine $carbsLine
     * @return void
     */
    public function created(CarbsLine $carbsLine)
    {
        /** @var Ticket $ticket */
        $ticket = $carbsLine->ticket()->first();
        $ticket->updateFromCarbsLine();
    }

    /**
     * Handle the carbs line "updated" event.
     *
     * @param CarbsLine $carbsLine
     * @return void
     */
    public function updated(CarbsLine $carbsLine)
    {
        /** @var Ticket $ticket */
        $ticket = $carbsLine->ticket()->first();
        $ticket->updateFromCarbsLine();
    }

    /**
     * Handle the carbs line "deleted" event.
     *
     * @param CarbsLine $carbsLine
     * @return void
     */
    public function deleted(CarbsLine $carbsLine)
    {
        /** @var Ticket $ticket */
        $ticket = $carbsLine->ticket()->first();
        $ticket->updateFromCarbsLine();
    }

    /**
     * Handle the carbs line "restored" event.
     *
     * @param CarbsLine $carbsLine
     * @return void
     */
    public function restored(CarbsLine $carbsLine)
    {
        /** @var Ticket $ticket */
        $ticket = $carbsLine->ticket()->first();
        $ticket->updateFromCarbsLine();
    }

    /**
     * Handle the carbs line "force deleted" event.
     *
     * @param CarbsLine $carbsLine
     * @return void
     */
    public function forceDeleted(CarbsLine $carbsLine)
    {
        /** @var Ticket $ticket */
        $ticket = $carbsLine->ticket()->first();
        $ticket->updateFromCarbsLine();
    }
}
