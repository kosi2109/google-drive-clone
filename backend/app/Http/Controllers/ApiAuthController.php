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
        $user = $this->userRepo->firstOrCreateUser($request->all());

        $token = $user->createToken(env('JWT_SECRET'))->plainTextToken;

        return response()->json([
            'user' => $user,
            'access_token' => $token,
            'token_type' => 'Bearer',
        ]);
    }
}
