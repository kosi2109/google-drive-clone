import Image from "next/image";
import React, { useCallback, useRef, useState } from "react";
import Logo from "../public/assets/driveLogo.png";
import People from "../public/assets/test.jpg";
import { GoSettings } from "react-icons/go";
import { AiOutlineClose, AiOutlineSearch } from "react-icons/ai";
import RoundedHoverBtn from "./buttons/RoundedHoverBtn";
import { SearchHistories, AdvanceFilter, FileTypes } from "./Search";

function Header() {
  const [isFoucs, setIsFoucs] = useState<boolean>(false);
  const [keyword, setKeyword] = useState<string>("");
  const [openFilter, setOpenFilter] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const searchHandler = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setKeyword(e.target.value);
    },
    []
  );

  const clearKeyword = () => {
    setKeyword("");
    inputRef.current?.focus();
  };

  return (
    <div className="py-3 px-4 border-b flex justify-between items-center h-18">
      {/* logo */}
      <div className="flex items-center w-1/6">
        <Image src={Logo} alt="Logo" width={45} height={45} className="mr-1" />
        <h3 className="text-2xl">Drive</h3>
      </div>

      {/* search */}
      <div className="w-5/6">
        <div
          className={`z-100 h-full flex flex-col justify-start items-center w-3/5 h-12 p-1 rounded relative ${
            isFoucs ? "bg-white-200 shadow-lg border" : "bg-gray-100"
          }`}
        >
          <RoundedHoverBtn Icon={AiOutlineSearch} className="absolute left-1" />
          <input
            ref={inputRef}
            onFocus={() => setIsFoucs(true)}
            onBlur={() => setIsFoucs(false)}
            value={keyword}
            onChange={searchHandler}
            type="text"
            className="border-none outline-none bg-transparent w-full h-8 pl-12 pr-20 text-md"
            placeholder="Search in Drive"
          />
          {keyword.length > 0 && (
            <RoundedHoverBtn
              Icon={AiOutlineClose}
              className="absolute right-12"
              onClickHandle={clearKeyword}
            />
          )}
          <RoundedHoverBtn
            Icon={GoSettings}
            className="absolute right-1"
            onClickHandle={() => setOpenFilter((pre: any) => !pre)}
          />

          {/* if open filter */}
          {openFilter && (
            <div className="absolute top-[95%] w-full shadow-lg border bg-white z-[100]">
              <AdvanceFilter />
            </div>
          )}

          {/* show on focus */}
          {isFoucs && keyword.length < 1 && !openFilter && (
            <div className="absolute top-[95%] w-full shadow-lg border bg-white z-[100]">
              <SearchHistories />
              <FileTypes />
              <div className="p-3">
                <button className="text-blue-700 hover:bg-gray-200 cursor-pointer p-1 rounded">
                  Show Search Options
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* setting */}
      <div className="w-12 flex justify-end items-center">
        <div className="w-10 h-10 rounded-full hover:bg-gray-100 p-1 cursor-pointer">
          <img
            src={People.src}
            alt="profile"
            className="w-full h-full rounded-full"
          />
        </div>
      </div>
    </div>
  );
}

export default Header;
