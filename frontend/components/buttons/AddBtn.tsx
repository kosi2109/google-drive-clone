import React, { useRef, useState } from "react";
import { IconType } from "react-icons";
import { AiOutlineFolderAdd } from "react-icons/ai";
import { BsFileEarmarkArrowUp } from "react-icons/bs";
import { GrAdd } from "react-icons/gr";
import { RiFolderUploadLine } from "react-icons/ri";
import useOutsideClick from "../../hooks/useOutsideClick";
import Devider from "../Common/Devider";

function LinkBtn({Icon, text, onClickHandler} : {Icon : IconType, text : string, onClickHandler? : any}) {
  return <button onClick={onClickHandler} className="h-10 w-full flex items-center justify-start px-4 hover:bg-gray-200">
    <Icon size={22} /> <p className="ml-4 capitalize">{text}</p>
  </button>
}

function AddBtn() {
  const [open, setOpen] = useState(false);
  const btnRef = useRef<any>();
  useOutsideClick(btnRef, setOpen);

  return (
    <div className="relative" ref={btnRef}>
      <button onClick={() => setOpen(true)} className="mx-4 mb-4 flex items-center w-32 h-14  bg-white shadow-md hover:shadow-xl hover:bg-gray-100 text-sm px-4 py-2  border rounded-full">
        <GrAdd size={20} />
        <span className="ml-4 text-md font-semibold text-black">New</span>
      </button>
        <div className={`pointer-events-none py-2 absolute bg-white shadow-lg drop-shadow-md z-[50] w-80 h-0 opacity-0 top-0 left-4 rounded-md transition-all ${open ? 'h-40 opacity-100 pointer-events-auto' : ''}`}>
          <LinkBtn Icon={AiOutlineFolderAdd} text="new folder" />
          <Devider className="h-[2px] bg-gray-100 my-2" />
          <LinkBtn Icon={BsFileEarmarkArrowUp} text="file upload" />
          <LinkBtn Icon={RiFolderUploadLine} text="folder upload" />
        </div>
    </div>
  );
}

export default AddBtn;
