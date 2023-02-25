import { AiOutlineUserAdd } from "react-icons/ai";
import { BiRename } from "react-icons/bi";
import { BsEye } from "react-icons/bs";
import { FiLink2 } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteFolders,
  deleteFoldersPermanent,
  foldersApiEndPoint,
  restoreFolders,
} from "../../api/folders/foldersApi";
import {
  changeFolderRename,
  changeGeneralAccess,
} from "../../features/appSlice";
import { RoundedHoverBtn } from "../buttons";
import useSWR from "swr";
import { createFolderOptions, deleteFolderOptions } from "../../api/folders/foldersSWROptions";
import { selectSelectedItem } from "../../features/itemSlice";
import { ItemType } from "../../types/data/itemTypes";

function ItemSettings({}: {}) {
  const dispatch = useDispatch();
  const item = useSelector(selectSelectedItem) as ItemType;

  let query = "trashed=true";
  const cacheKey = [foldersApiEndPoint, query];
  const { mutate } = useSWR(item.deleted_at ? cacheKey : foldersApiEndPoint);

  const deleteHandler = async () => {
    if (item.deleted_at) {
      await mutate(deleteFoldersPermanent(item.id), deleteFolderOptions(item.id));
      
    } else {
      await mutate(deleteFolders(item.id), deleteFolderOptions(item.id));
      
    }
  };
  
  const restoreHandler = async () => {
    await mutate(restoreFolders(item.id), createFolderOptions(item.name));

  }

  return (
    <div className="flex pr-10">
      {!item.deleted_at ? (
        <>
          <RoundedHoverBtn
            text="get link"
            Icon={FiLink2}
            onClickHandle={() => dispatch(changeGeneralAccess(true))}
          />
          <RoundedHoverBtn
            text="share"
            Icon={AiOutlineUserAdd}
            onClickHandle={() => dispatch(changeGeneralAccess(true))}
          />
          <RoundedHoverBtn text="preview" Icon={BsEye} />
          <RoundedHoverBtn
            text="rename"
            Icon={BiRename}
            onClickHandle={() => dispatch(changeFolderRename(true))}
          />
        </>
      ) : (
        <RoundedHoverBtn
          text="restore"
          Icon={RiDeleteBin6Line}
          onClickHandle={() => restoreHandler()}
        />
      )}
      <RoundedHoverBtn
        text="remove"
        Icon={RiDeleteBin6Line}
        onClickHandle={() => deleteHandler()}
      />
    </div>
  );
}

export default ItemSettings;
