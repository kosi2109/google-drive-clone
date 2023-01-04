<?php

namespace App\Http\Controllers;

use App\Drive\User\Repositories\Interfaces\UserRepositoryInterface;
use App\Drive\User\Requests\CreateUserRequest;
use App\Drive\User\Requests\UpdateUserRequest;
use App\Drive\User\Resources\UserResource;

class UserController extends Controller
{
    /**
     * @var User
     */
    private $userRepo;

    /**
     * ProductController constructor.
     * @param UserRepositoryInterface $userRepository
     */
    public function __construct(UserRepositoryInterface $userRepository)
    {
        $this->userRepo = $userRepository;
    }

    /**
     * UserController : User List
     * 
     * @return Collection
     */
    public function index()
    {
        return UserResource::collection($this->userRepo->listUser());
    }

    /**
     * UserController : User Create
     * 
     * @param CreateUserRequest $request
     * 
     * @return UserResource
     */
    public function create(
        CreateUserRequest $request
    )
    {
        return new UserResource($this->userRepo->createUser($request->all()));
    }
    
    /**
     * UserController : User Update
     * 
     * @param int $id
     * 
     * @param CreateUserRequest $request
     * 
     * @return UserResource
     */
    public function update(
        int $id,
        UpdateUserRequest $request
    )
    {
        return new UserResource($this->userRepo->updateUser($id, $request->all()));
    }
    
    /**
     * UserController : User Delete
     * 
     * @param int $id
     * 
     * @return UserResource
     */
    public function destroy(
        int $id
    )
    {
        return $this->userRepo->deleteUser($id);
    }
}
