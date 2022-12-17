import { IconType } from "../../constant/fileTypes"

type GridContainerType = {
    title : string
}

type GridCardType = {
    type : keyof typeof IconType,
    image : string,
    title : string
}

export type {
    GridContainerType,
    GridCardType
}