<?php

namespace App\Drive\Folder\Repositories;

use App\Drive\Folder\Exceptions\FolderCreateFailException;
use App\Drive\Folder\Exceptions\FolderDeleteFailException;
use App\Drive\Folder\Exceptions\FolderNotFoundException;
use App\Drive\Folder\Exceptions\FolderRestoreFailException;
use App\Drive\Folder\Exceptions\FolderUpdateFailException;
use App\Drive\Folder\Folder;
use App\Drive\Folder\Repositories\Interfaces\FolderRepositoryInterface;
use App\Drive\Log\Repositories\LogRepository;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\DB;

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
    private function makeLog(string $process_id, int $process_type)
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
     * Get Folders from trash
     * 
     */
    public function getTrashedFolders(): Collection
    {
        return $this->model->onlyTrashed()->whereNull('parent_folder_id')->get();
    }

    /**
     * Get Folder by Id
     * 
     * @param string $id
     * @param bool $is_make_log
     * @param bool $deleted
     * 
     * @return Folder
     */
    public function findFolderById(string $id, bool $is_make_log = true, bool $deleted = false): Folder
    {
        return DB::transaction(function () use($id, $is_make_log, $deleted) {
            if ($deleted) {
                $file = $this->model->withTrashed()->find($id);

            } else {
                $file = $this->model->find($id);

            }
            
            throw_if(!$file, FolderNotFoundException::class, 'Folder Not Found', 404);

            if ($is_make_log && !$deleted) {
                $this->makeLog($file->id, $this->process_types['view']);
            }
    
            return $file;
        });
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
        return DB::transaction(function () use($params) {
            $file = $this->model->create($params);
            
            throw_if(!$file, FolderCreateFailException::class, 'Folder Create Fail', 400);

            $this->makeLog($file->id, $this->process_types['add']);
    
            return $file;
        });
    }

    /**
     * Update Folder by Id
     * 
     * @param string $id
     * @param array $params
     * 
     * @return Folder
     */
    public function updateFolder(string $id, array $params): Folder
    {
        return DB::transaction(function () use($id, $params) {
            $file = $this->findFolderById($id, false);
    
            throw_if(!$file->update($params), FolderUpdateFailException::class, 'Folder Update Fail', 400);
    
            $this->makeLog($file->id, $this->process_types['update']); 
    
            return $file->fresh();
        });
    }

    /**
     * Delete Folder by Id
     * 
     * @param string $id
     * 
     * @return bool
     */
    public function deleteFolder(string $id): bool
    {
        return DB::transaction(function () use($id) {
            $folder = $this->findFolderById($id, false);  
            
            throw_if(!$folder->delete() , FolderDeleteFailException::class, 'Folder Delete Fail', 400);
            
            $this->makeLog($folder->id, $this->process_types['delete']); 
            
            return true;
        });
    }

    /**
     * Delete Permenent Folder by Id
     * 
     * @param string $id
     * 
     * @return bool
     */
    public function deletePermenentFolder(string $id): bool
    {
        return DB::transaction(function () use($id) {
            $folder = $this->model->withTrashed()->find($id);  

            throw_if(!$folder, FolderNotFoundException::class, 'Folder Not Found', 404);
             
            throw_if(!$folder->forceDelete(), FolderDeleteFailException::class, 'Folder Delete Fail', 400);
            
            $this->makeLog($folder->id, $this->process_types['delete_permanent']); 
            
            return true;
        });
    }

    /**
     * Restore Permenent Folder by Id
     * 
     * @param string $id
     * 
     * @return bool
     */
    public function restoreFolder(string $id): bool
    {
        return DB::transaction(function () use($id) {
            $folder = $this->model->withTrashed()->find($id);  

            throw_if(!$folder, FolderNotFoundException::class, 'Folder Not Found', 404);
             
            throw_if(!$folder->restore(), FolderRestoreFailException::class, 'Folder Restore Fail', 400);
                        
            return true;
        });
    }
}