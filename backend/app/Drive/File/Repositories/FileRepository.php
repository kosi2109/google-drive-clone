<?php

namespace App\Drive\File\Repositories;

use App\Drive\File\Exceptions\FileCreateFailException;
use App\Drive\File\Exceptions\FileDeleteFailException;
use App\Drive\File\Exceptions\FileNotFoundException;
use App\Drive\File\Exceptions\FileUpdateFailException;
use App\Drive\File\File;
use App\Drive\File\Repositories\Interfaces\FileRepositoryInterface;
use App\Drive\Folder\Exceptions\FileRestoreFailException;
use App\Drive\Log\Repositories\LogRepository;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class FileRepository implements FileRepositoryInterface
{
    private $process_name;

    private $process_types;

    /**
     * UserRepository constructor.
     *
     * @param User $model
     */
    public function __construct(private File $model, private LogRepository $logRepo)
    {
        $this->process_name = config('constant.process_names.file');
        $this->process_types = config('constant.process_types');
    }

    /**
     * Log For All DB Transitions
     */
    private function makeLog(string $process_id, int $process_type)
    {
        $this->logRepo->createLog($this->process_name, $process_id, $process_type);
    }

    /**
     * Get Files from not under any folder
     * 
     */
    public function getOuterFiles(): Collection
    {
        return $this->model->where('owner_id', auth()->user()->id)
            ->whereNull('folder_id')
            ->get();
    }

    /**
     * Get Files from trash
     * 
     */
    public function getTrashedFiles(): Collection
    {
        return $this->model->onlyTrashed()
            ->where('owner_id', auth()->user()->id)
            ->whereDoesntHave('deletedParentFolder')
            ->get();
    }

    /**
     * Get File by Id
     * 
     * @param string $id
     * @param bool $is_make_log
     * 
     * @return File
     */
    public function findFileById(string $id, bool $is_make_log = true): File
    {
        return DB::transaction(function () use ($id, $is_make_log) {
            $file = $this->model->withTrashed()->find($id);

            throw_if(!$file, FileNotFoundException::class, 'File Not Found', 404);

            if ($is_make_log) {
                $this->makeLog($file->id, $this->process_types['view']);
            }

            return $file;
        });
    }

    /**
     * Create File
     * 
     * @param array $params
     * 
     * @return File
     */
    public function createFile(array $params): File
    {
        return DB::transaction(function () use ($params) {
            $file = $this->model->create($params);

            throw_if(!$file, FileCreateFailException::class, 'File Create Fail', 400);

            $this->makeLog($file->id, $this->process_types['add']);

            return $file;
        });
    }

    /**
     * Update File by Id
     * 
     * @param string $id
     * @param array $params
     * 
     * @return File
     */
    public function updateFile(string $id, array $params): File
    {
        return DB::transaction(function () use ($id, $params) {
            $file = $this->findFileById($id, false);

            throw_if(!$file->update($params), FileUpdateFailException::class, 'File Update Fail', 400);

            $this->makeLog($file->id, $this->process_types['update']);

            return $file->fresh();
        });
    }

    /**
     * Delete File by Id
     * 
     * @param string $id
     * 
     * @return bool
     */
    public function deleteFile(string $id): bool
    {
        return DB::transaction(function () use ($id) {
            $file = $this->findFileById($id, false);

            throw_if(!$file->delete(), FileDeleteFailException::class, 'File Delete Fail', 400);

            $this->makeLog($file->id, $this->process_types['delete']);

            return true;
        });
    }

    /**
     * Delete Files by Folder Id
     * 
     * @param string $folderId
     * 
     * @return bool
     */
    public function deleteFilesByFolderId(string $folderId): bool
    {
        throw_if(!$this->model->where('folder_id', $folderId)->delete(), FileDeleteFailException::class, 'Files Delete Fail', 400);

        return true;
    }

    /**
     * Delete Files by Folder Id
     * 
     * @param string $folderId
     * 
     * @return bool
     */
    public function deleteFilesPermenentByFolderId(string $folderId): bool
    {
        throw_if(!$this->model->onlyTrashed()->where('folder_id', $folderId)->forceDelete(), FileDeleteFailException::class, 'Files Delete Fail', 400);

        return true;
    }

    /**
     * Restore Files by Folder Id
     * 
     * @param string $folderId
     * 
     * @return bool
     */
    public function restoreFilesByFolderId(string $id): bool
    {
        throw_if(!$this->model->onlyTrashed()->where('folder_id', $id)->restore(), 
            FileRestoreFailException::class, 'File Restore Fail', 400);

        return true;
    }

    /**
     * Find File From Trash by Id
     * 
     * @param string $id
     * 
     * @return File
     */
    public function findFileFromTrashById(string $id) : File
    {
        $file = $this->model->onlyTrashed()->find($id);
        
        throw_if(!$file, FileNotFoundException::class, 'File Not Found', 404);

        return $file;
    }

    /**
     * Delete Perment by Id
     * 
     * @param string $folderId
     * 
     * @return bool
     */
    public function deleteFilesPermentById(string $id): bool
    {
        $file = $this->findFileFromTrashById($id);

        Storage::disk('public')->delete($file->file_path);

        throw_if(!$file->forceDelete(), FileDeleteFailException::class, 'Folder Delete Fail', 400);

        return true;
    }

    /**
     * Restore Files by Id
     * 
     * @param string $folderId
     * 
     * @return bool
     */
    public function restoreFilesById(string $id): bool
    {
        $file = $this->findFileFromTrashById($id);

        throw_if(!$file->restore(), FileRestoreFailException::class, 'File Restore Fail', 400);

        return true;
    }
}
