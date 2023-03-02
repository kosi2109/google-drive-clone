import React from "react";
import ItemsContainer from "../items/ItemsContainer";
import Folder from "./folder";

function FolderContainer({ folders }: any) {

  return (
    <div className="flex flex-col">
      <h5 className="m-3 text-sm font-semibold">Folders</h5>
      <ItemsContainer>
        {folders?.map((d: any) => (
          <Folder key={d.id} item={d} />
        ))}
      </ItemsContainer>
    </div>
  );
}

export default FolderContainer;
