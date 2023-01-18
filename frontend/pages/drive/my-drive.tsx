import { ChangeEvent, useCallback } from "react";
import AppLayout from "../../components/layouts/AppLayout";
import Uploady, { useBatchFinishListener, useBatchProgressListener, useRequestPreSend, useUploady } from "@rpldy/uploady";
import UploadButton from "@rpldy/upload-button";
import ChunkedUploady from "@rpldy/chunked-uploady";

const chunkSize = 10 * 1024 * 1024;

function MyDrive() {

  return (
    <AppLayout>
      <ChunkedUploady
        method="POST"
        destination={{
          url: "http://localhost:8000/api/files/uploadLargeFiles",
          headers: { "x-custom": "123" },
        }}
        chunkSize={chunkSize}
        inputFieldName={"file"}
      >
        <MyComponent />
      </ChunkedUploady>
    </AppLayout>
  );
}

export default MyDrive;

const MyComponent = () => {
  useRequestPreSend(({items , options}) => {
    return {
      options : {
        params : {
          folder_name : 'new folder'
        }
      }
    }
  })

  return <UploadButton>
    Upload
  </UploadButton>
};
