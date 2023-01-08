<?php

namespace App\Drive\User\Repositories\Interfaces;

use App\Drive\User\User;

interface UserRepositoryInterface
{
    public function listUser($columns = ['*'], string $orderBy = 'name', string $sortBy = 'asc');
    public function createUser(array $params) : User;
    public function findUserById(int $id) : User;
    public function updateUser(int $id,array $params) : User;
    public function deleteUser(int $id) : bool;
    public function firstOrCreateUser(string $email, array $params) : User;
}