<?php

namespace App\Drive\File;

use App\Drive\Folder\Folder;
use App\Drive\Log\Log;
use App\Drive\User\User;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Concerns\HasUuids;

class File extends Model
{
    use HasFactory, SoftDeletes, HasUuids;

    protected $fillable = [
        'owner_id',
        'folder_id',
        'name',
        'access',
        'size',
        'file_path',
        'mime_type'
    ];

    protected $with = [
        'ownBy',
        'lastView'
    ];

    public function ownBy()
    {
        return $this->belongsTo(User::class, 'owner_id');
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

    public function lastModify()
    {
        return $this->hasOne(Log::class, 'process_id')
                ->where('process_name', config('constant.process_names.file'))
                ->where('process_type', config('constant.process_types.update'))
                ->latestOfMany();
    }

    public function deletedParentFolder()
    {
        return $this->belongsTo(Folder::class, 'folder_id', 'id')->onlyTrashed();
    }
}
