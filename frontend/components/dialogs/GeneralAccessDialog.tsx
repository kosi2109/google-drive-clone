import React, { useEffect, useRef, useState } from "react";
import { AiFillCaretDown } from "react-icons/ai";
import { BiLockAlt } from "react-icons/bi";
import { FiLink2 } from "react-icons/fi";
import { ImEarth } from "react-icons/im";
import { TiTick } from "react-icons/ti";
import { useDispatch, useSelector } from "react-redux";
import { changeGeneralAccess } from "../../features/appSlice";
import { selectSelectedItem } from "../../features/itemSlice";
import useOutsideClick from "../../hooks/useOutsideClick";
import { ItemType } from "../../types/data/itemTypes";
import Dialog from "../Common/Dialog";
import OverviewProfile from "../Common/OverviewProfile";
import "./GeneralAccessDialog";

const accessOption = [
  {
    code: 1,
    text: "Restricted",
    description: "Only people with access can open with the link",
  },
  {
    code: 2,
    text: "Anyone with the link",
    description: "Anyone on the internet with the link can view",
  },
];

function GeneralAccessDialog({}: {}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState<typeof accessOption[0]>();
  const [copied, setCopied] = useState(false);
  const menuRef = useRef<any>();
  const item = useSelector(selectSelectedItem) as ItemType;
  const dispatch = useDispatch();

  useOutsideClick(menuRef, setMenuOpen);

  useEffect(() => {
    setSelectedMenu(accessOption.find((a) => item.access === a.code));
  }, [item.id, item.access]);

  const copyClipboard = () => {
    setCopied(true);
    navigator.clipboard.writeText(item.file_path);
    setTimeout(() => {
      setCopied(false);
    }, 1000);
  };

  const close = () => {
    dispatch(changeGeneralAccess(false))
  };

  return (
    <Dialog setIsOpen={close} width="30%" height="auto">
      <div className="p-4 dark:text-black relative">
        <h1 className="text-xl mb-1">Share</h1>
        <h1 className="text-xl mb-3 break-words">{item.name}</h1>
        <input
          type="text"
          className="w-full border-2 h-12 rounded-md hover:border-gray-500 focus:border-red-800 p-4 mb-3 dark:text-white"
          placeholder="Add People to send the link to"
        />

        <div>
          <h2>People with access</h2>
          <div className="flex flex-col items-start justify-start py-2">
            <OverviewProfile />
          </div>
        </div>

        <div className="mb-3">
          <h2 className="text-lg">General access</h2>
          <div className="flex items-center group hover:bg-gray-100 h-12 p-2 rounded-l-full">
            <div className="bg-gray-200 w-8 h-8 rounded-full flex items-center justify-center mr-4 group-hover:bg-white">
              {selectedMenu?.code === 1 ? (
                <BiLockAlt />
              ) : (
                <ImEarth color="green" />
              )}
            </div>
            <div className="relative">
              <button
                onClick={() => setMenuOpen((pre) => !pre)}
                className="flex items-center"
              >
                {selectedMenu?.text}
                <AiFillCaretDown size={10} className="ml-2" />
              </button>
              <p className="text-xs text-gray-500">
                {selectedMenu?.description}
              </p>

              <div
                ref={menuRef}
                className={`pointer-events-none absolute rounded-md left-0 top-[50%] bg-white z-[100] py-3 w-[100%] 
              shadow-md flex flex-col items-start transition-all 
              ${
                menuOpen
                  ? "h-fit opacity-100 pointer-events-auto"
                  : "opacity-0 h-0"
              }`}
              >
                {accessOption.map((option) => (
                  <button
                    key={option.code}
                    onClick={() => setSelectedMenu(option)}
                    className="hover:bg-gray-100 w-full text-left p-4 flex items-center"
                  >
                    <span className="w-10">
                      {option.code === selectedMenu?.code && (
                        <TiTick color="blue" />
                      )}
                    </span>
                    {option.text}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <div>
            <button
              onClick={copyClipboard}
              className="px-4 py-2 bg-blue-100 text-blue-800 font-semibold rounded-md flex items-center text-sm"
            >
              <FiLink2 className="mr-2" /> Copy Link
            </button>
          </div>

          <div>
            <button
              onClick={() => close()}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md"
            >
              Done
            </button>
          </div>
        </div>

        <div
          className={`absolute bg-gray-800 inset-x-0 mx-auto w-40 text-white h-10 rounded-t-sm p-2 transition-all ${
            copied
              ? "-bottom-2 opacity-100"
              : "-bottom-10 opacity-0 pointer-events-none"
          }`}
        >
          <p className="text-sm">Link Copied</p>
        </div>
      </div>
    </Dialog>
  );
}

export default GeneralAccessDialog;
