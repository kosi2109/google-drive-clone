import { AiOutlineUserAdd } from "react-icons/ai";
import { BsEye, BsThreeDotsVertical } from "react-icons/bs";
import { FiLink2 } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { RoundedHoverBtn } from "../buttons";

function ItemSettings({openHandler} : {openHandler : React.Dispatch<boolean>}) {
    return (
      <div className="flex pr-10">
        <RoundedHoverBtn text="get link" Icon={FiLink2} onClickHandle={() => openHandler(true)} />
        <RoundedHoverBtn text="share" Icon={AiOutlineUserAdd} onClickHandle={() => openHandler(true)} />
        <RoundedHoverBtn text="preview" Icon={BsEye} />
        <RoundedHoverBtn text="remove" Icon={RiDeleteBin6Line} />
        <RoundedHoverBtn text="more actions" Icon={BsThreeDotsVertical} />
      </div>
    );
  }

  export default ItemSettings;