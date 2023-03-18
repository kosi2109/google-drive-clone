import React from "react";
import { useDispatch } from "react-redux";
import Logo from "../../../../public/assets/driveLogo.png";
import { FaPlay } from "react-icons/fa";
import getIconByType from "../../../../constant/fileTypes";
import { ItemType } from "../../../../types/components/cardTypes";
import { changeSelectItem } from "../../../../features/itemSlice";

const renderByType = (mime_type: string, id: number) => {
  if (mime_type.includes("image")) {
    return (
      <img
        className="w-full h-full object-cover"
        src={`http://localhost:8000/api/files/d/${id}`}
        alt="sample img"
      />
    );
  } else if (mime_type.includes("video")) {
    return (
      <div className="w-full h-full overflow-hidden relative z-0">
        <div className="inset-x-0 mx-auto inset-y-0 my-auto w-10 h-10 absolute rounded-full flex items-center justify-center overflow-hidden">
          <div className="w-full h-full absolute bg-gray-800 opacity-50"></div>
          <FaPlay color="white" className="z-10" />
        </div>
        <video
          className="w-full h-full object-cover"
          src={`http://localhost:8000/api/files/d/${id}`}
        ></video>
      </div>
    );
  } else {
    return (
      <img
        className="w-full h-full object-cover"
        src={Logo.src}
        alt="sample img"
      />
    );
  }
};

function File({ item, focus }: ItemType) {
  const { Icon, color } = getIconByType(item.mime_type);
  const dispatch = useDispatch();

  return (
    <div
      onClick={() => dispatch(changeSelectItem(item))}
      className={`group file ${focus ? "item-focus" : ""}`}
    >
      <div className="w-full h-48 z-0">
        {renderByType(item.mime_type, item.id)}
      </div>

      <div
        className={`file__content ${
          focus ? "" : "group-hover:file__content__hover"
        }`}
      >
        <div className="w-[10%]">
          <Icon size={22} color={color} />
        </div>
        <p className="truncate ml-2">{item.name}</p>
      </div>
    </div>
  );
}

export default File;
