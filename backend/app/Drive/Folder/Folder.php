<?php

namespace App\Drive\Folder;

use App\Drive\File\File;
use App\Drive\Log\Log;
use App\Drive\User\User;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Concerns\HasUuids;

class Folder extends Model
{
    use HasFactory, SoftDeletes, HasUuids;

    protected $fillable = [
        'owner_id',
        'parent_folder_id',
        'name',
        'access',
        'folder_path'
    ];

    protected $with = [
        'ownBy',
        'lastView'
    ];

    public function ownBy()
    {
        return $this->belongsTo(User::class, 'owner_id');
    }

    public function files()
    {
        return $this->hasMany(File::class);
    }

    public function folders()
    {
        return $this->hasMany(Folder::class, 'parent_folder_id');
    }

    public function deletedParentFolder()
    {
        return $this->belongsTo(Folder::class, 'parent_folder_id', 'id')->onlyTrashed();
    }

    public function lastView()
    {
        return $this->hasOne(Log::class, 'process_id')
                ->where('process_name', config('constant.process_names.folder'))
                ->where('process_type', config('constant.process_types.view'))
                ->latestOfMany();
    }
}
