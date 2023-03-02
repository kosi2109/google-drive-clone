<?php

namespace App\Http\Controllers\Drive;

use App\Drive\File\Repositories\Interfaces\FileRepositoryInterface;
use App\Drive\Folder\Repositories\Interfaces\FolderRepositoryInterface;
use App\Drive\Folder\Requests\CreateFolderRequest;
use App\Drive\Folder\Resources\FolderOveviewResource;
use App\Drive\Folder\Resources\FolderResource;
use App\Http\Controllers\Controller;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class FolderController extends Controller
{
     /**
     * @var Folder
     */
    private $folderRepo;

     /**
     * @var Folder
     */
    private $fileRepo;

    /**
     * FolderController constructor.
     * @param FolderRepositoryInterface $folderRepository
     * @param FileRepositoryInterface $fileRepository
     */
    public function __construct(
        FolderRepositoryInterface $folderRepository,
        FileRepositoryInterface $fileRepository
    )
    {
        $this->folderRepo = $folderRepository;
        $this->fileRepo = $fileRepository;
    }

    /**
     * FolderController : Folder Outer List
     * 
     * @return Collection
     */
    public function index(
        Request $request
    )
    {
        $params = $request->all();

        if (isset($params['trashed']) && $params['trashed'] == true) {
            $folders = $this->folderRepo->getTrashedFolders();
        } else {
            $folders = $this->folderRepo->getOuterFolders();
        }
        
        return FolderOveviewResource::collection($folders);
    }

    /**
     * FolderController : Folder Create
     * 
     * @param CreateFolderRequest $request
     * 
     * @return FolderOveviewResource
     */
    public function create(
        CreateFolderRequest $request
    )
    {
        $params = $request->all();

        $params['owner_id'] = auth()->user()->id;

        return new FolderOveviewResource($this->folderRepo->createFolder($params));
    }
    
    /**
     * FolderController : Folder Update
     * 
     * @param Request $request
     * @param string $id
     * 
     * @return FolderOveviewResource
     */
    public function update(
        Request $request,
        string $id
    )
    {
        return new FolderOveviewResource($this->folderRepo->updateFolder($id, $request->all()));
    }
    
    /**
     * FolderController : Folder Delete
     * 
     * @param string $id
     * 
     * @return bool
     */
    public function destroy(
        string $id
    )
    {
        DB::transaction(function() use($id) {
            
            $folder = $this->folderRepo->findFolderById($id, false);
    
            $this->deleteRecursively($folder->folders);
            
            $this->fileRepo->deleteFilesByFolderId($folder->id);
    
            $this->folderRepo->deleteFolder($folder->id);

            return true;
        });

        return response('Folder was successfully deleted.');
    }
    
    /**
     * Delete Folder Recursively
     * 
     * @param Collection $folders
     * @param bool $permanent
     * 
     * @return void
     */
    public function deleteRecursively($folders, $permanent = false)
    {
        // throw new Exception(json_encode($folders));
        foreach ($folders as $folder) {
            if ($permanent) {
                $this->deleteRecursively($folder->folders()->withTrashed()->get(), $permanent); // Recursively delete child's children
                $this->fileRepo->deleteFilesPermenentByFolderId($folder->id); //delete files under folder permantely
                $this->folderRepo->deletePermenentFolder($folder->id); //delete itself permantely
                
            } else {
                $this->deleteRecursively($folder->folders, $permanent); // Recursively delete child's children
                $this->fileRepo->deleteFilesByFolderId($folder->id); //delete files under folder to trash
                $this->folderRepo->deleteFolder($folder->id); //delete itself to trash

            }
        }
    }

    /**
     * FolderController : Folder Delete
     * 
     * @param string $id
     * 
     * @return bool
     */
    public function destroyPermanent(
        string $id
    )
    {
        DB::transaction(function() use($id) {
            
            $folder = $this->folderRepo->findFolderById($id, false, true);

            $this->deleteRecursively($folder->folders()->withTrashed()->get(), true);
            
            $this->fileRepo->deleteFilesPermenentByFolderId($folder->id);
    
            $this->folderRepo->deletePermenentFolder($folder->id);

            return true;
        });

        return response('Folder was successfully deleted.');
    }

    /**
     * FolderController : Folder Detail
     * 
     * @param string $id
     * 
     * @return FolderResource
     */
    public function show(
        string $id
    )
    {
        return new FolderResource($this->folderRepo->findFolderById($id));
    }

    /**
     * FolderController : Restore Folder From Trash
     * 
     * @param string $id
     * 
     * @return FolderResource
     */
    public function restore(
        string $id
    )
    {
        DB::transaction(function() use($id) {
            
            $folder = $this->folderRepo->findFolderById($id, false, true);

            $this->restoreFolderRecursively($folder->folders()->withTrashed()->get());
            
            $this->fileRepo->restoreFilesByFolderId($folder->id);
    
            $this->folderRepo->restoreFolder($folder->id);

            return true;
        });

        return response('Folder was successfully restored.');
    }

    /**
     * Delete Folder Recursively
     * 
     * @param Collection $folders
     * @param bool $permanent
     * 
     * @return void
     */
    public function restoreFolderRecursively($folders)
    {
        // throw new Exception(json_encode($folders));
        foreach ($folders as $folder) {
            $this->restoreFolderRecursively($folder->folders()->withTrashed()->get()); // Recursively delete child's children
            $this->fileRepo->restoreFilesByFolderId($folder->id); //delete files under folder permantely
            $this->folderRepo->restoreFolder($folder->id); //delete itself permantely
        }
    }
}
