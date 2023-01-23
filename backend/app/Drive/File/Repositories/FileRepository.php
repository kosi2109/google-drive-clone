<?php

namespace App\Drive\File\Repositories;

use App\Drive\File\Exceptions\FileCreateFailException;
use App\Drive\File\Exceptions\FileDeleteFailException;
use App\Drive\File\Exceptions\FileNotFoundException;
use App\Drive\File\Exceptions\FileUpdateFailException;
use App\Drive\File\File;
use App\Drive\File\Repositories\Interfaces\FileRepositoryInterface;
use App\Drive\Log\Repositories\LogRepository;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\DB;

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
    private function makeLog(int $process_id, int $process_type)
    {
        $this->logRepo->createLog($this->process_name, $process_id, $process_type);
    }

    /**
     * Get Files from not under any folder
     * 
     */
    public function getOuterFiles(): Collection
    {
        return $this->model->where('owner_id', auth()->user()->id)->whereNull('folder_id')->get();
    }

    /**
     * Get File by Id
     * 
     * @param int $id
     * @param bool $is_make_log
     * 
     * @return File
     */
    public function findFileById(int $id, bool $is_make_log = true): File
    {
        return DB::transaction(function() use($id, $is_make_log) {
            $file = $this->model->find($id);
            
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
        return DB::transaction(function() use($params) {
            $file = $this->model->create($params);
            
            throw_if(!$file, FileCreateFailException::class, 'File Create Fail', 400);

            $this->makeLog($file->id, $this->process_types['add']);
    
            return $file;
        });
    }

    /**
     * Update File by Id
     * 
     * @param int $id
     * @param array $params
     * 
     * @return File
     */
    public function updateFile(int $id, array $params): File
    {
        return DB::transaction(function () use($id, $params) {
            $file = $this->findFileById($id, false);
            
            throw_if(!$file->update($params), FileUpdateFailException::class, 'File Update Fail', 400);
    
            $this->makeLog($file->id, $this->process_types['update']); 
    
            return $file->fresh();  
        });
    }

    /**
     * Delete File by Id
     * 
     * @param int $id
     * 
     * @return bool
     */
    public function deleteFile(int $id): bool
    {
        return DB::transaction(function () use($id) {
            $file = $this->findFileById($id, false);
            
            throw_if(!$file->delete(), FileDeleteFailException::class, 'File Delete Fail', 400);

            $this->makeLog($file->id, $this->process_types['delete']); 
    
            return true;
        });
    }
}