import Image from "next/image";
import React, { useCallback, useRef, useState } from "react";
import Logo from "../public/assets/driveLogo.png";
import { GoSettings } from "react-icons/go";
import { AiOutlineClose, AiOutlineMenu, AiOutlineSearch } from "react-icons/ai";
import RoundedHoverBtn from "./buttons/RoundedHoverBtn";
import { useTheme } from "next-themes";
import { BsMoon, BsSun } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { changeOpenMobileMenu } from "../features/appSlice";
import { useSession } from "next-auth/react";
import { FiLogOut } from "react-icons/fi";
import useOutsideClick from "../hooks/useOutsideClick";
import { signOut } from "next-auth/react"
import { logout } from "../api/backendApi";
import { destroyCookie } from 'nookies'
import { logoutUser } from "../features/userSlice";
import { AdvanceFilter, FileTypes, SearchHistories } from "./Search";

function Header() {
  const [isFoucs, setIsFoucs] = useState<boolean>(false);
  const [keyword, setKeyword] = useState<string>("");
  const [openFilter, setOpenFilter] = useState<boolean>(false);
  const [openSettings, setOpenSettings] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const { systemTheme, theme, setTheme } = useTheme();
  const currentTheme = theme === "system" ? systemTheme : theme;
  const dispatch = useDispatch();
  const { data: session, status } = useSession()
  const btnRef = useRef<any>();

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
  
  const logoutHandler = () => {
    logout().then(() => {
      destroyCookie(null, 'jwt')
      dispatch(logoutUser)
      signOut({callbackUrl : '/auth'});
    })
  }

  useOutsideClick(btnRef, setOpenSettings);

  return (
    <div className="py-3 px-4 border-b flex justify-between items-center h-18 z-10">
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
            isFoucs ? "bg-white shadow-lg border" : "bg-gray-100"
          }`}
        >
          <RoundedHoverBtn
            Icon={AiOutlineSearch}
            className={`px-2 inputInnerBtn`}
            text="Search"
          />
          <input
            ref={inputRef}
            // onFocus={() => setIsFoucs(true)}
            // onBlur={() => setIsFoucs(false)}
            value={keyword}
            onChange={searchHandler}
            type="text"
            className={`border-none outline-none bg-transparent w-full h-8 text-md text-black`}
            placeholder="Search in Drive"
          />
          {keyword.length > 0 && (
            <RoundedHoverBtn
              Icon={AiOutlineClose}
              onClickHandle={clearKeyword}
              text="Clear Search"
              className={`inputInnerBtn`}
            />
          )}
          <RoundedHoverBtn
            className={`px-2 inputInnerBtn`}
            Icon={GoSettings}
            text="Show Search Options"
            // onClickHandle={() => setOpenFilter((pre: any) => !pre)}
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
        <div className="w-10 h-10 rounded-full relative dark:hover:bg-gray-100 hover:bg-gray-300 p-[3px] cursor-pointer">
          <img
            width={10}
            height={10}
            src={session?.user?.image as string}
            alt="profile"
            className="w-full h-full rounded-full"
            onClick={() => setOpenSettings(true)}
          />

          {openSettings && 
          <div ref={btnRef} className="absolute z-50 w-40 h-auto bg-red top-[100%] bg-white shadow-md right-0 flex flex-col p-2">
            <button onClick={logoutHandler} className="w-full hover:bg-gray-100 h-10 rounded-md flex items-center px-3">
              <FiLogOut className="mr-4" /> Logout
            </button>
          </div>
          }
        </div>
      </div>
      </div>
      

      
    </div>
  );
}

export default Header;
