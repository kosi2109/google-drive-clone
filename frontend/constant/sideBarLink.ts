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
    icon: MdDevices,
    text: "Computers",
    url : '/drive/computers'
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
    icon: AiOutlineStar,
    text: "Starred",
    url : '/drive/starred'
  },
  {
    icon: BsTrash,
    text: "Trash",
    url : '/drive/trash'
  },
];
