<?php

namespace App\Drive\Log\Resources;

use App\Drive\Base\BaseResource;
use App\Drive\User\Resources\UserResource;

class LogResource extends BaseResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'created_at' => $this->created_at,
            'process_by' => new UserResource($this->processBy)
        ];
    }
}