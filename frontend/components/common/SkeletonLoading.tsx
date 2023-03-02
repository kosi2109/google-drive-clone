import React from "react";
import { useSelector } from "react-redux";
import { selectListView } from "../../features/appSlice";

function SkeletonLoading() {
  const isListView = useSelector(selectListView);

  return (
    <div className="animate-pulse">
      <div className="py-4 px-2">
        {isListView ? (
          <div className="w-full items-center flex">
            <div className="w-4/6 flex items-center select-none cursor-pointer">
              <h5 className="text-md font-semibold text-gray-600 mr-4">Name</h5>
            </div>
            <div className="w-1/6 flex items-center select-none cursor-pointer">
              <h5 className="text-md font-semibold text-gray-600">Shared by</h5>
            </div>
            <div className="w-1/6 flex items-center select-none cursor-pointer">
              <h5 className="text-md font-semibold text-gray-600 mr-4">
                Share date
              </h5>
            </div>
          </div>
        ) : (
          <h5 className="text-md font-semibold text-gray-600 dark:text-gray-400"></h5>
        )}
      </div>
      <div
        className={
          isListView
            ? "flex flex-col"
            : `flex flex-wrap justify-center sm:justify-start gap-2 transition-all`
        }
      >
        {isListView ? 
        <>
            <div className="flex items-center h-10 px-4 py-6 bg-gray-100">
                <div className="w-1/6 h-4 bg-gray-200 rounded-md mr-1">
                    
                </div>
                <div className="w-3/6 h-4 bg-gray-200 rounded-md mr-1">
                    
                </div>
                <div className="w-1/6 h-4 bg-gray-200 rounded-md mr-1">
                    
                </div>
                <div className="w-1/6 h-4 bg-gray-200 rounded-md">
                    
                </div>
            </div>
        </>
        :
            <>
        <div className="border-2 rounded-md w-60 h-60">
          <div className="w-full h-48 bg-gray-100"></div>
          <div className={`flex items-center p-4 h-12 w-full`}>
            <div className="w-1/6 h-6 bg-gray-100 mr-1 rounded-md"></div>
            <div className="w-5/6 h-6 bg-gray-100 rounded-md"></div>
          </div>
        </div>
        <div className="border-2 rounded-md w-60 h-60">
          <div className="w-full h-48 bg-gray-100"></div>
          <div className={`flex items-center p-4 h-12 w-full`}>
            <div className="w-1/6 h-6 bg-gray-100 mr-1 rounded-md"></div>
            <div className="w-5/6 h-6 bg-gray-100 rounded-md"></div>
          </div>
        </div>
        <div className="border-2 rounded-md w-60 h-60">
          <div className="w-full h-48 bg-gray-100"></div>
          <div className={`flex items-center p-4 h-12 w-full`}>
            <div className="w-1/6 h-6 bg-gray-100 mr-1 rounded-md"></div>
            <div className="w-5/6 h-6 bg-gray-100 rounded-md"></div>
          </div>
        </div>
        <div className="border-2 rounded-md w-60 h-60">
          <div className="w-full h-48 bg-gray-100"></div>
          <div className={`flex items-center p-4 h-12 w-full`}>
            <div className="w-1/6 h-6 bg-gray-100 mr-1 rounded-md"></div>
            <div className="w-5/6 h-6 bg-gray-100 rounded-md"></div>
          </div>
        </div>
        <div className="border-2 rounded-md w-60 h-60">
          <div className="w-full h-48 bg-gray-100"></div>
          <div className={`flex items-center p-4 h-12 w-full`}>
            <div className="w-1/6 h-6 bg-gray-100 mr-1 rounded-md"></div>
            <div className="w-5/6 h-6 bg-gray-100 rounded-md"></div>
          </div>
        </div>
            </>
        }
      </div>
    </div>
  );
}

export default SkeletonLoading;
