<?php

use App\CarbsLine;
use App\Product;
use App\Ticket;
use App\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $user1 = User::create([
           'name' => 'Maxime',
            'target' => 1700,
        ]);

        $user2 = User::create([
           'name' => 'Carole',
           'target' => 1300,
        ]);

        $ticket1 = Ticket::create([
            'target' => $user1->target,
            'current' => 0,
            'user_id' => $user1->id,
        ]);

        $ticket2 = Ticket::create([
            'target' => $user2->target,
            'current' => 0,
            'user_id' => $user2->id,
        ]);

        $product1 = Product::create([
            'name' => 'lait',
            'carbsPerHundred' => 100,
            'gramsPerPortion' => 250,
            'carbsPerPortion' => 250,
        ]);

        $product2 = Product::create([
            'name' => 'pates',
            'carbsPerHundred' => 350,
            'gramsPerPortion' => 125,
            'carbsPerPortion' => 400,
        ]);

        $carbsLine1 = CarbsLine::create([
            'portions' => 2,
            'product_id' => $product1->id,
            'ticket_id' => $ticket1->id,
        ]);

        $carbsLine2 = CarbsLine::create([
            'portions' => 1,
            'product_id' => $product2->id,
            'ticket_id' => $ticket2->id,
        ]);
    }
}
