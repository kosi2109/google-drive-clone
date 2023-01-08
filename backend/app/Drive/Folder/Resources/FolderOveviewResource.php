<?php

namespace App\Drive\Folder\Resources;

use App\Drive\Base\BaseResource;
use App\Drive\Log\Resources\LogResource;
use App\Drive\User\Resources\UserResource;

class FolderOveviewResource extends BaseResource
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
            'name' => $this->name,
            'lastView' => new LogResource($this->lastView),
            'ownBy' => new UserResource($this->ownBy),
            'created_at' => $this->created_at
        ];
    }
}