<?php

/** @var Factory $factory */

use App\Product;
use App\User;
use Faker\Generator as Faker;
use Illuminate\Database\Eloquent\Factory;
use Illuminate\Support\Str;

/*
|--------------------------------------------------------------------------
| Model Factories
|--------------------------------------------------------------------------
|
| This directory should contain each of the model factory definitions for
| your application. Factories provide a convenient way to generate new
| model instances for testing / seeding your application's database.
|
*/

$factory->define(Product::class, static function (Faker $faker) {
    $carbsPerHundred = $faker->numberBetween(10, 1500);
    $gramsPerPortion = $faker->numberBetween(1, 500);
    return [
        'name' => implode(' ', $faker->words(random_int(1, 4))),
        'carbsPerHundred' => $carbsPerHundred,
        'gramsPerPortion' => $gramsPerPortion,
        'carbsPerPortion' => $carbsPerHundred / 100 * $gramsPerPortion,
    ];
});
