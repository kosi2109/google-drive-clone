<?php

namespace App\Http\Controllers\Drive;

use App\Drive\File\Repositories\Interfaces\FileRepositoryInterface;
use App\Drive\File\Requests\CreateFileRequest;
use App\Drive\File\Resources\FileOverviewResource;
use App\Drive\File\Resources\FileResource;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class FileController extends Controller
{
    /**
     * @var File
     */
    private $fileRepo;

    /**
     * FileController constructor.
     * @param FileRepositoryInterface $fileRepository
     */
    public function __construct(FileRepositoryInterface $fileRepository)
    {
        $this->fileRepo = $fileRepository;
    }

    /**
     * FileController : File List
     * 
     * @return Collection
     */
    public function index()
    {
        return FileOverviewResource::collection($this->fileRepo->getOuterFiles());
    }

    /**
     * FileController : File Create
     * 
     * @param CreateFileRequest $request
     * 
     * @return FileResource
     */
    public function create(
        CreateFileRequest $request
    )
    {
        return new FileResource($this->fileRepo->createFile($request->all()));
    }
    
    /**
     * UserController : File Update
     * 
     * @param int $id
     * 
     * @param Request $request
     * 
     * @return FileResource
     */
    public function update(
        Request $request,
        int $id
    )
    {
        return new FileResource($this->fileRepo->updateFile($id, $request->all()));
    }
    
    /**
     * FileController : File Delete
     * 
     * @param int $id
     * 
     * @return FileResource
     */
    public function destroy(
        int $id
    )
    {
        $this->fileRepo->deleteFile($id);
        
        return response('File was successfully deleted', 201);
    }

    /**
     * FileController : File Detail
     * 
     * @param int $id
     * 
     * @return FileResource
     */
    public function show(
        int $id
    )
    {
        return new FileResource($this->fileRepo->findFileById($id));
    }
}
