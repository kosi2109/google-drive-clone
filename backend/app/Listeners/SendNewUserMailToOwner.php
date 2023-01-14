<?php

namespace App\Listeners;

use App\Notifications\NewUserCreated;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Support\Facades\Notification;

class SendNewUserMailToOwner implements ShouldQueue
{
    /**
     * Create the event listener.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     *
     * @param  object  $event
     * @return void
     */
    public function handle($event)
    {
        Notification::route('mail', [
            'sithuhtet.kosi21@gmail.com' => 'Si Thu Htet',
        ])->notify(new NewUserCreated($event->user));
    }
}
