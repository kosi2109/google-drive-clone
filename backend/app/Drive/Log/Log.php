<?php

namespace App\Drive\Log;

use App\Drive\User\User;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Log extends Model
{
    use HasFactory;

    protected $fillable = [
        "process_name",
        "process_id",
        "process_type",
        "process_by"
    ];

    protected $with = [
        'processBy'
    ];

    public function processBy()
    {
        return $this->belongsTo(User::class, 'process_by');
    }

}
