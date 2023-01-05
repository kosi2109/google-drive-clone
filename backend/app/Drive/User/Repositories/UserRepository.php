<?php

namespace App\Drive\User\Repositories;

use App\Drive\User\Exceptions\UserNotFoundException;
use App\Drive\User\Repositories\Interfaces\UserRepositoryInterface;
use App\Drive\User\User;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class UserRepository implements UserRepositoryInterface
{
    /**
     * UserRepository constructor.
     *
     * @param User $model
     */
    public function __construct(private User $model)
    {
        //
    }

    /**
     * @param array $columns
     * @param string $orderBy
     * @param string $sortBy
     *
     * @return mixed
     */
    public function listUser($columns = ['*'], string $orderBy = 'name', string $sortBy = 'asc')
    {
        return $this->model->all();
    }

    /**
     * @param array $params
     * 
     * @return User
     */
    public function createUser(array $params) : User
    {
        return $this->model->create($params);
    }

    /**
     * @param int $id
     * 
     * @return User
     */
    public function findUserById(int $id) : User
    {
        try {       
            return $this->model->findOrFail($id);
        } catch (ModelNotFoundException $th) {
            throw new UserNotFoundException('User Not Found', 404);
        }
    }

    /**
     * @param int $id
     * @param array $params
     * 
     * @return User
     */
    public function updateUser(int $id, array $params): User
    {
        $user = $this->findUserById($id);

        $user->update($params);

        return $user->fresh();
    }

    /**
     * @param int $id
     * 
     * @return bool
     */
    public function deleteUser(int $id): bool
    {
        $user = $this->findUserById($id);
        
        return $user->delete();
    }
}