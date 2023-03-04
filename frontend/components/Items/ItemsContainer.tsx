import React from "react";
import { useSelector } from "react-redux";
import { selectListView } from "../../features/appSlice";
import { selectSelectedItem } from "../../features/itemSlice";
import File from "./grid/detail/File";
import Folder from "./grid/detail/Folder";
import GridContainer from "./grid/GridContainer";
import ListContainer from "./list/ListContainer";

function ItemsContainer({ folders, files }: any) {
  const isListView = useSelector(selectListView);
  const selectItem = useSelector(selectSelectedItem);

  return (
    <>
      {isListView ? (
        <ListContainer folders={folders} files={files} />
      ) : (
        <>
          {folders.length > 0 && (
            <GridContainer title="Folders">
              {folders?.map((item: any) => (
                <Folder
                  key={item.id + item.name}
                  item={item}
                  focus={
                    selectItem?.id === item.id &&
                    selectItem.name === item.name &&
                    selectItem.mime_type === item.mime_type
                  }
                />
              ))}
            </GridContainer>
          )}

          {files.length > 0 && (
            <GridContainer title="Files">
              {files?.map((item: any) => (
                <File
                  key={item.id + item.name}
                  item={item}
                  focus={
                    selectItem?.id === item.id &&
                    selectItem.name === item.name &&
                    selectItem.mime_type === item.mime_type
                  }
                />
              ))}
            </GridContainer>
          )}
        </>
      )}
    </>
  );
}

export default ItemsContainer;
