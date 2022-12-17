import { BsFillFileEarmarkExcelFill } from "react-icons/bs";
import { MdFolderShared, MdPictureAsPdf } from "react-icons/md";
import { HiDocumentText } from "react-icons/hi";

export enum IconType {
    pdf = 'pdf',
    folder = 'folder',
    excel = 'excel',
    document = 'document',
}

const getIconByType = {
    "pdf" : {
        Icon : MdPictureAsPdf,
        color : 'red'
    },
    "folder" : {
        Icon : MdFolderShared,
        color : 'red'
    },
    "excel" : {
        Icon : BsFillFileEarmarkExcelFill,
        color : 'green'
    },
    "document" : {
        Icon : HiDocumentText,
        color : 'blue'
    },
}

export default getIconByType;