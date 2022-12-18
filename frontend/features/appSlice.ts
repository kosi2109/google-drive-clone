import { createSlice } from "@reduxjs/toolkit";

interface AppState {
  isListView : boolean,
  sortBy : {
    isDESC : boolean,
    column : string
  },
  isOpenDetailView : boolean
} 

const initialState : AppState = {
  isListView : false,
  sortBy : {
    isDESC : true,
    column : 'title'
  },
  isOpenDetailView : false
}

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    changeListView: (state) => {
      state.isListView = !state.isListView;
    },
    changeSortBy: (state, action) => {
      if (action.payload.column === state.sortBy.column) {
        state.sortBy.isDESC = !state.sortBy.isDESC;
      } else {
        state.sortBy = {column : action.payload.column , isDESC : true};
      }
    },
    changeOpenDetailView: (state) => {
      state.isOpenDetailView = !state.isOpenDetailView
    }
  },
});

export const { changeListView, changeSortBy,changeOpenDetailView } = appSlice.actions;

export const selectListView = (state : any) => state.app.isListView;
export const selectSortBy = (state : any) => state.app.sortBy;
export const selectIsOpenDetailView = (state : any) => state.app.isOpenDetailView;

export default appSlice.reducer;