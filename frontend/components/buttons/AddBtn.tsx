import React from "react";
import { GrAdd } from "react-icons/gr";

function AddBtn() {
  return (
    <button className="mx-4 mb-4 flex items-center w-28 h-12  bg-white shadow-md hover:shadow-xl hover:bg-gray-100 text-sm px-4 py-2  border rounded-full">
      <GrAdd size={20} />
      <span className="ml-4 text-md font-semibold text-black">New</span>
    </button>
  );
}

export default AddBtn;
