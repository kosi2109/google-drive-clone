import { AiOutlineUserAdd } from "react-icons/ai";
import { BiRename } from "react-icons/bi";
import { BsEye } from "react-icons/bs";
import { FiLink2 } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { GiBackwardTime } from "react-icons/gi";
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
import { selectSelectedItem } from "../../features/itemSlice";
import { ItemType } from "../../types/data/itemTypes";
import useSWRMutation from "swr/mutation";

function ItemSettings({}: {}) {
  const dispatch = useDispatch();
  const item = useSelector(selectSelectedItem) as ItemType;

  const { trigger: deleteTrigger, isMutating: deleting } = useSWRMutation(
    foldersApiEndPoint,
    (key, { arg }) => deleteFolders(arg.id)
  );
  const { trigger: deletePermanentTrigger, isMutating: permenentDeleting } = useSWRMutation(
    [foldersApiEndPoint, "trashed=true"], 
    (key, { arg }) => deleteFoldersPermanent(arg.id)
    );

  const { trigger: restoreTrigger, isMutating: restoring } = useSWRMutation(
    [foldersApiEndPoint, "trashed=true"],
    (key, { arg }) => restoreFolders(arg.id)
  );

  const deleteHandler = async () => {
    if (item.deleted_at) {
      await deletePermanentTrigger({ id: item.id });
    } else {
      await deleteTrigger({ id: item.id });
    }
  };

  const restoreHandler = async () => {
    await restoreTrigger({ id: item.id });
  };

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
          text="restore from trash"
          Icon={GiBackwardTime}
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
