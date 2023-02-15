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
    public function index()
    {
        return FolderOveviewResource::collection($this->folderRepo->getOuterFolders());
    }

    /**
     * FolderController : Folder Create
     * 
     * @param CreateFolderRequest $request
     * 
     * @return FolderResource
     */
    public function create(
        CreateFolderRequest $request
    )
    {
        $params = $request->all();

        $params['owner_id'] = auth()->user()->id;

        return new FolderResource($this->folderRepo->createFolder($params));
    }
    
    /**
     * FolderController : Folder Update
     * 
     * @param Request $request
     * @param int $id
     * 
     * @return FolderResource
     */
    public function update(
        Request $request,
        int $id
    )
    {
        return new FolderResource($this->folderRepo->updateFolder($id, $request->all()));
    }
    
    /**
     * FolderController : Folder Delete
     * 
     * @param int $id
     * 
     * @return bool
     */
    public function destroy(
        int $id
    )
    {
        $this->folderRepo->deleteFolder($id);

        return response('Folder was successfully deleted.');
    }

    /**
     * FolderController : Folder Detail
     * 
     * @param int $id
     * 
     * @return FolderResource
     */
    public function show(
        int $id
    )
    {
        return new FolderResource($this->folderRepo->findFolderById($id));
    }
}
