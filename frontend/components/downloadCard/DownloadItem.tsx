import React from "react";
import { BsFolder2 } from "react-icons/bs";
import getIconByType from "../../constant/fileTypes";
import { RoundedHoverBtn } from "../buttons";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { DownQueueState } from "../../features/downloadQueueSlice";
import { MdDone } from "react-icons/md";

export interface DownloadItem {
  item: DownQueueState;
}

function DownloadItem({ item }: DownloadItem) {
  const { Icon, color } = getIconByType(item.mime_type);
  return (
    <div className="flex items-center justify-between h-14 cursor-pointer group">
      <div className="w-[50px]">
        <Icon color={color} size={23} />
      </div>
      <div className="w-5/6 px-2">
        <p className="truncate select-none">{item.name}</p>
      </div>
      <div className="w-[50px]">
        {item.state === "uploading" && (
          <CircularProgressbar
            value={item.completed}
            styles={{
              path: {
                stroke: "green",
              },
            }}
          />
        )}

        {item.state === "finished" && (
          <>
            <RoundedHoverBtn
              text="Show file location"
              Icon={BsFolder2}
              textPosition="top"
              className="hidden w-6 h-6 group-hover:flex"
              size={25}
            />
            <RoundedHoverBtn
              text="Show file location"
              Icon={MdDone}
              textPosition="top"
              className="flex bg-green-500 text-white w-6 h-6 group-hover:hidden"
            />
          </>
        )}
      </div>
    </div>
  );
}

export default DownloadItem;
