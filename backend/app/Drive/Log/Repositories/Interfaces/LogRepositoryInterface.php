<?php

namespace App\Drive\Log\Repositories\Interfaces;

use App\Drive\Log\Log;

interface LogRepositoryInterface
{
    public function createLog(string $process_name, string $process_id, int $process_type) : Log;
}