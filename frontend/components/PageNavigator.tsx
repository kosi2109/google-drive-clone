import React from "react";
import { AiOutlineInfoCircle, AiOutlineUnorderedList } from "react-icons/ai";
import { PageNavigatorType } from "../types/components";
import { RoundedHoverBtn } from "./buttons";

function PageNavigator({ pageName }: PageNavigatorType) {
  return (
    <div className="border-b flex items-center justify-between px-4 py-1">
      <div>
        <p className="text-lg">{pageName}</p>
      </div>
      <div className="flex">
        <RoundedHoverBtn Icon={AiOutlineUnorderedList} />
        <RoundedHoverBtn Icon={AiOutlineInfoCircle} />
      </div>
    </div>
  );
}

export default PageNavigator;
