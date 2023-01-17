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
        Logger($request);
        //Turn Off The Throttle API
        //from web route
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
        $user_obj = User::find('1'); //auth()->user();
        $fileName = $this->createFilename($file);

        $folder  = $request->folder_name ?  "/$request->folder_name/" : '/' ;
        $filePath = "public/upload/users/{$user_obj->id}/my-drive{$folder}";
        $finalPath = storage_path("app/" . $filePath);

        $fileSize = $file->getSize();
        // move the file name
        $file->move($finalPath, $fileName);

        $url_base = env('APP_URL') . '/storage/upload/users/' . $user_obj->id . "/my-drive{$folder}" . $fileName;

        return new FileResource($this->fileRepo->createFile([
            'ower_id' => 1, //user id,
            'name' => $file->getClientOriginalName(),
            'size' => $fileSize,
            'file_path' => $url_base
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
        $filename = str_replace("." . $extension, "", $file->getClientOriginalName()); // Filename without extension

        //delete timestamp from file name
        $temp_arr = explode('_', $filename);
        if (isset($temp_arr[0])) unset($temp_arr[0]);
        $filename = implode('_', $temp_arr);

        //here you can manipulate with file name e.g. HASHED
        return $filename . "." . $extension;
    }
}
