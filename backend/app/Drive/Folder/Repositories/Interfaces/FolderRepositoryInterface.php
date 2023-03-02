<?php

namespace App\Drive\Folder\Repositories\Interfaces;

use App\Drive\Folder\Folder;
use Illuminate\Database\Eloquent\Collection;

interface FolderRepositoryInterface
{
    public function getOuterFolders() : Collection;
    public function getTrashedFolders() : Collection;
    public function findFolderById(string $id, bool $is_make_log = true, bool $deleted = false) : Folder;
    public function createFolder(array $params) : Folder;
    public function updateFolder(string $id,array $params) : Folder;
    public function deleteFolder(string $id) : bool;
    public function deletePermenentFolder(string $id) : bool;
    public function restoreFolder(string $id) : bool;
}