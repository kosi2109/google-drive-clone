import { createSlice } from "@reduxjs/toolkit";

interface AppState {
  isListView : boolean,
  sortBy : {
    isDESC : boolean,
    column : string
  },
  isOpenDetailView : boolean,
  isOpenMobileMenu : boolean,
  downloadContainer : {
    isMinimize : boolean,
    isOpen : boolean
  }
} 

const initialState : AppState = {
  isListView : false,
  sortBy : {
    isDESC : true,
    column : 'title'
  },
  isOpenDetailView : false,
  isOpenMobileMenu : false,
  downloadContainer : {
    isMinimize : false,
    isOpen : false
  }
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
    },
    changeOpenMobileMenu: (state) => {
      state.isOpenMobileMenu = !state.isOpenMobileMenu
    },
    changeDownloadController: (state, action) => {
      state.downloadContainer = action.payload;
    }
  },
});

export const { changeListView, changeSortBy, changeOpenDetailView, changeOpenMobileMenu, changeDownloadController } = appSlice.actions;

export const selectListView = (state : any) => state.app.isListView;
export const selectSortBy = (state : any) => state.app.sortBy;
export const selectIsOpenDetailView = (state : any) => state.app.isOpenDetailView;
export const selectIsOpenMobileMenu = (state : any) => state.app.isOpenMobileMenu;
export const selectDownloadControll = (state : any) => state.app.downloadContainer;

export default appSlice.reducer;