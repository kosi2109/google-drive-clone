import { AiOutlineUserAdd } from "react-icons/ai";
import { BiRename } from "react-icons/bi";
import { BsEye } from "react-icons/bs";
import { FiLink2 } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { deleteFolders, foldersApiEndPoint } from "../../api/folders/foldersApi";
import { changeFolderRename, changeGeneralAccess } from "../../features/appSlice";
import { RoundedHoverBtn } from "../buttons";
import useSWR from "swr";
import { deleteFolderOptions } from "../../api/folders/foldersSWROptions";
import { selectSelectedItem } from "../../features/itemSlice";
import { ItemType } from "../../types/data/itemTypes";

function ItemSettings({} : {}) {
    const dispatch = useDispatch();
    const { mutate } = useSWR(foldersApiEndPoint);
    const item = useSelector(selectSelectedItem) as ItemType;

    const deleteHandler = async () => {
      await mutate(deleteFolders(item.id), deleteFolderOptions(item.id));
    }

    return (
      <div className="flex pr-10">
        <RoundedHoverBtn text="get link" Icon={FiLink2} onClickHandle={() => dispatch(changeGeneralAccess(true))} />
        <RoundedHoverBtn text="share" Icon={AiOutlineUserAdd} onClickHandle={() => dispatch(changeGeneralAccess(true))} />
        <RoundedHoverBtn text="preview" Icon={BsEye} />
        <RoundedHoverBtn text="remove" Icon={RiDeleteBin6Line} onClickHandle={() => deleteHandler()} />
        <RoundedHoverBtn text="rename" Icon={BiRename} onClickHandle={() => dispatch(changeFolderRename(true))} />
      </div>
    );
  }

  export default ItemSettings;