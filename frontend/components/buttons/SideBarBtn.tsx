import React from "react";
import { SideBarBtnType } from "../../types/components";

function SideBarBtn({ Icon, text, active = false }: SideBarBtnType) {
  return (
    <button
      className={`flex items-center w-full h-10 rounded-r-full px-6 ${
        active ? "bg-blue-100 text-blue-700" : "hover:bg-gray-100"
      }`}
    >
      <Icon size={20} />
      <span
        className={`ml-6 text-sm ${active ? "font-semibold" : "font-normal"}`}
      >
        {text}
      </span>
    </button>
  );
}

export default SideBarBtn;
