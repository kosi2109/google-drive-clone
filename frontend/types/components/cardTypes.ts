import { IconType } from "../../constant/fileTypes"

type ItemsContainerType = {
    title : string
}

type ItemType = {
    id : number,
    type : keyof typeof IconType,
    image : string,
    title : string,
    isListItem? : boolean
}

export type {
    ItemsContainerType,
    ItemType
}