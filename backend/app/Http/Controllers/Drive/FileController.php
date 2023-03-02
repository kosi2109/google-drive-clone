<?php

namespace App\Http\Controllers\Drive;

use App\Drive\File\Repositories\Interfaces\FileRepositoryInterface;
use App\Drive\File\Requests\CreateFileRequest;
use App\Drive\File\Resources\FileOverviewResource;
use App\Drive\File\Resources\FileResource;
use App\Drive\User\User;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\UploadedFile;
use Illuminate\Log\Logger;
use Illuminate\Support\Facades\Storage;
use Pion\Laravel\ChunkUpload\Exceptions\UploadMissingFileException;
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
    ) {

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
    ) {
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
    ) {
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
    ) {
        return new FileResource($this->fileRepo->findFileById($id));
    }

    /**
     * Handles the file upload
     *
     * @param Request $request
     *
     * @return JsonResponse
     *
     * @throws UploadMissingFileException
     * @throws UploadFailedException
     */
    public function uploadFile(Request $request)
    {
        // create the file receiver
        $receiver = new FileReceiver("file", $request, HandlerFactory::classFromRequest($request));

        // check if the upload is success, throw exception or return response you need
        if ($receiver->isUploaded() === false) {
            throw new UploadMissingFileException();
        }

        // receive the file
        $save = $receiver->receive();

        // check if the upload has finished (in chunk mode it will send smaller files)
        if ($save->isFinished()) {
            // save the file and return any response you need, current example uses `move` function. If you are
            // not using move, you need to manually delete the file by unlink($save->getFile()->getPathname())
            return $this->saveFile($save->getFile(), $request);
        }

        // we are in chunk mode, lets send the current progress
        /** @var AbstractHandler $handler */
        $handler = $save->handler();

        return response()->json([
            "done" => $handler->getPercentageDone(),
            'status' => true
        ]);
    }

    /**
     * Saves the file
     *
     * @param UploadedFile $file
     *
     * @return JsonResponse
     */
    protected function saveFile(UploadedFile $file, Request $request)
    {
        $user_obj = auth()->user();
        $fileName = $this->createFilename($file);
        $folder  = $request->folder_name ?  "/$request->folder_name/" : '/';
        $filePath = "/upload/users/{$user_obj->id}/my drive{$folder}";
        $finalPath = storage_path("app/public" . $filePath);

        $fileSize = $file->getSize();
        // move the file name
        $file->move($finalPath, $fileName);

        return new FileOverviewResource($this->fileRepo->createFile([
            'owner_id' => $user_obj->id,
            'name' => $file->getClientOriginalName(),
            'size' => $fileSize,
            'file_path' => $filePath . $fileName ,
            'mime_type' => $file->getClientMimeType(),
            'folder_id' => $request->folder_id
        ]));
    }

    /**
     * Create unique filename for uploaded file
     * @param UploadedFile $file
     * @return string
     */
    protected function createFilename(UploadedFile $file)
    {
        $extension = $file->getClientOriginalExtension();
        $filename = rand(1, 9) . time() . 'drive';

        return $filename . "." . $extension;
    }

    public function getFile(
        $id
    )
    {
        $file = $this->fileRepo->findFileById($id, false);

        return response()->file(Storage::disk('public')->path($file->file_path));
    }
}
