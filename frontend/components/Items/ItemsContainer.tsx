import React from "react";
import { AiOutlineArrowDown, AiOutlineArrowUp } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import {
  changeSortBy,
  selectListView,
  selectSortBy,
} from "../../features/appSlice";
import { ItemsContainerType } from "../../types/components/cardTypes";
// import Item from "./Item";

function ItemsContainer({children} : any) {
  const isListView = useSelector(selectListView);
  const sortBy = useSelector(selectSortBy);
  const dispatch = useDispatch();
  
  return (
    <div>
      {/* <div className="py-4 px-2">
        {isListView ? (
          <div className="w-full items-center flex">
            <div
              className="w-4/6 flex items-center select-none cursor-pointer"
              onClick={() => dispatch(changeSortBy({ column: "title" }))}
            >
              <h5 className="text-md font-semibold text-gray-600 mr-4">Name</h5>
              {sortBy.column === "title" &&
                (sortBy.isDESC ? <AiOutlineArrowDown /> : <AiOutlineArrowUp />)}
            </div>
            <div className="w-1/6 flex items-center select-none cursor-pointer">
              <h5 className="text-md font-semibold text-gray-600">Shared by</h5>
            </div>
            <div
              className="w-1/6 flex items-center select-none cursor-pointer"
              onClick={() => dispatch(changeSortBy({ column: "share_date" }))}
            >
              <h5 className="text-md font-semibold text-gray-600 mr-4">
                Share date
              </h5>
              {sortBy.column === "share_date" &&
                (sortBy.isDESC ? <AiOutlineArrowDown /> : <AiOutlineArrowUp />)}
            </div>
          </div>
        ) : (
          <h5 className="text-md font-semibold text-gray-600 dark:text-gray-400">{title}</h5>
        )}
      </div> */}
      <div
        className={
          isListView ? "flex flex-col" : `flex flex-wrap justify-start px-2 lg:p-0 gap-2 transition-all`
        }
      >
        {children}
      </div>
    </div>
  );
}

export default ItemsContainer;
