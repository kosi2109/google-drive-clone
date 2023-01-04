import { AiOutlineStar } from "react-icons/ai";
import { BiBookHeart, BiTimeFive } from "react-icons/bi";
import { MdDevices, MdOutlinePeopleOutline } from "react-icons/md";
import { BsTrash } from "react-icons/bs";

export default [
  {
    icon: BiBookHeart,
    text: "My Drive",
    url : 'my-drive'
  },
  {
    icon: MdDevices,
    text: "Computers",
    url : 'computers'
  },
  {
    icon: MdOutlinePeopleOutline,
    text: "Share with me",
    url : 'share-with-me'
  },
  {
    icon: BiTimeFive,
    text: "Recent",
    url : 'recent'
  },
  {
    icon: AiOutlineStar,
    text: "Starred",
    url : 'starred'
  },
  {
    icon: BsTrash,
    text: "Trash",
    url : 'trash'
  },
];
