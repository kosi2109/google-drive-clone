import React from "react";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import { MdOutlineClose } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import {
  changeDownloadController,
  selectDownloadControll,
} from "../../features/appSlice";
import {
  DownQueueState,
  selectDownloadQueue,
} from "../../features/downloadQueueSlice";
import { RoundedHoverBtn } from "../buttons";
import DownloadItem from "./DownloadItem";

function DownloadCard() {
  const { isMinimize, isOpen } = useSelector(selectDownloadControll);
  const downloadItems = useSelector(selectDownloadQueue);
  const dispatch = useDispatch();

  return (
    <div className="fixed bottom-0 right-14 w-96 shadow-2xl rounded-sm">
      <div className="h-14 bg-gray-900 flex items-center justify-between text-white px-4">
        <h5>Text</h5>
        <div className="flex items-center justify-center">
          <RoundedHoverBtn
            textPosition={isMinimize ? "top" : "bottom"}
            onClickHandle={() =>
              dispatch(
                changeDownloadController({ isOpen, isMinimize: !isMinimize })
              )
            }
            text={isMinimize ? "Maximize" : "Minimize"}
            Icon={isMinimize ? BsChevronUp : BsChevronDown}
            className="hover:bg-gray-700 text-white"
          />
          <RoundedHoverBtn
            textPosition={isMinimize ? "top" : "bottom"}
            onClickHandle={() =>
              dispatch(
                changeDownloadController({ isOpen: !isOpen, isMinimize })
              )
            }
            text="Close"
            Icon={MdOutlineClose}
            className="hover:bg-gray-700 text-white"
          />
        </div>
      </div>
      {!isMinimize && (
        <div className="px-4 bg-white">
          {downloadItems.map((item: DownQueueState, i: number) => (
            <DownloadItem key={i} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}

export default DownloadCard;
