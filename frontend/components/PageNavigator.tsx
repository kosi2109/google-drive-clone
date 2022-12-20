import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import {
  AiOutlineInfoCircle,
  AiOutlineUnorderedList,
  AiOutlineTable,
  AiOutlineUserAdd,
} from "react-icons/ai";
import { BsEye, BsThreeDotsVertical } from "react-icons/bs";
import { FiLink2 } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import {
  changeListView,
  changeOpenDetailView,
  selectIsOpenDetailView,
  selectListView,
} from "../features/appSlice";
import { selectSelectedItem } from "../features/itemSlice";
import { RoundedHoverBtn } from "./buttons";

function ItemSettings() {
  return (
    <div className="flex pr-10">
      <RoundedHoverBtn text="get link" Icon={FiLink2} />
      <RoundedHoverBtn text="share" Icon={AiOutlineUserAdd} />
      <RoundedHoverBtn text="preview" Icon={BsEye} />
      <RoundedHoverBtn text="remove" Icon={RiDeleteBin6Line} />
      <RoundedHoverBtn text="more actions" Icon={BsThreeDotsVertical} />
    </div>
  );
}

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
  })
  
  return (
    <div className="border-b flex items-center justify-between px-4 py-1">
      <div>
        <p className="text-lg capitalize">{pageName}</p>
      </div>
      <div className="flex items-center">
        {item && 
        <ItemSettings />
        }
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
