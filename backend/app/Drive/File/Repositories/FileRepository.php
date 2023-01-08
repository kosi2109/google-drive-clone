<?php

namespace App\Drive\File\Repositories;

use App\Drive\File\Exceptions\FileNotFoundException;
use App\Drive\File\File;
use App\Drive\File\Repositories\Interfaces\FileRepositoryInterface;
use App\Drive\Log\Repositories\LogRepository;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\ModelNotFoundException;

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
        return $this->model->whereNull('folder_id')->get();
    }

    /**
     * Get File by Id
     * 
     * @param int $id
     * 
     * @return File
     */
    public function findFileById(int $id): File
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
     * Create File
     * 
     * @param array $params
     * 
     * @return File
     */
    public function createFile(array $params): File
    {
        $file = $this->model->create($params);

        $this->makeLog($file->id, $this->process_types['add']);

        return $file;
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
        try {
            $file = $file = $this->model->findOrFail($id);;
    
            $file->update($params);
    
            $this->makeLog($file->id, $this->process_types['update']); 
    
            return $file->fresh();
        } catch (ModelNotFoundException $th) {
            throw new FileNotFoundException('File Not Found', 404);
        }
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
        try {
            $file = $file = $this->model->findOrFail($id);
    
            $this->makeLog($file->id, $this->process_types['delete']); 
    
            return $file->delete();
        } catch (ModelNotFoundException $th) {
            throw new FileNotFoundException('File Not Found', 404);
        }
    }
}