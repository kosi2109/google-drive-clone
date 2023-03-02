<?php

namespace App\Drive\Log\Repositories;

use App\Drive\Log\Log;
use App\Drive\Log\Repositories\Interfaces\LogRepositoryInterface;

class LogRepository implements LogRepositoryInterface
{
    /**
     * LogRepository constructor.
     *
     * @param Log $model
     */
    public function __construct(private Log $model)
    {
        //
    }

    /**
     * @param string $process_name
     * 
     * @param int $process_id
     * 
     * @param int $process_type
     * 
     * @return Log
     */
    public function createLog(string $process_name, string $process_id, int $process_type) : Log
    {
        return $this->model->create([
            'process_name' => $process_name,
            'process_id' => $process_id,
            'process_type' => $process_type,
            'process_by' => auth()->user()->id
        ]);
    }

}