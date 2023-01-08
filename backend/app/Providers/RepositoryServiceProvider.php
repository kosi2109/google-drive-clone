<?php

namespace App\Providers;

use App\Drive\Auth\Google\Repositories\GoogleAuthRepository;
use App\Drive\Auth\Google\Repositories\Interfaces\GoogleAuthRepositoryInterface;
use App\Drive\User\Repositories\Interfaces\UserRepositoryInterface;
use App\Drive\User\Repositories\UserRepository;
use Illuminate\Support\ServiceProvider;

class RepositoryServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     *
     * @return void
     */
    public function register()
    {
        $this->app->bind(
            UserRepositoryInterface::class,
            UserRepository::class
        );

        $this->app->bind(
            GoogleAuthRepositoryInterface::class,
            GoogleAuthRepository::class
        );
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
