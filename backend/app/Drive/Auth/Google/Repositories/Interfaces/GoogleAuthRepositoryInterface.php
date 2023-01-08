<?php

namespace App\Drive\Auth\Google\Repositories\Interfaces;

interface GoogleAuthRepositoryInterface
{
    public function redirect();
    public function callBack();
}