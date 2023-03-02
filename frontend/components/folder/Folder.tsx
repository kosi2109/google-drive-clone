import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { MdFolder, MdFolderShared } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { selectListView } from "../../features/appSlice";
import { changeSelectItem, selectSelectedItem } from "../../features/itemSlice";
import { ItemType } from "../../types/data/itemTypes";

function Folder({ item }: { item: ItemType }) {
  const isListItem = useSelector(selectListView);
  const router = useRouter();
  const dispatch = useDispatch();
  const [focus, setFocus] = useState(false);
  const selectItem = useSelector(selectSelectedItem);

  const changeRoute = () => {
    router.push(`/drive/folders/${item.id}`);
  };

  useEffect(() => {
    setFocus(
      selectItem?.id === item.id &&
        selectItem.name === item.name &&
        selectItem.mime_type === item.mime_type
    );
  }, [selectItem, item.id]);

  return (
    <div
      onClick={() => dispatch(changeSelectItem(item))}
      onDoubleClick={() => changeRoute()}
      className={`border-2 w-52 md:w-60 h-14 rounded-md flex justify-start items-center px-5 ${focus ? 'border-blue-500 text-blue-800 bg-blue-100' : 'hover:bg-gray-200'}`}
    >
      <MdFolder className="text-gray-600" size={23} />
      <div className="ml-4 text-ellipsis truncate w-5/6 select-none">
        <p>{item.name}</p>
      </div>
    </div>
  );
}

export default Folder;
