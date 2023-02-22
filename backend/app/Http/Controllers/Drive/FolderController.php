<?php

namespace App\Http\Controllers\Drive;

use App\Drive\Folder\Repositories\Interfaces\FolderRepositoryInterface;
use App\Drive\Folder\Requests\CreateFolderRequest;
use App\Drive\Folder\Resources\FolderOveviewResource;
use App\Drive\Folder\Resources\FolderResource;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class FolderController extends Controller
{
     /**
     * @var Folder
     */
    private $folderRepo;

    /**
     * FolderController constructor.
     * @param FolderRepositoryInterface $folderRepository
     */
    public function __construct(FolderRepositoryInterface $folderRepository)
    {
        $this->folderRepo = $folderRepository;
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
        $this->folderRepo->deleteFolder($id);

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
}
