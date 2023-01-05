<?php

namespace App\Drive\File\Repositories\Interfaces;

use App\Drive\Folder\Folder;
use Illuminate\Database\Eloquent\Collection;

interface FolderRepositoryInterface
{
    public function getOuterFolders() : Collection;
    public function findFolderById(int $id) : Folder;
    public function createFolder(array $params) : Folder;
    public function updateFolder(int $id,array $params) : Folder;
    public function deleteFolder(int $id) : bool;
}