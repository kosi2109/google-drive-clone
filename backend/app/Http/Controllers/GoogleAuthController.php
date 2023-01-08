<?php

namespace App\Http\Controllers;

use App\Drive\Auth\Google\Repositories\Interfaces\GoogleAuthRepositoryInterface;
use App\Drive\User\Repositories\Interfaces\UserRepositoryInterface;
use Illuminate\Http\JsonResponse;

class GoogleAuthController extends Controller
{
    private $googleAuthRepo;

    private $userRepo;

    /**
     * GoogleAuthController constructor.
     * 
     * @param GoogleAuthRepositoryInterface $googleAuthRepository
     * @param UserRepositoryInterface $userRepository
     */
    public function __construct(
        GoogleAuthRepositoryInterface $googleAuthRepository,
        UserRepositoryInterface $userRepository
    ) {
        $this->googleAuthRepo = $googleAuthRepository;
        $this->userRepo = $userRepository;
    }

    /**
     * Redirect Route
     */
    public function redirectToAuth(): JsonResponse
    {
        return response()->json(['url' => $this->googleAuthRepo->redirect()]);
    }

    /**
     * Callback route and Store Data
     */
    public function handleAuthCallback(): JsonResponse
    {
        $socialiteUser = $this->googleAuthRepo->callBack();

        $user = $this->userRepo->firstOrCreateUser($socialiteUser->getEmail(), [
            'email_verified_at' => now(),
            'name' => $socialiteUser->getName(),
            'google_id' => $socialiteUser->getId(),
            'avatar' => $socialiteUser->getAvatar(),
        ]);

        $token = $user->createToken(env('JWT_SECRET'))->plainTextToken;

        return response()->json([
            'user' => $user,
            'access_token' => $token,
            'token_type' => 'Bearer',
        ])->withCookie(Cookie('access_token', $token));
    }
}
