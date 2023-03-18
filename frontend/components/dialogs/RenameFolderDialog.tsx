import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { foldersApiEndPoint, updateFolders } from "../../api/folders/foldersApi";
import { changeFolderRename } from "../../features/appSlice";
import Dialog from "../Common/Dialog";
import useSWRMutation from "swr/mutation";
import { selectSelectedItem } from "../../features/itemSlice";
import { ItemType } from "../../types/data/itemTypes";
import { filesApiEndPoint, updateFiles } from "../../api/files/filesApi";
import { useRouter } from "next/router";

function RenameFolderDialog() {
  const [parentFolderId, setParentFolderId] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (router.pathname === "/drive/folders/[id]") {
      setParentFolderId(router?.query?.id as string);
    }
  }, [router.pathname, router.query.id]);

  const { trigger : folderTrigger, isMutating : folderMutating } = useSWRMutation([foldersApiEndPoint, parentFolderId],(key, {arg}) => updateFolders(arg.id, arg.data));
  const { trigger : fileTrigger, isMutating : fileMutating } = useSWRMutation([foldersApiEndPoint, parentFolderId],(key, {arg}) => updateFiles(arg.id, arg.data));
  const item = useSelector(selectSelectedItem) as ItemType;
  const dispatch = useDispatch();
  const [name, setName] = useState(item.name);

  const close = () => {
    dispatch(changeFolderRename(false));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (item.mime_type === 'folder') {
      await folderTrigger({
        id : item.id,
        data : {name}
      });
      
    } else {
      await fileTrigger({
        id : item.id,
        data : {name}
      });

    }
    close();
  };

  return (
    <Dialog setIsOpen={close} width="25%" height="auto">
      <form onSubmit={handleSubmit} className="p-4">
        <h3 className="font-semibold text-xl mb-3 text-gray-600">Rename</h3>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
          className="w-full border-2 border-gray-400 rounded h-10 mb-3 px-3 focus:outline-none focus:border-sky-500"
        />
        <div className="flex justify-end items-center">
          <button
            type="button"
            className="px-2 py-1 hover:bg-sky-50 hover:text-blue-900 dark:text-blue-900 rounded mx-1"
            onClick={close}
          >
            Cancel
          </button>
          <button className="px-2 py-1 hover:bg-sky-50 text-blue-900 rounded mx-1">
            {folderMutating || fileMutating ? 'Renaming' : 'OK' }
          </button>
        </div>
      </form>
    </Dialog>
  );
}

export default RenameFolderDialog;
