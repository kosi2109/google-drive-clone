import { createSlice } from "@reduxjs/toolkit";
import { ItemType } from "../types/data/itemTypes";

export type ItemState = {
    selected : ItemType
}
  
const initialState: ItemState = {
    selected : {
        id: 0,
        title : "",
        type : ""
    }
}

export const itemSlice = createSlice({
  name: "item",
  initialState,
  reducers: {
    changeSelectItem: (state, action) => {
      state.selected = action.payload;
    },
  },
});

export const { changeSelectItem } = itemSlice.actions;

export const selectSelectedItem = (state : any) => state.item.selected;

export default itemSlice.reducer;