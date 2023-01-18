import { createSlice } from "@reduxjs/toolkit";
import { ItemType } from "../types/data/itemTypes";

export type DownQueueState = {
    name : string,
    is_complete : boolean,
    percentage : number 
}
  
const initialState: DownQueueState[] = [
    {
        name : 'test',
        is_complete : false,
        percentage : 60
    }
]

export const downloadQueueSlice = createSlice({
  name: "downloadQueue",
  initialState,
  reducers: {
    
  },
});

export const { } = downloadQueueSlice.actions;

export const selectDownloadQueue = (state : any) => state.downloadQueueSlice;

export default downloadQueueSlice.reducer;