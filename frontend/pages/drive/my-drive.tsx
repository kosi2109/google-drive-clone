import { useItemFinishListener } from "@rpldy/uploady";
import { useSession } from "next-auth/react";
import { useDispatch } from "react-redux";
import ItemsContainer from "../../components/items/ItemsContainer";
import AppLayout from "../../components/layouts/AppLayout";
import { updateProgessById } from "../../features/downloadQueueSlice";
import useSWR from 'swr'
import { getPageData } from "../../api/pages/pagesApi";

function MyDrive() {
  const { data : session, status } : any = useSession();
  const dispatch = useDispatch();
  const token = session?.token?.access_token;
  const page = 'my-drive';
  const { data , mutate, isLoading} = useSWR([page, token], ([page, token]) => getPageData(page, token))

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
    <AppLayout isLoading={isLoading}>
      <ItemsContainer title="Folder" files={data?.folders} />
      <ItemsContainer title="Files" files={data?.files} />
    </AppLayout>
  );
}

export default MyDrive;
