<?php

namespace App\Drive\Base;

use Exception;
use Illuminate\Http\JsonResponse;

class BaseJsonException extends Exception
{
    public function report()
    {
    }

    public function render()
    {
        return new JsonResponse([
            'errors' => [
                'message' => $this->getMessage()
            ]
        ], $this->code);
    }
}
