import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
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


function PageNavigator() {
  const isListView = useSelector(selectListView);
  const isOpenDetail = useSelector(selectIsOpenDetailView);
  const dispatch = useDispatch();
  const item = useSelector(selectSelectedItem);
  const router = useRouter();
  const {slug} : any = router.query;
  const [pageName, setPageName] = useState("");

  useEffect(() => {
    if (slug) {
      setPageName(slug.split('-').join(' '));
    }
  }, [slug])  
  
  return (
    <div className="border-b flex items-center justify-between px-4 py-1">
      <div>
        <p className="text-lg capitalize">{pageName} &gt; {item?.title}</p>
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
