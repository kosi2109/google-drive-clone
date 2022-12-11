import React from "react";

function AdvanceFilter() {
  return (
    <div className="w-full flex flex-col justify-start items-center">
      <div className="flex flex-col w-full p-4">
        <div className="w-full flex items-center mb-4">
          <h5 className="w-1/6">Type</h5>
          <select
            name=""
            id=""
            className="w-2/6 h-8 border-b hover:border-b-2 hover:border-blue-900 "
          >
            <option value="">Any</option>
          </select>
        </div>

        <div className="w-full flex items-center">
          <h5 className="w-1/6">Has the words</h5>
          <input
            type="text"
            className="w-4/6 h-8 px-1 border focus:border-blue-600 outline-none hover:outline-b hover:outline-blue-900 hover:border-none"
          />
        </div>
      </div>
      <div className="w-full p-2 flex justify-between items-center">
        <button className="py-2 px-4 text-sm font-semibold hover:bg-gray-200 text-blue-600 rounded">
          LEARN MORE
        </button>
        <div>
          <button className="py-2 px-4 text-sm font-semibold hover:shadow-lg rounded">
            RESET
          </button>
          <button className="py-2 px-4 text-sm font-semibold bg-blue-600 text-white ml-8 hover:shadow-lg rounded">
            SEARCH
          </button>
        </div>
      </div>
    </div>
  );
}

export default AdvanceFilter;
