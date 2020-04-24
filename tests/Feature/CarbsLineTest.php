<?php

namespace Tests\Feature;

use App\CarbsLine;
use App\Product;
use App\Ticket;
use App\User;
use Tests\TestCase;

class CarbsLineTest extends TestCase
{

    /**
     * Provides a dataset for calculated carbs
     * [CarbsPerPortion, Portions, ExpectedCarbs]
     */
    public function calculatedCarbsProvider()
    {
        return [
            [50, 4, 200],
            [100, 1, 100],
            [1, 5000, 5000],
        ];
    }

    /**
     * The carbs Line returns the appropriate calculated carbs
     *
     * @param $carbsPerPortion int Number of carbs per portion of product
     * @param $portions int Number of portions
     * @param $expectedCarbs int Expected Carbs
     * @return void
     * @test
     * @dataProvider calculatedCarbsProvider
     */
    public function theCarbsLineGetsTheCalculatedCarbs($carbsPerPortion, $portions, $expectedCarbs)
    {

        $product = Product::first();
        $product->carbsPerPortion = $carbsPerPortion;
        $product->save();
        /** @var CarbsLine $carbsLine */
        $carbsLine = CarbsLine::first();
        $carbsLine->portions = $portions;
        $carbsLine->save();

        $this->assertEquals($expectedCarbs, $carbsLine->carbs());
    }

}
