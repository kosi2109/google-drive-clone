import React from "react";
import { AiFillFolder } from "react-icons/ai";

function FileTypes() {
  return (
    <div className="flex items-center justify-start px-2 border-b">
      <div className="flex flex-col justify-center items-center py-4 px-8 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer">
        <div className="w-8 h-8 p-1 rounded-full border flex items-center justify-center">
          <AiFillFolder />
        </div>
        <p className="text-sm select-none">Folders</p>
      </div>
    </div>
  );
}

export default FileTypes;
