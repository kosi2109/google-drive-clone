import { hasCookie } from "cookies-next";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  selectIsOpenDetailView,
  selectIsOpenMobileMenu,
} from "../../features/appSlice";
import { selectUser } from "../../features/userSlice";
import Header from "../Header";
import ItemDetail from "../ItemDetail";
import PageNavigator from "../PageNavigator";
import SideBar from "../SideBar";

function AppLayout({ children }: any) {
  const isOpenDetail = useSelector(selectIsOpenDetailView);
  const isOpenMobileMenu = useSelector(selectIsOpenMobileMenu);
  const router = useRouter();
  const user = useSelector(selectUser);

  useEffect(() => {
    if (!user) {
      router.push("/auth");
    }
  }, []);

  return (
    <div className="h-screen overflow-hidden bg-white dark:bg-dark">
      <Header />
      <div className="flex">
        <div
          className={`w-5/6 transition-transform fixed top-18 bg-white dark:bg-gray-900 dark:md:bg-transparent h-full lg:relative lg:w-1/6 lg:block lg:translate-x-0 ${
            isOpenMobileMenu ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <SideBar />
        </div>
        <div className="w-full lg:w-5/6">
          <PageNavigator />
          <div className="w-full flex">
            <div
              className={`${
                isOpenDetail ? "w-4/6" : "w-full"
              } h-screen overflow-scroll pb-32 transition-all ease-in-out`}
            >
              {children}
            </div>
            <div
              className={`${
                isOpenDetail ? "w-2/6 hidden lg:block" : "w-0 hidden lg:block"
              } h-screen transition`}
            >
              <ItemDetail />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AppLayout;
