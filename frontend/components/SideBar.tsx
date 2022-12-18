import React from "react";
import { AddBtn, SideBarBtn } from "./buttons";
import sideBarLink from "../constant/sideBarLink";
import { AiOutlineCloud } from "react-icons/ai";

function LinkList() {
  return (
    <div className="flex flex-col pr-4">
      {sideBarLink.map((link, i) => (
        <SideBarBtn
          key={i}
          Icon={link.icon}
          text={link.text}
          active={i === 0 ? true : false}
        />
      ))}
    </div>
  );
}

function SideBar() {
  return (
    <div className="h-screen py-4">
      <AddBtn />
      <LinkList />
      <div className="border-t pr-4 py-2 flex flex-col">
        <SideBarBtn Icon={AiOutlineCloud} text="Storage" />
        <div className="ml-4 flex flex-col py-2">
          <div className="w-5/6 h-1 bg-gray-200 mb-2"></div>
          <p className="text-gray-500 text-sm">0MB of 15 GB used</p>
        </div>
      </div>
    </div>
  );
}

export default SideBar;
