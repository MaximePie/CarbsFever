<?php

namespace App\Http\Controllers;

use App\CarbsLine;
use App\Product;
use App\Ticket;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller as BaseController;

class CarbsLineController extends BaseController
{
    /**
     * Display a listing of the resource.
     *
     * @param $ticketId
     * @param Request $request
     * @return Ticket|JsonResponse
     */
    public function create($ticketId, Request $request)
    {
        $productName = $request->get('product');
        $carbsPerHundred = intval($request->get('carbsPerHundred'));
        $gramsPerPortion = intval($request->get('gramsPerPortion'));
        $product = Product::where('name', '=', $request->get('product'))->first();

        if (!$product && !$carbsPerHundred && !$gramsPerPortion) {
            return JsonResponse::create([500, $carbsPerHundred, $gramsPerPortion]);
        }

        if (!$product) {
            $product = Product::create([
                'name' => $productName,
                'carbsPerHundred' => $carbsPerHundred,
                'gramsPerPortion' => $gramsPerPortion,
                'carbsPerPortion' => $carbsPerHundred * $gramsPerPortion / 100,
            ]);
        }


        /** @var Ticket $ticket */
        $ticket = Ticket::find($ticketId);
        $carbsLine = CarbsLine::create([
            'ticket_id' => $ticketId,
            'portions' => $request->get('portion'),
            'product_id' => $product->id,
        ]);

        $ticket->current += $carbsLine->portions * $product->carbsPerPortion;
        $ticket->save();

        $ticket['user'] = $ticket->user()->first();
        $ticket['lines'] = $ticket->carbsLines()->get();
        $ticket['lines']->each(function(CarbsLine $line) {
            $line['product'] = $line->product()->first();
        });

        return $ticket;
    }
}
