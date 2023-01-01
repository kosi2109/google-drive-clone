import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { SideBarBtnType } from "../../types/components";

function SideBarBtn({ Icon, text, url, active = false }: SideBarBtnType) {
  const router = useRouter();

  return (
    <button
      onClick={() => router.push(`/drive/${url}`)}
      className={`flex items-center w-full h-10 rounded-r-full px-6 ${
        active ? "bg-blue-100 text-blue-700" : "hover:bg-gray-100 dark:hover:bg-gray-800"
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
