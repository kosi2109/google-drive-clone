import React from "react";
import { AddBtn, SideBarBtn } from "./buttons";
import sideBarLink from "../constant/sideBarLink";
import { AiOutlineCloud } from "react-icons/ai";
import { useRouter } from "next/router";

function LinkList() {
  const router = useRouter();
  
  return (
    <div className="flex flex-col pr-4">
      {sideBarLink.map((link, i) => (
        <SideBarBtn
          key={i}
          Icon={link.icon}
          text={link.text}
          url={link.url}
          active={router.query.slug === link.url}
        />
      ))}
    </div>
  );
}

function SideBar() {
  const available = 15;
  const used = 1;
  const percent = Math.round(used/available * 100);
  
  return (
    <div className="h-screen py-4">
      <AddBtn />
      <LinkList />
      <div className="border-t pr-4 py-2 flex flex-col">
        <SideBarBtn url="test" Icon={AiOutlineCloud} text="Storage" />
        <div className="ml-4 flex flex-col py-2">
          <div className="w-5/6 h-1 bg-gray-200 mb-2 relative">
            <div className={`absolute left-0 top-0 h-full bg-blue-700`} style={{width : percent+"%"}}>

            </div>
          </div>
          <p className="text-gray-500 text-sm">{used} GB of {available} GB used</p>
        </div>
      </div>
    </div>
  );
}

export default SideBar;
