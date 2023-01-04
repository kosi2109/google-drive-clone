import { IconType } from "../../constant/fileTypes"

type ItemsContainerType = {
    title : string,
    data : any
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