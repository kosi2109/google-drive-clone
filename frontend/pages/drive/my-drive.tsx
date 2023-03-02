import { useItemFinishListener } from "@rpldy/uploady";
import { useSession } from "next-auth/react";
import { useDispatch } from "react-redux";
import ItemsContainer from "../../components/items/ItemsContainer";
import AppLayout from "../../components/layouts/AppLayout";
import { updateProgessById } from "../../features/downloadQueueSlice";
import useSWR from 'swr'
import { foldersApiEndPoint, getFolders } from "../../api/folders/foldersApi";
import { filesApiEndPoint, getFiles } from "../../api/files/filesApi";
import FolderContainer from "../../components/folder/folderContainer";
import FileContainer from "../../components/file/FileContainer";

function MyDrive() {
  const { data : session, status } : any = useSession();
  const dispatch = useDispatch();
  const token = session?.token?.access_token;
  const page = 'my-drive';
  const { data : folderData, isLoading : folderLoading} = useSWR(foldersApiEndPoint, getFolders)
  const { data : fileData, isLoading : fileLoading} = useSWR(filesApiEndPoint, getFiles)

  useItemFinishListener(async (item) => {    
    dispatch(
      updateProgessById({
        id: item.id,
        name: item.file.name,
        completed: item.completed,
        state: item.state,
      })
    );
  });
  
  return (
    <AppLayout breadcrumb={["My Drive"]} isLoading={folderLoading || fileLoading}>
      <FolderContainer folders={folderData?.data} />
      <FileContainer files={fileData?.data} />
    </AppLayout>
  );
}

export default MyDrive;
