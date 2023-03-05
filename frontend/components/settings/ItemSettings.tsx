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
import { deleteFiles, deleteFilesPermanent, filesApiEndPoint, restoreFiles } from "../../api/files/filesApi";

function ItemSettings({}: {}) {
  const dispatch = useDispatch();
  const item = useSelector(selectSelectedItem) as ItemType;

  const { trigger: folderDeleteTrigger } = useSWRMutation(
    foldersApiEndPoint,
    (key, { arg }) => deleteFolders(arg.id)
  );

  const { trigger: fileDeleteTrigger } = useSWRMutation(
    filesApiEndPoint,
    (key, { arg }) => deleteFiles(arg.id)
  );

  const { trigger: folderDeletePermanentTrigger } = useSWRMutation(
    [foldersApiEndPoint, "trashed=true"], 
    (key, { arg }) => deleteFoldersPermanent(arg.id)
    );

  const { trigger: fileDeletePermanentTrigger } = useSWRMutation(
    [filesApiEndPoint, "trashed=true"], 
    (key, { arg }) => deleteFilesPermanent(arg.id)
    );

  const { trigger: folderRestoreTrigger } = useSWRMutation(
    [foldersApiEndPoint, "trashed=true"],
    (key, { arg }) => restoreFolders(arg.id)
  );

  const { trigger: fileRestoreTrigger } = useSWRMutation(
    [filesApiEndPoint, "trashed=true"],
    (key, { arg }) => restoreFiles(arg.id)
  );

  const deleteHandler = async () => {
    if (item.mime_type === 'folder') {
      if (item.deleted_at) {
        await folderDeletePermanentTrigger({ id: item.id });
      } else {
        await folderDeleteTrigger({ id: item.id });
      }
    } else {
      if (item.deleted_at) {
        await fileDeletePermanentTrigger({ id: item.id });
      } else {
        await fileDeleteTrigger({ id: item.id });
      }
    }

  };

  const restoreHandler = async () => {
    if (item.mime_type === 'folder') {
      await folderRestoreTrigger({ id: item.id });
      
    } else {
      await fileRestoreTrigger({ id: item.id });

    }
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
