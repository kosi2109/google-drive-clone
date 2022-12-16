import React from "react";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { FaList } from "react-icons/fa";
import { PageNavigatorType } from "../types/components";
import { RoundedHoverBtn } from "./buttons";

function PageNavigator({ pageName }: PageNavigatorType) {
  return (
    <div className="border-b flex items-center justify-between px-4 py-1">
      <div>
        <p className="text-lg">{pageName}</p>
      </div>
      <div className="flex">
        <RoundedHoverBtn Icon={FaList} size={20} />
        <RoundedHoverBtn Icon={AiOutlineInfoCircle} size={20} />
      </div>
    </div>
  );
}

export default PageNavigator;
