<?php

use App\CarbsLine;
use App\Product;
use App\Ticket;
use App\User;
use Carbon\Carbon;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Log;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     * @throws Exception
     */
    public function run()
    {
        factory(Product::class)->times(random_int(5, 75))->create();
        $this->createTicketsForUser1();
        $this->createTicketsForUser2();
    }

    /**
     * Create an user, create stable datas and random datas
     */
    public function createTicketsForUser1()
    {
        Log::info('This is some useful information.');
        /** @var User $user */
        $user = User::create([
            'name' => 'Maxime',
            'target' => 1700,
        ]);

        $ticket = Ticket::create([
            'target' => $user->target,
            'current' => 0,
            'user_id' => $user->id,
        ]);

        $product = Product::create([
            'name' => 'lait',
            'carbsPerHundred' => 100,
            'gramsPerPortion' => 250,
            'carbsPerPortion' => 250,
        ]);

        CarbsLine::create([
            'portions' => 2,
            'product_id' => $product->id,
            'ticket_id' => $ticket->id,
        ]);


        try {
            for ($ticketIndex = 0; $ticketIndex < random_int(3, 40); $ticketIndex += 1) {
                Ticket::create([
                    'target' => $user->target,
                    'current' => 0,
                    'user_id' => $user->id,
                    'created_at' => Carbon::now()->subDays($ticketIndex),
                ]);
            }

            for ($carbLineIndex = 0; $carbLineIndex < random_int(3, 15); $carbLineIndex += 1) {
                CarbsLine::create([
                    'portions' => random_int(1, 10),
                    'product_id' => Product::query()->inRandomOrder()->first()->id,
                    'ticket_id' => $user->tickets()->inRandomOrder()->first()->id,
                ]);
            }

        } catch (Exception $e) {
        }
    }

    public function createTicketsForUser2()
    {

        $user2 = User::create([
            'name' => 'Carole',
            'target' => 1300,
        ]);

        $ticket2 = Ticket::create([
            'target' => $user2->target,
            'current' => 0,
            'user_id' => $user2->id,
        ]);

        $product2 = Product::create([
            'name' => 'pates',
            'carbsPerHundred' => 350,
            'gramsPerPortion' => 125,
            'carbsPerPortion' => 400,
        ]);

        CarbsLine::create([
            'portions' => 1,
            'product_id' => $product2->id,
            'ticket_id' => $ticket2->id,
        ]);
    }
}
