import React from "react";
import {  useSelector } from "react-redux";
import { selectSelectedItem } from "../features/itemSlice";
import Detail from "./itemDetail/Detail";

function ItemDetail() {
  const item = useSelector(selectSelectedItem);
  
  return (
    <div className="w-full">
      {item ? (
        <Detail item={item} />
      ) : (
        <p className="text-gray-600 text-center py-4">
          Select an item to see the details
        </p>
      )}
    </div>
  );
}

export default ItemDetail;
