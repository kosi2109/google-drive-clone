import React from "react";
import AppLayout from "../../components/layouts/AppLayout";
import useSWR from "swr";
import { foldersApiEndPoint, getFolders } from "../../api/folders/foldersApi";
import ItemsContainer from "../../components/items/ItemsContainer";
import { filesApiEndPoint, getFiles } from "../../api/files/filesApi";

function Trash() {
  let query = "trashed=true";
  const { data: folderData, isLoading: folderLoading } = useSWR(
    [foldersApiEndPoint, query],
    (cacheKey) => getFolders(cacheKey[1])
  );

  const { data: fileData, isLoading: fileLoading } = useSWR(
    [filesApiEndPoint, query],
    (cacheKey) => getFiles(cacheKey[1])
  );

  return (
    <AppLayout breadcrumb={["Trash"]} isLoading={folderLoading || fileLoading}>
      <ItemsContainer folders={folderData?.data} files={fileData?.data} />
    </AppLayout>
  );
}

export default Trash;
