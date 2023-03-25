import { filesize } from "filesize";
import React from "react";
import { ItemType } from "../../types/data/itemTypes";
import DetailBodyText from "./DetailBodyText";

function DetailBody({ item }: { item: ItemType }) {
  let fileSize = null;

  if (item.mime_type !== 'folder') {
    fileSize = filesize(item?.size as any, {base: 2, standard: "jedec"}) as string;
  }

  return (
    <div className="w-full h-5/6 overflow-auto px-8 select-none">
      <h5 className="font-semibold mb-4">Folder Details</h5>
      <DetailBodyText 
        title="Type" 
        body={item.mime_type} 
      />

      <DetailBodyText 
        title="Size" 
        body={fileSize} 
      />

      <DetailBodyText 
        title="Owner" 
        body={item.ownBy.name} 
      />

      <DetailBodyText
        title="Modified"
        body={item?.lastModify?.created_at ? `${item?.lastModify?.created_at} by ${item?.lastModify?.process_by.name}` : 'None'}
      />

      <DetailBodyText
        title="Opened"
        body={item?.lastView?.created_at ? `${item?.lastView?.created_at} by ${item?.lastView?.process_by.name}` : 'None'}
      />

      <DetailBodyText 
        title="Create" 
        body={item.created} 
      />
    </div>
  );
}

export default DetailBody;
