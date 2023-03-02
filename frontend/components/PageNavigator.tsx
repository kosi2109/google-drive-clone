import React, { useEffect } from "react";
import {
  AiOutlineInfoCircle,
  AiOutlineUnorderedList,
  AiOutlineTable
} from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import {
  changeListView,
  changeOpenDetailView,
  selectIsOpenDetailView,
  selectListView,
} from "../features/appSlice";
import { selectSelectedItem } from "../features/itemSlice";
import { RoundedHoverBtn } from "./buttons";
import ItemSettings from "./settings/ItemSettings";


function PageNavigator(
  {breadcrumb} : {breadcrumb : string[]}
) {
  const isListView = useSelector(selectListView);
  const isOpenDetail = useSelector(selectIsOpenDetailView);
  const dispatch = useDispatch();
  const item = useSelector(selectSelectedItem);

  return (
    <div className="border-b flex items-center justify-between px-4 py-1">
      <div>
        <p className="text-lg capitalize">{ breadcrumb ? breadcrumb?.map((s,i) => {
          if (i === 0) return <span key={i}>{s}</span>;
          return <span key={i}>
           <span className="text-gray-400"> &gt; </span> {s}
          </span>
        }) : 'Loading'} </p>
      </div>
      <div className="items-center hidden lg:flex">
        {item && <ItemSettings /> }
        <div className="flex">
          <RoundedHoverBtn
            text={isListView ? "grid layout" : "list layout"}
            Icon={isListView ? AiOutlineTable : AiOutlineUnorderedList}
            onClickHandle={() => dispatch(changeListView())}
          />
          <RoundedHoverBtn
            text={isOpenDetail ? "hide details" : "view details"}
            Icon={AiOutlineInfoCircle}
            onClickHandle={() => dispatch(changeOpenDetailView())}
          />
        </div>
      </div>
    </div>
  );
}

export default PageNavigator;
