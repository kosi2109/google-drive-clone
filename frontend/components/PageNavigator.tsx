import React from "react";
import {
  AiOutlineInfoCircle,
  AiOutlineUnorderedList,
  AiOutlineTable,
} from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { changeListView, changeOpenDetailView, selectListView } from "../features/appSlice";
import { PageNavigatorType } from "../types/components";
import { RoundedHoverBtn } from "./buttons";

function PageNavigator({ pageName }: PageNavigatorType) {
  const isListView = useSelector(selectListView);
  const dispatch = useDispatch();

  return (
    <div className="border-b flex items-center justify-between px-4 py-1">
      <div>
        <p className="text-lg">{pageName}</p>
      </div>
      <div className="flex">
        <RoundedHoverBtn
          Icon={isListView ? AiOutlineTable : AiOutlineUnorderedList}
          onClickHandle={() => dispatch(changeListView())}
        />
        <RoundedHoverBtn Icon={AiOutlineInfoCircle} onClickHandle={() => dispatch(changeOpenDetailView())} />
      </div>
    </div>
  );
}

export default PageNavigator;
