import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import { useDispatch } from "react-redux";
import getIconByType from "../../constant/fileTypes";
import { changeOpenDetailView } from "../../features/appSlice";
import { RoundedHoverBtn } from "../buttons";

function DetailTitle({ name, mime_type }: { name: string; mime_type: string }) {
  const dispatch = useDispatch();
  const { Icon, color } = getIconByType(mime_type);

  return (
    <div className="flex items-center p-8 w-full justify-between h-1/6 select-none">
      <div className="flex items-center w-5/6">
        <div className="w-[25px] h-full flex items-center justify-center">
          <Icon color={color} size={25} />
        </div>
        <h5 className="text-xl ml-4 truncate">{name}</h5>
      </div>
      <RoundedHoverBtn
        text="hide details"
        Icon={AiOutlineClose}
        onClickHandle={() => dispatch(changeOpenDetailView())}
      />
    </div>
  );
}

export default DetailTitle;
