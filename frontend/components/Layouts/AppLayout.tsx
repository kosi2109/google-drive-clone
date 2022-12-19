import React from "react";
import { useSelector } from "react-redux";
import { selectIsOpenDetailView } from "../../features/appSlice";
import ItemDetail from "../ItemDetail";

function AppLayout({ children }: any) {
  const isOpenDetail = useSelector(selectIsOpenDetailView);

  return (
    <div className="w-full flex">
      <div
        className={`${
          isOpenDetail ? "w-4/6" : "w-full"
        } h-screen overflow-scroll pb-32 transition-all ease-in-out`}
      >
        {children}
      </div>
      <div
        className={`${isOpenDetail ? "w-2/6" : "w-0"} h-screen transition`}
      >
        <ItemDetail />
      </div>
    </div>
  );
}

export default AppLayout;
