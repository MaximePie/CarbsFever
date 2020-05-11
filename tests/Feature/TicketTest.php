<?php

namespace Tests\Feature;

use App\CarbsLine;
use App\Product;
use App\Ticket;
use Exception;
use Tests\TestCase;

class TicketTest extends TestCase
{

    /**
     * The ticket current value stays to 0 when update with an empty carbslines bag
     * Expected : 0
     * @return void
     * @throws Exception
     * @test
     */
    public function TicketUpdatesStaysNullWhenThereAreNoCarbsLine()
    {
        /** @var Ticket $ticket */
        $ticket = Ticket::first();
        $ticket->carbsLines()->forceDelete();
        $ticket->save();
        $ticket->current;

        $this->assertEquals(0, $ticket->current);
    }

    /**
     * The ticket current value is updated with updateFromCarbsLine to the sum of carbs from its carblines
     * @test
     * @throws Exception
     */
    public function TicketUpdatesToTheSumOfCarbsLines() {
        /** @var Ticket $ticket */
        $ticket = Ticket::first();
        $ticket->current = 10000;
        $ticket->save();
        $ticket->carbsLines()->forceDelete();
        /** @var Product $product */
        $product = Product::first();
        $product->carbsPerPortion = random_int(5,500);
        $product->save();
        $portions = random_int(1, 10);

        $addedCarbsLine = $ticket->addCarbsLine($product, $portions);
        $this->assertEquals($product->carbsPerPortion * $portions, $ticket->current);

        $addedCarbsLine->forceDelete();
        $this->assertEquals(0, $ticket->current);
    }


    /**
     * addCarbsLines method adds a carbsLine to the ticket
     * Expected : The created CarbsLine is attached to the ticket
     * Expected : The amount of carbsLines is up to date
     * @test
     */
    public function addCarbsLinesAddsACarbsLine() {
        /** @var Ticket $ticket */
        $ticket = Ticket::first();
        $product = Product::first();
        $initialCarbsLineAmount = $ticket->carbsLines()->count();

        /** @var CarbsLine $expectedCarbsLine */
        $expectedCarbsLine = $ticket->addCarbsLine($product, 1);

        $this->assertContains($expectedCarbsLine->id, $ticket->carbsLines()->get()->pluck('id')->toArray());
        $this->assertCount($initialCarbsLineAmount + 1, $ticket->carbsLines()->get());
    }

}
