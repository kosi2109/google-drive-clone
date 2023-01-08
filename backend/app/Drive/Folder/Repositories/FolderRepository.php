<?php

namespace App\Drive\Folder\Repositories;

use App\Drive\File\Exceptions\FileNotFoundException;
use App\Drive\Folder\Folder;
use App\Drive\Folder\Repositories\Interfaces\FolderRepositoryInterface;
use App\Drive\Log\Repositories\LogRepository;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class FolderRepository implements FolderRepositoryInterface
{
    private $process_name;

    private $process_types;

    /**
     * FolderRepository constructor.
     *
     * @param Folder $model
     */
    public function __construct(private Folder $model, private LogRepository $logRepo)
    {
        $this->process_name = config('constant.process_names.folder');
        $this->process_types = config('constant.process_types');
    }

    /**
     * Log For All DB Transitions
     */
    private function makeLog(int $process_id, int $process_type)
    {
        $this->logRepo->createLog($this->process_name, $process_id, $process_type);
    }

    /**
     * Get Folders from not under any folder
     * 
     */
    public function getOuterFolders(): Collection
    {
        return $this->model->whereNull('parent_folder_id')->get();
    }

    /**
     * Get Folder by Id
     * 
     * @param int $id
     * 
     * @return Folder
     */
    public function findFolderById(int $id): Folder
    {
        try {
            $file = $this->model->findOrFail($id);

            $this->makeLog($file->id, $this->process_types['view']);

            return $file;
        } catch (ModelNotFoundException $th) {
            throw new FileNotFoundException('File Not Found', 404);
        }
    }

    /**
     * Create Folder
     * 
     * @param array $params
     * 
     * @return Folder
     */
    public function createFolder(array $params): Folder
    {
        $file = $this->model->create($params);

        $this->makeLog($file->id, $this->process_types['add']);

        return $file;
    }

    /**
     * Update Folder by Id
     * 
     * @param int $id
     * @param array $params
     * 
     * @return Folder
     */
    public function updateFolder(int $id, array $params): Folder
    {
        try {
            $file = $this->model->findOrFail($id);
    
            $file->update($params);
    
            $this->makeLog($file->id, $this->process_types['update']); 
    
            return $file->fresh();
        } catch (ModelNotFoundException $th) {
            throw new FileNotFoundException('File Not Found', 404);
        }
    }

    /**
     * Delete Folder by Id
     * 
     * @param int $id
     * 
     * @return bool
     */
    public function deleteFolder(int $id): bool
    {
        try {
            $file = $this->model->findOrFail($id);
    
            $this->makeLog($file->id, $this->process_types['delete']); 
    
            return $file->delete();
        } catch (ModelNotFoundException $th) {
            throw new FileNotFoundException('File Not Found', 404);
        }
    }
}