<?php

namespace App\Providers;

use App\Repositories\FollowerRepository;
use App\Repositories\FollowerRepositoryInterface;
use Illuminate\Support\ServiceProvider;

class FollowerRepositoryServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     *
     * @return void
     */
    public function register()
    {
        $this->app->bind(FollowerRepositoryInterface::class, FollowerRepository::class);
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
