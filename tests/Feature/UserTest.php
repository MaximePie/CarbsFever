<?php

namespace Tests;

use App\CarbsLine;
use App\Ticket;
use App\User;

class UserTest extends TestCase
{

    /**
     * The tickets returns only the carbslines of the current day
     * Expected : Every carbs lines of the current day
     * Unexpected : Any carbs line of another day
     * @test
     */
    public function DailyCarbsLines()
    {
        $this->artisan('db:seed');

        /** @var User $user */
        $user = User::first();
        /** @var Ticket $ticket */
        $ticket = $user->tickets()->first();
        $unexpectedCarbsLine = CarbsLine::query()->where('ticket_id', '!=', $ticket->id)->inRandomOrder()->first();
        $expectedCarbsLine = CarbsLine::query()->where('ticket_id', '=', $ticket->id)->inRandomOrder()->first();

        $userDailyCarbsLinesIds = $user->dailyCarbsLines()->get()->pluck('id')->toArray();
        $this->assertContains($expectedCarbsLine->id, $userDailyCarbsLinesIds);
        $this->assertNotContains($unexpectedCarbsLine->id, $userDailyCarbsLinesIds);
    }


    public function averageCarbsPerDayProvider()
    {
        return [
            [[300, 500], 400],
            [[1000, 500], 750],
            [[300, 600, 900], 600],
            [[2000, 2100, 1500, 1800, 1600], 1800],
        ];
    }

    /**
     * Calculates the average of every tickets for the given user
     * @dataProvider averageCarbsPerDayProvider
     * @test
     * @param array $ticketsCarbsList The current value of each tickets
     * @param int $expectedCarbsAverage The expected average of the given values
     */
    public function testAverageCarbsPerDay(array $ticketsCarbsList, int $expectedCarbsAverage)
    {
        /** @var User $user */
        $user = User::first();
        $user->tickets()->forceDelete();
        foreach ($ticketsCarbsList as $ticketCarbs) {
            Ticket::create(['user_id' => $user->id, 'target' => $user->target, 'current' => $ticketCarbs]);
        }

        $this->assertEquals($expectedCarbsAverage, $user->averageCarbsPerDay());
    }

}
