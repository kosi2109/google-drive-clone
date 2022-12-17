import React, { useState } from "react";
import { MdPictureAsPdf } from "react-icons/md";
import getIconByType from "../../constant/fileTypes";
import { GridCardType } from "../../types/components/cardTypes";

function GridCard({ type, image, title }: GridCardType) {
  const { Icon, color } = getIconByType[type];
  const [focus, setFocus] = useState(false);

  return (
    <div
      onClick={() => setFocus(true)}
      className={`flex flex-col border-2 rounded-md overflow-hidden w-60 h-60 group ${
        focus ? "border-blue-400" : ""
      }`}
    >
      <div className="w-full h-48">
        <img
          className="w-full h-full object-cover"
          src={image}
          alt="sample img"
        />
      </div>

      <div
        className={`flex items-center p-4 h-12 w-full ${
          focus ? "bg-sky-100" : "group-hover:bg-gray-100"
        }`}
      >
        <Icon size={23} color={color} />
        <p className="truncate ml-5">{title}</p>
      </div>
    </div>
  );
}

export default GridCard;
