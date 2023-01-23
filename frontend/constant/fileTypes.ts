import { BsFillFileEarmarkExcelFill, BsImageFill } from "react-icons/bs";
import { MdFolderShared, MdMovie, MdPictureAsPdf } from "react-icons/md";
import { HiDocumentText } from "react-icons/hi";

export enum IconType {
  pdf = "pdf",
  folder = "folder",
  excel = "excel",
  document = "document",
}

// const getIconByType = {
//     "pdf" : {
//         Icon : MdPictureAsPdf,
//         color : 'red'
//     },
//     "folder" : {
//         Icon : MdFolderShared,
//         color : 'red'
//     },
//     "excel" : {
//         Icon : BsFillFileEarmarkExcelFill,
//         color : 'green'
//     },
//     "document" : {
//         Icon : HiDocumentText,
//         color : 'blue'
//     },
// }

const getIconByType = (mime_type: string) => {
  let typeObj = {
    Icon: MdPictureAsPdf,
    color: "red",
  };

  if (mime_type.includes("video")) {
    typeObj = {
      Icon: MdMovie,
      color: "red",
    };
  } else if (mime_type.includes("image")) {
    typeObj = {
      Icon: BsImageFill,
      color: "red",
    };
  } else if (mime_type.includes("pdf")) {
    typeObj = {
      Icon: MdPictureAsPdf,
      color: "red",
    };
  } else if (mime_type.includes("sheet")) {
    typeObj = {
      Icon: BsFillFileEarmarkExcelFill,
      color: "green",
    };
  } else if (mime_type.includes("document")) {
    typeObj = {
      Icon: HiDocumentText,
      color: "blue",
    };
  }

  
  return typeObj;
};

export default getIconByType;
