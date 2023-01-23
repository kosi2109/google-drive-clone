import { useItemFinishListener } from "@rpldy/uploady";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getFiles } from "../../api/backendApi";
import ItemsContainer from "../../components/items/ItemsContainer";
import AppLayout from "../../components/layouts/AppLayout";
import { updateProgessById } from "../../features/downloadQueueSlice";
import { ItemType } from "../../types/data/itemTypes";

function MyDrive() {
  const { data, status } = useSession();
  const [files, setFiles] = useState<ItemType[]>([]);
  const dispatch = useDispatch();

  const fetchFiles = () => {
    getFiles(data?.token?.access_token)
      .then((res) => setFiles(res.data))
      .catch((res) => console.log(res));
  };

  useEffect(() => {
    if (status !== "loading") {
      fetchFiles();
    }
  }, [status]);

  useItemFinishListener((item) => {
    dispatch(
      updateProgessById({
        id: item.id,
        name: item.file.name,
        completed: item.completed,
        state: item.state,
      })
    );
    fetchFiles();
  });

  return (
    <AppLayout>
      <ItemsContainer title="Test" files={files} />
    </AppLayout>
  );
}

export default MyDrive;
