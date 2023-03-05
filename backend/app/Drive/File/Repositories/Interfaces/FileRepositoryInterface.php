<?php

namespace App\Drive\File\Repositories\Interfaces;

use App\Drive\File\File;
use Illuminate\Database\Eloquent\Collection;

interface FileRepositoryInterface
{
    public function getOuterFiles() : Collection;
    public function findFileById(string $id, bool $is_make_log) : File;
    public function createFile(array $params) : File;
    public function updateFile(string $id,array $params) : File;
    public function deleteFile(string $id) : bool;
    public function deleteFilesByFolderId(string $folderId) : bool;
    public function restoreFilesByFolderId(string $folderId) : bool;
    public function deleteFilesPermentById(string $id) : bool;
    public function restoreFilesById(string $id) : bool;
}