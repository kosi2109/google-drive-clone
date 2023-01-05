<?php

namespace App\Drive\Log\Repositories\Interfaces;

use App\Drive\Log\Log;

interface LogRepositoryInterface
{
    public function createLog(string $process_name, int $process_id, int $process_type) : Log;
}