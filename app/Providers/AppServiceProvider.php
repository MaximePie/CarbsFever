<?php

namespace App\Providers;

use App\CarbsLine;
use App\Observers\CarbsLineObserver;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        CarbsLine::observe(CarbsLineObserver::class);
    }
}
