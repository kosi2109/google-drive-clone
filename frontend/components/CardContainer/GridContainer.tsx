import React from "react";
import { IconType } from "../../constant/fileTypes";
import { GridContainerType } from "../../types/components/cardTypes";
import { GridCard } from "../Card";

function GridContainer({ title }: GridContainerType) {
  return (
    <div>
      <div className="py-4 px-2">
        <h5 className="text-md font-semibold text-gray-600">{title}</h5>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-2">
        <GridCard
          type={IconType.pdf}
          image="https://picsum.photos/200"
          title="test"
        />
      </div>
    </div>
  );
}

export default GridContainer;
