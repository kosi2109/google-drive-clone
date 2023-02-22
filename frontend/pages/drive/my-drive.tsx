import { useItemFinishListener } from "@rpldy/uploady";
import { useSession } from "next-auth/react";
import { useDispatch } from "react-redux";
import ItemsContainer from "../../components/items/ItemsContainer";
import AppLayout from "../../components/layouts/AppLayout";
import { updateProgessById } from "../../features/downloadQueueSlice";
import useSWR from 'swr'
import { foldersApiEndPoint, getFolders } from "../../api/folders/foldersApi";

function MyDrive() {
  const { data : session, status } : any = useSession();
  const dispatch = useDispatch();
  const token = session?.token?.access_token;
  const page = 'my-drive';
  const { data : folderData, isLoading : folderLoading} = useSWR(foldersApiEndPoint, getFolders)

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
    <AppLayout isLoading={folderLoading}>
      <ItemsContainer title="Folder" files={folderData?.data} />
      {/* <ItemsContainer title="Files" files={data?.files} /> */}
    </AppLayout>
  );
}

export default MyDrive;
