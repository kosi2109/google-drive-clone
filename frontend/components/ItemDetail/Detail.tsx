import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import { MdFolderShared } from "react-icons/md";
import { useDispatch } from "react-redux";
import { changeOpenDetailView } from "../../features/appSlice";
import { ItemType } from "../../types/data/itemTypes";
import { RoundedHoverBtn } from "../buttons";

const Detail = ({ item }: { item: ItemType }) => {
  const dispatch = useDispatch();

  return (
    <>
      <div className="flex items-center p-8 w-full justify-between h-1/6 select-none">
        <div className="flex items-center">
          <MdFolderShared size={25} />
          <h5 className="text-xl ml-4">{item.title}</h5>
        </div>
        <RoundedHoverBtn
          text="hide details"
          Icon={AiOutlineClose}
          onClickHandle={() => dispatch(changeOpenDetailView())}
        />
      </div>

      <div className="w-full h-5/6 overflow-auto px-8 select-none">
        <h5 className="font-semibold mb-4">Folder Details</h5>
        <div>
          <h5 className="text-sm font-semibold">Type</h5>
          <h5>{item.type}</h5>
        </div>
      </div>
    </>
  );
};

export default Detail;
