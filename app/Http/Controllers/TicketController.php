<?php

namespace App\Http\Controllers;

use App\CarbsLine;
use App\Ticket;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Routing\Controller as BaseController;

class TicketController extends BaseController
{

    /**
     * Display a listing of the resource.
     *
     * @return Ticket[]|Collection
     */
    public function index()
    {
        $tickets = Ticket::query()
            ->orderBy('created_at', 'desc')
            ->get();

        $tickets->each(function(Ticket $ticket) {
           $ticket['user'] = $ticket->user()->first();
        });

        return $tickets;
    }

    /**
     * Display a specific resource
     *
     * @param $id
     * @return Ticket
     */
    public function show($id)
    {
        /** @var Ticket $ticket */
        $ticket = Ticket::find($id);
        $ticket['user'] = $ticket->user()->first();
        $ticket['lines'] = $ticket->carbsLines()->get();
        $ticket['lines']->each(function(CarbsLine $line) {
           $line['product'] = $line->product()->first();
        });

        return $ticket;
    }

}
