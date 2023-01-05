<?php

namespace App\Drive\File;

use App\Drive\Folder\Folder;
use App\Drive\Log\Log;
use App\Drive\User\User;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class File extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'ower_id',
        'folder_id',
        'name',
        'access',
        'size',
        'file_path'
    ];

    protected $with = [
        'ownBy',
        'lastView'
    ];

    public function ownBy()
    {
        return $this->belongsTo(User::class, 'ower_id');
    }

    public function folder()
    {
        return $this->belongsTo(Folder::class);
    }

    public function lastView()
    {
        return $this->hasOne(Log::class, 'process_id')
                ->where('process_name', config('constant.process_names.file'))
                ->where('process_type', config('constant.process_types.view'))
                ->latestOfMany();
    }
}
