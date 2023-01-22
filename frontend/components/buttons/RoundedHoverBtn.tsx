import React from "react";
import { RoundedBtnType } from "../../types/components";

function RoundedHoverBtn({
  Icon,
  className,
  onClickHandle,
  size = 23,
  text,
  textPosition = "bottom",
}: RoundedBtnType) {
  return (
    <button
      onClick={onClickHandle}
      className={`mx-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 p-1 w-10 h-10 relative flex items-center justify-center group ${
        className && className
      }`}
    >
      <Icon size={size} />
      <div
        className={`z-[1000] absolute ${
          textPosition === "bottom" ? "top-[100%]" : ""
        } ${
          textPosition === "top" ? "bottom-[100%]" : ""
        } p-1 z-[100] bg-gray-600 rounded-sm opacity-0 group-hover:opacity-100 group-hover:transition-all delay-300`}
      >
        <p className="text-xs text-white font-semibold capitalize whitespace-nowrap">
          {text}
        </p>
      </div>
    </button>
  );
}

export default RoundedHoverBtn;
