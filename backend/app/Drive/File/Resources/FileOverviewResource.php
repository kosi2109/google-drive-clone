<?php

namespace App\Drive\File\Resources;

use App\Drive\Base\BaseResource;
use App\Drive\Log\Resources\LogResource;
use App\Drive\User\Resources\UserResource;

class FileOverviewResource extends BaseResource
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
            'access' => $this->access,
            'size' => $this->size,
            'file_path' => $this->file_path,
            'mime_type' => $this->mime_type,
            'ownBy' => new UserResource($this->ownBy),
            'lastModify' => new LogResource($this->lastModify),
            'lastView' => new LogResource($this->lastView),
            'created' => $this->created_at,
            'deleted_at' => $this->deleted_at
        ];
    }
}