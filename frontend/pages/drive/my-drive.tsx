import { useItemFinishListener } from "@rpldy/uploady";
import { useSession } from "next-auth/react";
import { useDispatch } from "react-redux";
import ItemsContainer from "../../components/items/ItemsContainer";
import AppLayout from "../../components/layouts/AppLayout";
import { updateProgessById } from "../../features/downloadQueueSlice";
import useSWR from 'swr'
import { foldersApiEndPoint, getFolders } from "../../api/folders/foldersApi";
import { filesApiEndPoint, getFiles } from "../../api/files/filesApi";

function MyDrive() {
  const { data : session, status } : any = useSession();
  const dispatch = useDispatch();

  const { data : folderData, isLoading : folderLoading} = useSWR([foldersApiEndPoint, ''], () => getFolders(''))
  const { data : fileData, isLoading : fileLoading} = useSWR([filesApiEndPoint, ''], () => getFiles(''))

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
      <ItemsContainer folders={folderData?.data} files={fileData?.data} />
    </AppLayout>
  );
}

export default MyDrive;
