import React from "react";
import { AiOutlineArrowDown, AiOutlineArrowUp } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { IconType } from "../../constant/fileTypes";
import { changeSortBy, selectIsOpenDetailView, selectListView, selectSortBy } from "../../features/appSlice";
import { ItemsContainerType } from "../../types/components/cardTypes";
import Item from "./Item";

let dumpData = [
  {
    id : Math.floor(Math.random() * 100),
    image : "https://picsum.photos/200",
    type : IconType.pdf,
    title : "a"
  },
  {
    id : Math.floor(Math.random() * 100),
    image : "https://picsum.photos/200",
    type : IconType.folder,
    title : "b"
  },
  {
    id : Math.floor(Math.random() * 100),
    image : "https://picsum.photos/200",
    type : IconType.document,
    title : "c"
  },
  {
    id : Math.floor(Math.random() * 100),
    image : "https://picsum.photos/200",
    type : IconType.pdf,
    title : "d"
  },
]

function ItemsContainer({ title }: ItemsContainerType) {
  const isListView = useSelector(selectListView);
  const sortBy = useSelector(selectSortBy);
  const isOpenDetail = useSelector(selectIsOpenDetailView);

  const dispatch = useDispatch();
  
  return (
    <div>
      <div className="py-4 px-2">
        {isListView ? <div className="w-full items-center flex">
          <div className="w-4/6 flex items-center select-none cursor-pointer" onClick={() => dispatch(changeSortBy({column : 'title'}))}>
            <h5 className="text-md font-semibold text-gray-600 mr-4">Name</h5>
            {sortBy.column === "title" && ( sortBy.isDESC ? <AiOutlineArrowDown /> : <AiOutlineArrowUp /> )}
          </div>
          <div className="w-1/6 flex items-center select-none cursor-pointer">
            <h5 className="text-md font-semibold text-gray-600">Shared by</h5>
          </div>
          <div className="w-1/6 flex items-center select-none cursor-pointer" onClick={() => dispatch(changeSortBy({column : 'share_date' }))}>
            <h5 className="text-md font-semibold text-gray-600 mr-4">Share date</h5>
            {sortBy.column === "share_date" && ( sortBy.isDESC ? <AiOutlineArrowDown /> : <AiOutlineArrowUp /> )}
          </div>
        </div> : 
          <h5 className="text-md font-semibold text-gray-600">{title}</h5>
        }
      </div>
      <div className={isListView ? "flex flex-col" : `grid grid-cols-2 ${ isOpenDetail ? 'lg:grid-cols-3' : 'lg:grid-cols-5' } gap-2 transition-all` }>
        {dumpData.map((d) => (
          <Item
            id={d.id}
            type={d.type}
            image={d.image}
            title={d.title}
            isListItem={isListView}
          />
        ))}
      </div>
    </div>
  );
}

export default ItemsContainer;
