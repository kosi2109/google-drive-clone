import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import getIconByType from "../../constant/fileTypes";
import { selectIsOpenDetailView } from "../../features/appSlice";
import { changeSelectItem, selectSelectedItem } from "../../features/itemSlice";
import { ItemType } from "../../types/components/cardTypes";

const styleFunction = (isList: boolean) => {

  const itemClass = isList
    ? "flex items-center h-10 px-4 py-6 select-none"
    : "flex flex-col border-2 rounded-md overflow-hidden w-60 h-60 group select-none";
  const itemClassOnFocus = isList
    ? "border border-blue-700 text-blue-900 bg-blue-50 dark:text-white dark:bg-gray-600"
    : "border-blue-400";
  const itemClassNotOnFocus = isList ? "border-b-2 hover:bg-gray-100 hover:bg-gray-800" : "";

  const contentClass = isList
    ? "flex items-center w-4/6 h-full"
    : "flex items-center p-4 h-12 w-full";
  const contentClassOnFocus = isList ? "" : "bg-sky-100 dark:bg-gray-600";
  const contentClassNotOnFocus = isList ? "" : "group-hover:bg-gray-100 dark:group-hover:bg-gray-800";

  return {
    itemClass,
    itemClassOnFocus,
    itemClassNotOnFocus,
    contentClass,
    contentClassOnFocus,
    contentClassNotOnFocus,
  };
};

function Item({id, type, image, title, isListItem = false }: ItemType) {
  const { Icon, color } = getIconByType[type];
  const [focus, setFocus] = useState(false);
  const style = styleFunction(isListItem);
  const item = useSelector(selectSelectedItem);
  const dispatch = useDispatch();
  const isOpenDetail = useSelector(selectIsOpenDetailView);
  const router = useRouter();

  useEffect(() => {
    setFocus(item?.id === id);
  },[item])

  const changeRoute = ()=> {
    type === 'folder' && router.push(`/drive/folders/${id}`);
  }

  return (
    <div
      onDoubleClick={() => changeRoute()}
      onClick={() => dispatch(changeSelectItem({id,title,type}))}
      className={`${style.itemClass} 
      ${ focus ? style.itemClassOnFocus : style.itemClassNotOnFocus }`}
    >
      {!isListItem && (
        <div className="w-full h-48">
          <img
            className="w-full h-full object-cover"
            src={image}
            alt="sample img"
          />
        </div>
      )}

      <div
        className={`${style.contentClass}
        ${ focus ? style.contentClassOnFocus : style.contentClassNotOnFocus }`}
      >
        <Icon size={23} color={color} />
        <p className="truncate ml-5">{title}</p>
      </div>

      {isListItem && (
        <div className={`flex items-center h-full ${isOpenDetail ? 'w-1/5' : 'w-1/6' }`}>
          <div className="w-8 h-8 bg-red-100 rounded-full"></div>
          <p className="ml-2 text-gray-500 font-semibold truncate">Myat Phyo Ko</p>
        </div>
      )}

      {isListItem && <div className={`flex items-center h-full ${isOpenDetail ? 'w-1/5' : 'w-1/6' }`}>
        <p className="font-semibold text-gray-500 truncate">Nov 15,2021</p>
        </div>}
    </div>
  );
}

export default Item;
