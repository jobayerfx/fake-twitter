<?php

namespace App\Providers;

use App\Repositories\TweetRepository;
use App\Repositories\TweetRepositoryInterface;
use Illuminate\Support\ServiceProvider;

class TweetRepositoryServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     *
     * @return void
     */
    public function register()
    {
        $this->app->bind(TweetRepositoryInterface::class, TweetRepository::class);
    }

    /**
     * Bootstrap services.
     *
     * @return void
     */
    public function boot()
    {
        //
    }
}
