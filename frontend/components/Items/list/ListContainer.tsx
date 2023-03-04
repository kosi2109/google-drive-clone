import React from "react";
import { useSelector } from "react-redux";
import { selectSortBy } from "../../../features/appSlice";
import { selectSelectedItem } from "../../../features/itemSlice";
import { ItemType } from "../../../types/data/itemTypes";
import ListDetail from "./ListDetail";

function ListContainer({
  folders,
  files,
}: {
  folders: ItemType[];
  files: ItemType[];
}) {
  const sortBy = useSelector(selectSortBy);
  const selectItem = useSelector(selectSelectedItem);

  return (
    <table className="w-full">
      <thead className="h-12">
        <tr className="text-left text-sm text-gray-700">
          <th className="w-3/6 px-3">Name</th>
          <th className="w-1/6">Owner</th>
          <th className="w-1/6">Last modified</th>
          <th className="w-1/6">File Size</th>
        </tr>
      </thead>
      <tbody>
        {folders?.map((item: any) => (
          <ListDetail
            focus={
              selectItem?.id === item.id &&
              selectItem.name === item.name &&
              selectItem.mime_type === item.mime_type
            }
            key={item.id + item.name + "list"}
            item={item}
          />
        ))}
        {files?.map((item: any) => (
          <ListDetail
            focus={
              selectItem?.id === item.id &&
              selectItem.name === item.name &&
              selectItem.mime_type === item.mime_type
            }
            key={item.id + item.name + "list"}
            item={item}
          />
        ))}
      </tbody>
    </table>
  );
}

export default ListContainer;
