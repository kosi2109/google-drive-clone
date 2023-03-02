import React from "react";
import ItemsContainer from "../items/ItemsContainer";
import Item from "./File";

function FileContainer({files} : any) {
  return (
    <div className="flex flex-col">
      <h5 className="m-3 text-sm font-semibold">Files</h5>
      <ItemsContainer>
        {files?.map((d: any) => (
          <Item key={d.id} item={d} />
        ))}
      </ItemsContainer>
    </div>
  );
}

export default FileContainer;
