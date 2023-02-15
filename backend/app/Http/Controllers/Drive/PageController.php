<?php

namespace App\Http\Controllers\Drive;

use App\Drive\File\Repositories\Interfaces\FileRepositoryInterface;
use App\Drive\File\Resources\FileOverviewResource;
use App\Drive\Folder\Repositories\Interfaces\FolderRepositoryInterface;
use App\Drive\Folder\Resources\FolderOveviewResource;
use App\Http\Controllers\Controller;
use Exception;

class PageController extends Controller
{
    /**
     * FileController constructor.
     * @param FileRepositoryInterface $fileRepository
     */
    public function __construct(
        private FileRepositoryInterface $fileRepository,
        private FolderRepositoryInterface $folderRepository,
    )
    {
    }
    
    public function index(
        $page
    )
    {
        if ($page == 'my-drive') {
            return $this->myDrivePage();
        }
    }

    public function myDrivePage()
    {
        return [
            'files' => FileOverviewResource::collection($this->fileRepository->getOuterFiles()),
            'folders' => FolderOveviewResource::collection($this->folderRepository->getOuterFolders()),
        ];
    }

    public function folder(
        $id
    )
    {
        $folder = $this->folderRepository->findFolderById($id);

        return [
            'files' => FileOverviewResource::collection($folder->files),
            'folders' => FolderOveviewResource::collection($folder->folders),
        ];
    }
}
