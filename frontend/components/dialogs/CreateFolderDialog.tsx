import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createFolder, foldersApiEndPoint } from "../../api/folders/foldersApi";
import { changeFolderCreate } from "../../features/appSlice";
import Dialog from "../Common/Dialog";
import useSWR from "swr";
import { createFolderOptions } from "../../api/folders/foldersSWROptions";

function CreateFolderDialog() {
  const { mutate } = useSWR(foldersApiEndPoint);
  const [name, setName] = useState("");
  const dispatch = useDispatch();

  const close = () => {
    dispatch(changeFolderCreate(false));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await mutate(createFolder(name), createFolderOptions(name));
  };

  return (
    <Dialog setIsOpen={close} width="25%" height="auto">
      <form onSubmit={handleSubmit} className="p-4">
        <h3 className="font-semibold text-xl mb-3">New Folder</h3>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
          className="w-full border-2 border-gray-400 rounded h-10 mb-3 px-3 focus:outline-none focus:border-sky-500"
        />
        <div className="flex justify-end items-center">
          <button
            type="button"
            className="px-2 py-1 hover:bg-sky-50 hover:text-blue-900 rounded mx-1"
            onClick={close}
          >
            Cancel
          </button>
          <button className="px-2 py-1 hover:bg-sky-50 text-blue-900 rounded mx-1">
            Create
          </button>
        </div>
      </form>
    </Dialog>
  );
}

export default CreateFolderDialog;
