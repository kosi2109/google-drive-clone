<?php

namespace App\Http\Controllers;

use App\Drive\Auth\Google\Requests\GoogleAuthRequest;
use App\Drive\User\Repositories\Interfaces\UserRepositoryInterface;
use Illuminate\Log\Logger;

class ApiAuthController extends Controller
{
    private $userRepo;

    /**
     * ApiAuthController constructor.
     * 
     * @param UserRepositoryInterface $userRepository
     */
    public function __construct(
        UserRepositoryInterface $userRepository
    ) {
        $this->userRepo = $userRepository;
    }
    
    public function googleLogin(
        GoogleAuthRequest $request
    ) 
    {
        $params = $request->input();

        $user = $this->userRepo->firstOrCreateUser([
            'email' => $params['email'],
            'google_id' => $params['google_id'],
            'avatar' => $params['imageUrl'],
            'name' => $params['name']
        ]);

        $token = $user->createToken(env('JWT_SECRET'), ['*'], now()->addDays(30))->plainTextToken;

        return response()->json([
            'user' => $user,
            'access_token' => $token,
            'token_type' => 'Bearer',
        ]);
    }

    public function logout()
    {
        //only delete token that currently device is used
        auth()->user()->currentAccessToken()->delete();

        return response('Logout Success');
    }
}
