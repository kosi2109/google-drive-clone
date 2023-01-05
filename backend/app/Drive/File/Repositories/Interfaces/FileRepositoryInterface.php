<?php

namespace App\Drive\File\Repositories\Interfaces;

use App\Drive\File\File;
use Illuminate\Database\Eloquent\Collection;

interface FileRepositoryInterface
{
    public function getOuterFiles() : Collection;
    public function findFileById(int $id) : File;
    public function createFile(array $params) : File;
    public function updateFile(int $id,array $params) : File;
    public function deleteFile(int $id) : bool;
}