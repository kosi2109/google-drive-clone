import { IconType } from "../../constant/fileTypes"
import {ItemType as ItemDataType} from "../data/itemTypes";
type ItemsContainerType = {
    title : string,
    files : any
}

type ItemType = {
    item : ItemDataType
    isListItem? : boolean
}

export type {
    ItemsContainerType,
    ItemType
}