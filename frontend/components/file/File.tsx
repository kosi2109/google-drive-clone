import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import getIconByType from "../../constant/fileTypes";
import { selectIsOpenDetailView, selectListView } from "../../features/appSlice";
import { changeSelectItem, selectSelectedItem } from "../../features/itemSlice";
import { ItemType } from "../../types/components/cardTypes";
import Logo from "../../public/assets/driveLogo.png";
import { FaPlay } from "react-icons/fa";

const styleFunction = (isList: boolean) => {
  const itemClass = isList
    ? "flex items-center h-10 px-4 py-6 select-none z-0"
    : "flex flex-col border-2 rounded-md overflow-hidden w-60 h-60 group select-none z-0";
  const itemClassOnFocus = isList
    ? "border border-blue-700 text-blue-900 bg-blue-50 dark:text-white dark:bg-gray-600 z-0"
    : "border-blue-400 z-0";
  const itemClassNotOnFocus = isList
    ? "border-b-2 hover:bg-gray-100 dark:hover:bg-gray-800 z-0"
    : "z-1";

  const contentClass = isList
    ? "flex items-center w-4/6 h-full"
    : "flex items-center p-4 h-12 w-full";
  const contentClassOnFocus = isList ? "" : "bg-sky-100 dark:bg-gray-600";
  const contentClassNotOnFocus = isList
    ? ""
    : "group-hover:bg-gray-100 dark:group-hover:bg-gray-800";

  return {
    itemClass,
    itemClassOnFocus,
    itemClassNotOnFocus,
    contentClass,
    contentClassOnFocus,
    contentClassNotOnFocus,
  };
};

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
          <div className="w-full h-full absolute bg-gray-800 opacity-50">

          </div>
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

function File({ item }: ItemType) {
  const { Icon, color } = getIconByType(item.mime_type);
  const [focus, setFocus] = useState(false);
  const isListItem = useSelector(selectListView);
  const style = styleFunction(isListItem);
  const selectItem = useSelector(selectSelectedItem);
  const dispatch = useDispatch();
  const isOpenDetail = useSelector(selectIsOpenDetailView);

  useEffect(() => {
    setFocus(selectItem?.id === item.id && selectItem.name === item.name && selectItem.mime_type === item.mime_type);
  }, [selectItem, item.id]);


  return (
    <div
      onClick={() => dispatch(changeSelectItem(item))}
      className={`${style.itemClass} 
      ${focus ? style.itemClassOnFocus : style.itemClassNotOnFocus}`}
    >
      {!isListItem && (
        <div className="w-full h-48 z-0">
          {renderByType(item.mime_type, item.id)}
        </div>
      )}

      <div
        className={`${style.contentClass}
        ${focus ? style.contentClassOnFocus : style.contentClassNotOnFocus}`}
      >
        <div className="w-[50px]">
          <Icon size={22} color={color} />
        </div>
        <p className="truncate ml-2">{item.name}</p>
      </div>

      {isListItem && (
        <div
          className={`flex items-center h-full ${
            isOpenDetail ? "w-1/5" : "w-1/6"
          }`}
        >
          <div className="w-8 h-8 bg-red-100 rounded-full"></div>
          <p className="ml-2 text-gray-500 font-semibold truncate">
            Myat Phyo Ko
          </p>
        </div>
      )}

      {isListItem && (
        <div
          className={`flex items-center h-full ${
            isOpenDetail ? "w-1/5" : "w-1/6"
          }`}
        >
          <p className="font-semibold text-gray-500 truncate">Nov 15,2021</p>
        </div>
      )}
    </div>
  );
}

export default File;
