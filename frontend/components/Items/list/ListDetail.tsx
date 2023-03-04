import React from "react";
import { useDispatch } from "react-redux";
import getIconByType from "../../../constant/fileTypes";
import { changeSelectItem } from "../../../features/itemSlice";
import { ItemType } from "../../../types/data/itemTypes";

function ListDetail({ item, focus }: { item: ItemType; focus: boolean }) {
  const { Icon, color } = getIconByType(item.mime_type);
  const dispatch = useDispatch();

  return (
    <tr
      className={`border-t h-12 ${focus ? 'item-focus' : 'hover:bg-gray-100 dark:hover:bg-gray-800'}`}
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
      <td>{item.size ? item.size : "-"}</td>
    </tr>
  );
}

export default ListDetail;
