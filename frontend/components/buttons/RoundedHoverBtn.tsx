import React from "react";
import { RoundedBtnType } from "../../types/components";

function RoundedHoverBtn({
  Icon,
  className,
  onClickHandle,
  size = 23,
}: RoundedBtnType) {
  return (
    <button
      onClick={onClickHandle}
      className={`rounded-full hover:bg-gray-200 p-1 w-10 h-10 flex items-center justify-center ${
        className && className
      }`}
    >
      <Icon size={size} />
    </button>
  );
}

export default RoundedHoverBtn;
