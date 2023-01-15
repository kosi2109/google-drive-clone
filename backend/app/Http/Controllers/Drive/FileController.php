<?php

namespace App\Http\Controllers\Drive;

use App\Drive\File\Repositories\Interfaces\FileRepositoryInterface;
use App\Drive\File\Requests\CreateFileRequest;
use App\Drive\File\Resources\FileOverviewResource;
use App\Drive\File\Resources\FileResource;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Log\Logger;
use Pion\Laravel\ChunkUpload\Handler\HandlerFactory;
use Pion\Laravel\ChunkUpload\Receiver\FileReceiver;

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

    public function upload(
        Request $request
    )
    {

        $receiver = new FileReceiver('file', $request, HandlerFactory::classFromRequest($request));
    
        if (!$receiver->isUploaded()) {
            // file not uploaded
        }
    
        $fileReceived = $receiver->receive(); // receive file
        if ($fileReceived->isFinished()) { // file uploading is complete / all chunks are uploaded
            $file = $fileReceived->getFile(); // get file
            $extension = $file->getClientOriginalExtension();
            // Logger($request->all());
            $fileName = $request->resumableFilename;
            // $fileName = str_replace('.'.$extension, '', $file->getClientOriginalName()); //file name without extenstion
            // $fileName .= '_' . md5(time()) . '.' . $extension; // a unique file name
            
            $move_path = "public\\movies\\";
            
            $file->storeAs($move_path, $fileName);
            // Storage::disk('local')->put($move_path, $file);
    
            // delete chunked file
            unlink($file->getPathname());
            return [
                'extention' => $extension,
                'path' => asset('storage/movies/' . $fileName),
                'filename' => $fileName
            ];
        }
    
        // otherwise return percentage information
        $handler = $fileReceived->handler();
        return [
            'done' => $handler->getPercentageDone(),
            'status' => true
        ];
    }
}
