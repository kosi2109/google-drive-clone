import { useSession } from "next-auth/react";
import React from "react";
import { getFolderById } from "../../../api/pages/pagesApi";
import AppLayout from "../../../components/layouts/AppLayout";
import useSWR from "swr";
import { useRouter } from "next/router";
import ItemsContainer from "../../../components/items/ItemsContainer";

function Folder() {
  const { query: { id } } = useRouter();

  const { data: session, status } : any = useSession();
  const token = session?.token?.access_token;
  const { data, mutate, isLoading } = useSWR([id, token], ([id, token]) =>
    getFolderById(id, token)
  );

  return (
    <AppLayout isLoading={isLoading}>
      <ItemsContainer title="Folder" files={data?.folders} />
      <ItemsContainer title="Files" files={data?.files} />
    </AppLayout>
  );
}

export default Folder;
