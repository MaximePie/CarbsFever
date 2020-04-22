<?php

namespace App\Http\Controllers;

use App\CarbsLine;
use App\Ticket;
use App\User;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\JsonResponse;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Support\Carbon;

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
     * @param $ticketId
     * @return Ticket
     */
    public function show($ticketId)
    {
        /** @var Ticket $ticket */
        $ticket = Ticket::find($ticketId);
        $user = User::find($ticket->user()->first()->id);

        $ticket['user'] = $user;
        $ticket['lines'] = $ticket->carbsLines()->get();
        $ticket['lines']->each(function(CarbsLine $line) {
           $line['product'] = $line->product()->first();
        });

        return $ticket;
    }

    /**
     * Display a current resource and create a new ticket a
     *
     * @param $userName
     * @return JsonResponse
     */
    public function current($userName)
    {
        $user = User::query()->where('name', $userName)->first();
        if (!$user) {
            return JsonResponse::create(['code' => 500, 'message' => 'Utilisateur non trouvé']);
        }
        /** @var Ticket $ticket */
        $ticket = $user->tickets()->orderBy('created_at', 'desc')->first();

        if (
            !Carbon::create($ticket->created_at->toDateTimeString())
            ->isSameDay(Carbon::now())
        ) {
            $ticket = Ticket::create([
                'user_id' => $user->id,
                'target' => $user->target,
                'current' => 0,
            ]);
        }

        $ticket['user'] = $ticket->user()->first();
        $ticket['lines'] = $ticket->carbsLines()->get();
        $ticket['lines']->each(function(CarbsLine $line) {
           $line['product'] = $line->product()->first();
        });

        return JsonResponse::create($ticket);
    }

}
