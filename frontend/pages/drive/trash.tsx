import React from "react";
import AppLayout from "../../components/layouts/AppLayout";
import useSWR from "swr";
import { foldersApiEndPoint, getFolders } from "../../api/folders/foldersApi";
import ItemsContainer from "../../components/items/ItemsContainer";

function Trash() {
  let query = "trashed=true";
  const cacheKey = [foldersApiEndPoint, query];
  const { data: folderData, isLoading: folderLoading } = useSWR(
    cacheKey,
    (cacheKey) => getFolders(cacheKey[1])
  );

  return (
    <AppLayout breadcrumb={["Trash"]}>
      <ItemsContainer title="Folder" files={folderData?.data} />
    </AppLayout>
  );
}

export default Trash;
