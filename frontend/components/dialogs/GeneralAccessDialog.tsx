import React, { useRef, useState } from "react";
import { AiFillCaretDown } from "react-icons/ai";
import { BiLockAlt } from "react-icons/bi";
import { FiLink2 } from "react-icons/fi";
import { ImEarth } from "react-icons/im";
import { TiTick } from "react-icons/ti";
import useOutsideClick from "../../hooks/useOutsideClick";
import Dialog from "../Common/Dialog";

const accessOption = [
  {
    code: 0,
    text: "Restricted",
    description: "Only people with access can open with the link",
  },
  {
    code: 1,
    text: "Anyone with the link",
    description: "Anyone on the internet with the link can view",
  },
];

function GeneralAccessDialog({
  openHandler,
}: {
  openHandler: React.Dispatch<boolean>;
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState(accessOption[0]);
  const menuRef = useRef<any>();
  useOutsideClick(menuRef, setMenuOpen);

  return (
    <Dialog setIsOpen={openHandler} width="30%" height="auto">
      <div className="p-4">
        <h1 className="text-xl mb-3">Name</h1>
        <h1 className="text-sm text-gray-500 mb-3">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti,
          eveniet.
        </h1>
        <input
          type="text"
          className="w-full border-2 h-12 rounded-md hover:border-gray-500 focus:border-red-800 p-4 mb-3"
          placeholder="Add People to send the link to"
        />
        <textarea
          placeholder="Message"
          className="w-full border-2 h-auto rounded-md hover:border-gray-500 focus:border-red-800 p-4 mb-3"
        ></textarea>

        <div className="mb-3">
          <h2 className="text-lg">General access</h2>
          <div className="flex items-center group hover:bg-gray-100 h-12 p-2 rounded-l-full">
            <div className="bg-gray-200 w-8 h-8 rounded-full flex items-center justify-center mr-4 group-hover:bg-white">
              {selectedMenu.code === 0 ? <BiLockAlt /> : <ImEarth color="green" />}
            </div>
            <div className="relative">
              <button
                onClick={() => setMenuOpen((pre) => !pre)}
                className="flex items-center"
              >
                {selectedMenu.text}{" "}
                <AiFillCaretDown size={10} className="ml-2" />
              </button>
              <p className="text-xs text-gray-500">
                {selectedMenu.description}
              </p>

              <div
                ref={menuRef}
                className={`pointer-events-none absolute rounded-md left-0 top-[50%] bg-white z-[100] py-3 w-[100%] 
              shadow-md flex flex-col items-start opacity-0 h-0 transition-all 
              ${menuOpen ? "h-fit opacity-100 pointer-events-auto" : ""}`}
              >
                {accessOption.map((option) => (
                  <button
                    key={option.code}
                    onClick={() => setSelectedMenu(option)}
                    className="hover:bg-gray-100 w-full text-left p-4 flex items-center"
                  >
                    <span className="w-10">
                      {option.code === selectedMenu.code && (
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
            <button className="px-4 py-2 bg-blue-100 text-blue-800 font-semibold rounded-md flex items-center text-sm">
              <FiLink2 className="mr-2" /> Copy Link
            </button>
          </div>

          <div>
            <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md">
              Done
            </button>
          </div>
        </div>
      </div>
    </Dialog>
  );
}

export default GeneralAccessDialog;
