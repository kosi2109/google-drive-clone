<?php

namespace App\Drive\User;

use Illuminate\Database\Eloquent\Model;

class User extends Model
{    
    protected $fillable =[
        'name',
        'email',
        'password',
    ];
}