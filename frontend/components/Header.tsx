import Image from "next/image";
import React, { useCallback, useRef, useState } from "react";
import Logo from "../public/assets/driveLogo.png";
import { GoSettings } from "react-icons/go";
import { AiOutlineClose, AiOutlineMenu, AiOutlineSearch } from "react-icons/ai";
import RoundedHoverBtn from "./buttons/RoundedHoverBtn";
import { SearchHistories, AdvanceFilter, FileTypes } from "./search";
import { useTheme } from "next-themes";
import { BsMoon, BsSun } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { changeOpenMobileMenu } from "../features/appSlice";
import { selectUser } from "../features/userSlice";

function Header() {
  const [isFoucs, setIsFoucs] = useState<boolean>(false);
  const [keyword, setKeyword] = useState<string>("");
  const [openFilter, setOpenFilter] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const { systemTheme, theme, setTheme } = useTheme();
  const currentTheme = theme === "system" ? systemTheme : theme;
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

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
        <RoundedHoverBtn Icon={AiOutlineMenu} text="Menu" className="lg:hidden" onClickHandle={() => dispatch(changeOpenMobileMenu())} />
        <Image src={Logo} alt="Logo" width={45} height={45} className="mr-1" />
        <h3 className="text-2xl">Drive</h3>
      </div>

      {/* search */}
      <div className="hidden lg:block w-5/6">
        <div
          className={`z-50 h-full flex justify-start items-center w-3/5 h-12 p-1 rounded relative ${
            isFoucs ? "bg-white-200 shadow-lg border" : "bg-gray-100"
          }`}
        >
          <RoundedHoverBtn
            Icon={AiOutlineSearch}
            className={`px-2 ${isFoucs ? 'dark:text-white' : 'inputInnerBtn' }`}
            text="Search"
          />
          <input
            ref={inputRef}
            onFocus={() => setIsFoucs(true)}
            onBlur={() => setIsFoucs(false)}
            value={keyword}
            onChange={searchHandler}
            type="text"
            className={`border-none outline-none bg-transparent w-full h-8 text-md ${isFoucs ? 'text-white' : 'text-black' }`}
            placeholder="Search in Drive"
          />
          {keyword.length > 0 && (
            <RoundedHoverBtn
              Icon={AiOutlineClose}
              onClickHandle={clearKeyword}
              text="Clear Search"
              className={`${isFoucs ? 'dark:text-white' : 'inputInnerBtn' }`}
            />
          )}
          <RoundedHoverBtn
            className={`px-2 ${isFoucs ? 'dark:text-white' : 'inputInnerBtn' }`}
            Icon={GoSettings}
            text="Show Search Options"
            onClickHandle={() => setOpenFilter((pre: any) => !pre)}
          />

          {/* if open filter */}
          {openFilter && (
            <div className="z-[50] absolute left-0 top-[95%] w-full shadow-lg border bg-white z-[100]">
              <AdvanceFilter />
            </div>
          )}

          {/* show on focus */}
          {isFoucs && keyword.length < 1 && !openFilter && (
            <div className="z-[50] absolute top-[95%] w-full shadow-lg border bg-white z-[100] dark:bg-gray-900">
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
      <div className="flex items-center">

      <div
        onClick={() => setTheme(currentTheme === "dark" ? "light" : "dark")}
        className="w-8 h-8 rounded-full flex relative overflow-hidden hover:bg-gray-100 dark:hover:text-black-900 cursor-pointer"
      >
        <div
          className={`absolute w-8 h-8 flex items-center justify-center transition-all ease-in-out duration-300 ${
            currentTheme === "dark" ? "right-[100%]" : "right-[0%]"
          }`}
        >
          <BsMoon color="black" size={15} />
        </div>
        <div
          className={`absolute dark:hover:text-black w-8 h-8 flex items-center justify-center transition-all ease-in-out duration-300 ${
            currentTheme === "dark" ? "right-[0%]" : "right-[-100%]"
          }`}
        >
          <BsSun size={15} />
        </div>
      </div>
      <div className="w-12 flex justify-end items-center">
        <div className="w-10 h-10 rounded-full hover:bg-gray-100 p-1 cursor-pointer">
          <Image
            width={10}
            height={10}
            src={user?.avatar}
            alt="profile"
            className="w-full h-full rounded-full"
          />
        </div>
      </div>
      </div>
      

      
    </div>
  );
}

export default Header;
