import React from "react";
import { MdHistory } from "react-icons/md";

function SearchHistories() {
  return (
    <div className="flex flex-col justify-start items-center py-1 border-b">
      <div className="w-full flex justify-start items-center h-12 hover:bg-gray-200 px-4 cursor-pointer">
        <MdHistory size={20} />
        <p className="ml-4 select-none">Testing</p>
      </div>
    </div>
  );
}

export default SearchHistories;
