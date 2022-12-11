import React from "react";
import { IconType } from "react-icons";

function RoundedHoverBtn({Icon, className, onClickHandle}: {Icon: IconType; className?: string; onClickHandle?: any}) {
  return (
    <button
      onClick={onClickHandle}
      className={`rounded-full hover:bg-gray-200 p-1 w-10 h-10 flex items-center justify-center ${
        className && className
      }`}
    >
      <Icon size={23} />
    </button>
  );
}

export default RoundedHoverBtn;
