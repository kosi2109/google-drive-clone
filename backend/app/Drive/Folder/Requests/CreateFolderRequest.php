<?php

namespace App\Drive\Folder\Requests;

use App\Drive\Base\BaseRequest;

class CreateFolderRequest extends BaseRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'name' => 'required'
        ];
    }
}
