<?php

namespace App\Providers;

use App\Drive\File\Repositories\FileRepository;
use App\Drive\File\Repositories\Interfaces\FileRepositoryInterface;
use App\Drive\Folder\Repositories\FolderRepository;
use App\Drive\Folder\Repositories\Interfaces\FolderRepositoryInterface;
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
            FileRepositoryInterface::class,
            FileRepository::class
        );

        $this->app->bind(
            FolderRepositoryInterface::class,
            FolderRepository::class
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
