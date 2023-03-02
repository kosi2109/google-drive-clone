import React from "react";
import { ItemType } from "../../types/data/itemTypes";
import DetailBody from "./DetailBody";
import DetailTitle from "./DetailTitle";

const Detail = ({ item }: { item: ItemType }) => {

  return (
    <>
      <DetailTitle name={item.name} mime_type={item.mime_type} />
      <DetailBody item={item} />
    </>
  );
};

export default Detail;
