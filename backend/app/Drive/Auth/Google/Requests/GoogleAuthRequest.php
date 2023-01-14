<?php

namespace App\Drive\Auth\Google\Requests;

use App\Drive\Base\BaseRequest;

class GoogleAuthRequest extends BaseRequest
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
            'email' => ['required', 'email:rfc,dns'],
            'googleId' => ['required'],
            'imageUrl' => ['required']
        ];
    }
}
