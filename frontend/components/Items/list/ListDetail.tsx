import { useRouter } from "next/router";
import React from "react";
import { useDispatch } from "react-redux";
import getIconByType from "../../../constant/fileTypes";
import { changeSelectItem } from "../../../features/itemSlice";
import { ItemType } from "../../../types/data/itemTypes";
import {filesize} from "filesize";

function ListDetail({ item, focus }: { item: ItemType; focus: boolean }) {
  const { Icon, color } = getIconByType(item.mime_type);
  const dispatch = useDispatch();
  const router = useRouter();

  const changeRoute = () => {
    if (item.mime_type === 'folder') {
        router.push(`/drive/folders/${item.id}`);
    }
  };
  
  let fileSize = filesize(item.size as any, {base: 2, standard: "jedec"}) as string;

  return (
    <tr
      onDoubleClick={changeRoute}
      className={`border-t h-12 select-none ${
        focus ? "item-focus" : "hover:bg-gray-100 dark:hover:bg-gray-800"
      }`}
      onClick={() => dispatch(changeSelectItem(item))}
    >
      <td className="px-2">
        <div className="flex items-center h-full">
          <Icon color={color} size={23} />
          <span className="ml-3">{item.name}</span>
        </div>
      </td>
      <td>{item.ownBy.name}</td>
      <td>{item.lastModify ? item.lastModify?.process_by?.name : "-"}</td>
      <td>{item.size ? fileSize : "-"}</td>
    </tr>
  );
}

export default ListDetail;
