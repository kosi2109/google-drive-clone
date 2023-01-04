<?php

namespace App\Drive\User\Requests;

use App\Drive\Base\BaseRequest;

class CreateUserRequest extends BaseRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'name' => ['required'],
            'email' => ['required', 'email:rfc,dns', 'unique:users'],
            'password' => ['required', 'min:8']
        ];
    }
}
