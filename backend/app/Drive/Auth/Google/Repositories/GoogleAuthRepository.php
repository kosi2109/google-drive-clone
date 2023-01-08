<?php

namespace App\Drive\Auth\Google\Repositories;

use App\Drive\Auth\Google\Exceptions\GoogleInvalidCredentialException;
use App\Drive\Auth\Google\Repositories\Interfaces\GoogleAuthRepositoryInterface;
use App\Drive\User\User;
use Exception;
use GuzzleHttp\Exception\ClientException;
use Laravel\Socialite\Facades\Socialite;
use Laravel\Socialite\Contracts\User as SocialiteUser;

class GoogleAuthRepository implements GoogleAuthRepositoryInterface
{
    /**
     * GoogleAuthRepository constructor.
     *
     * @param User $model
     */
    public function __construct(private User $model)
    {
        //
    }

    public function redirect()
    {
        return Socialite::driver('google')
        ->stateless()
        ->redirect()
        ->getTargetUrl();
    }

    public function callBack()
    {
        try {
            $socialiteUser = Socialite::driver('google')->stateless()->user();
            /** @var SocialiteUser $socialiteUser */
            return $socialiteUser;
        } catch (ClientException $e) {
            throw new GoogleInvalidCredentialException($e->getMessage(), 422);
        }
    }
}