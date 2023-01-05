<?php

namespace App\Drive\Folder;

use App\Drive\File\File;
use App\Drive\Log\Log;
use App\Drive\User\User;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Folder extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'ower_id',
        'parent_folder_id',
        'name',
        'access'
    ];

    protected $with = [
        'ownBy',
        'lastView'
    ];

    public function ownBy()
    {
        return $this->belongsTo(User::class, 'ower_id');
    }

    public function files()
    {
        return $this->hasMany(File::class);
    }

    public function folders()
    {
        return $this->hasMany(self::class, 'parent_folder_id');
    }

    public function lastView()
    {
        return $this->hasOne(Log::class, 'process_id')
                ->where('process_name', config('constant.process_names.folder'))
                ->where('process_type', config('constant.process_types.view'))
                ->latestOfMany();
    }
}
