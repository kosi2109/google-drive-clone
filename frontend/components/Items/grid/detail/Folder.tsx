import { useRouter } from "next/router";
import React from "react";
import { MdFolder } from "react-icons/md";
import { useDispatch } from "react-redux";
import { changeSelectItem } from "../../../../features/itemSlice";
import { ItemType } from "../../../../types/data/itemTypes";

function Folder({ item, focus = false }: { item: ItemType; focus?: boolean }) {
  const router = useRouter();
  const dispatch = useDispatch();

  const changeRoute = () => {
    router.push(`/drive/folders/${item.id}`);
  };

  return (
    <div
      onClick={() => dispatch(changeSelectItem(item))}
      onDoubleClick={() => changeRoute()}
      className={`folder ${focus ? "item-focus" : "folder-gray"}`}
    >
      <MdFolder className="text-gray-600" size={23} />
      <div className="ml-4 text-ellipsis truncate w-5/6 select-none">
        <p>{item.name}</p>
      </div>
    </div>
  );
}

export default Folder;
