import React from "react";
import { useSelector } from "react-redux";
import { selectIsOpenDetailView } from "../../features/appSlice";
import Header from "../Header";
import ItemDetail from "../ItemDetail";
import PageNavigator from "../PageNavigator";
import SideBar from "../SideBar";

function AppLayout({ children }: any) {
  const isOpenDetail = useSelector(selectIsOpenDetailView);

  return (
    <div className="h-screen overflow-hidden">
      <Header />
      <div className="flex">
        <div className="w-1/6">
          <SideBar />
        </div>
        <div className="w-5/6">
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
                isOpenDetail ? "w-2/6" : "w-0"
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
