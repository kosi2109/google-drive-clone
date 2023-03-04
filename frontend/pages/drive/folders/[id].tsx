import { useSession } from "next-auth/react";
import React from "react";
import AppLayout from "../../../components/layouts/AppLayout";
import useSWR from "swr";
import { useRouter } from "next/router";
import {
  foldersApiEndPoint,
  getFolderById,
} from "../../../api/folders/foldersApi";
import ItemsContainer from "../../../components/items/ItemsContainer";

function Folder() {
  const {
    query: { id },
  } = useRouter();
  const { data: session, status }: any = useSession();
  const cacheKey = [foldersApiEndPoint, id];
  const { data, mutate, isLoading } = useSWR(
    cacheKey,
    (cacheKey) => id && getFolderById(cacheKey[1])
  );

  const breadcrumb = data?.data?.folder_path
    .split("my drive")[1]
    .split("/")
    .filter((s: string) => s !== "");

  breadcrumb?.unshift(
    session?.user?.email === data?.data?.ownBy?.email
      ? "my drive"
      : "shared with me"
  );

  return (
    <AppLayout breadcrumb={breadcrumb} isLoading={isLoading}>
      <ItemsContainer folders={data?.data?.folders} files={data?.data?.files} />
    </AppLayout>
  );
}

export default Folder;