import { AiOutlineStar } from "react-icons/ai";
import { BiBookHeart, BiTimeFive } from "react-icons/bi";
import { MdDevices, MdOutlinePeopleOutline } from "react-icons/md";
import { BsTrash } from "react-icons/bs";

export default [
  {
    icon: BiBookHeart,
    text: "My Drive",
    url : '/drive/my-drive'
  },
  {
    icon: MdOutlinePeopleOutline,
    text: "Share with me",
    url : '/drive/share-with-me'
  },
  {
    icon: BiTimeFive,
    text: "Recent",
    url : '/drive/recent'
  },
  {
    icon: BsTrash,
    text: "Trash",
    url : '/drive/trash'
  },
];
