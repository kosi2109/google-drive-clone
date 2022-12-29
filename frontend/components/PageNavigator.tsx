import { useRouter } from "next/router";
import React, { Dispatch, useEffect, useState } from "react";
import {
  AiOutlineInfoCircle,
  AiOutlineUnorderedList,
  AiOutlineTable,
  AiOutlineUserAdd,
} from "react-icons/ai";
import { BiLockAlt } from "react-icons/bi";
import { BsEye, BsThreeDotsVertical } from "react-icons/bs";
import { FiLink2 } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { ImEarth } from "react-icons/im";
import { useDispatch, useSelector } from "react-redux";
import {
  changeListView,
  changeOpenDetailView,
  selectIsOpenDetailView,
  selectListView,
} from "../features/appSlice";
import { selectSelectedItem } from "../features/itemSlice";
import { RoundedHoverBtn } from "./buttons";
import Dialog from "./common/Dialog";

const accessOption = [
  {
    icon : ImEarth,
    text : 'Anyone with the link',
    description : 'Anyone on the internet with the link can view'
  },
  {
    icon : BiLockAlt,
    text : 'Restricted',
    description : 'Only people with access can open with the link'
  }
]

function ItemSettings({setIsOpen} : {setIsOpen : Dispatch<boolean>}) {
  return (
    <div className="flex pr-10">
      <RoundedHoverBtn text="get link" Icon={FiLink2} onClickHandle={() => setIsOpen(true)} />
      <RoundedHoverBtn text="share" Icon={AiOutlineUserAdd} onClickHandle={() => setIsOpen(true)} />
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
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    if (slug) {
      setPageName(slug.split('-').join(' '));
    }
  }, [slug])  
  
  return (
    <div className="border-b flex items-center justify-between px-4 py-1">
      {isOpen && 
      <Dialog setIsOpen={setIsOpen} width="30%" height="auto">
        <div className="p-4">
          <h1 className="text-xl mb-3">Name</h1>
          <h1 className="text-sm text-gray-500 mb-3">Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti, eveniet.</h1>
          <input type="text" className="w-full border-2 h-12 rounded-md hover:border-gray-500 focus:border-red-800 p-4 mb-3" placeholder="Add People to send the link to" />
          <textarea placeholder="Message" className="w-full border-2 h-auto rounded-md hover:border-gray-500 focus:border-red-800 p-4 mb-3"></textarea>

          <div className="mb-3">
            <h2 className="text-lg">General access</h2>
            <div className="flex items-center group hover:bg-gray-100 h-12 p-2 rounded-l-full">
              <div className="bg-gray-200 w-8 h-8 rounded-full flex items-center justify-center mr-4 group-hover:bg-white">
                <ImEarth />
              </div>
              <div>
                <button>rested</button>
                <p className="text-xs text-gray-500">Only people with access can open with the link</p>
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <div>
              <button className="px-4 py-2 bg-blue-200 text-blue-800 font-semibold rounded-md">Copy Link</button>
            </div>

            <div>
              <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md">Done</button>
            </div>
          </div>
        </div>
      </Dialog>
      }

      <div>
        <p className="text-lg capitalize">{pageName} &gt; {item?.title}</p>
      </div>
      <div className="flex items-center">
        {item && 
        <ItemSettings setIsOpen={setIsOpen} />
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
