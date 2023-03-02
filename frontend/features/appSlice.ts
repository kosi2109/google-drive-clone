import { createSlice } from "@reduxjs/toolkit";

interface AppState {
  isListView: boolean;
  sortBy: {
    isDESC: boolean;
    column: string;
  };
  isOpenDetailView: boolean;
  isOpenMobileMenu: boolean;
  downloadContainer: {
    isMinimize: boolean;
    isOpen: boolean;
  };
  isOpenFolderCreate: boolean;
  isOpenFolderRename: boolean;
  isOpenGeneralAccess: boolean;
}

const initialState: AppState = {
  isListView: false,
  sortBy: {
    isDESC: true,
    column: "title",
  },
  isOpenDetailView: false,
  isOpenMobileMenu: false,
  downloadContainer: {
    isMinimize: false,
    isOpen: false,
  },
  isOpenFolderCreate: false,
  isOpenFolderRename: false,
  isOpenGeneralAccess: false,
};

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
        state.sortBy = { column: action.payload.column, isDESC: true };
      }
    },
    changeOpenDetailView: (state) => {
      state.isOpenDetailView = !state.isOpenDetailView;
    },
    changeOpenMobileMenu: (state) => {
      state.isOpenMobileMenu = !state.isOpenMobileMenu;
    },
    changeDownloadController: (state, action) => {
      state.downloadContainer = action.payload;
    },
    changeFolderCreate: (state, action) => {
      state.isOpenFolderCreate = action.payload;
    },
    changeFolderRename: (state, action) => {
      state.isOpenFolderRename = action.payload;
    },
    changeGeneralAccess: (state, action) => {
      state.isOpenGeneralAccess = action.payload;
    },
  },
});

export const {
  changeListView,
  changeSortBy,
  changeOpenDetailView,
  changeOpenMobileMenu,
  changeDownloadController,
  changeFolderCreate,
  changeFolderRename,
  changeGeneralAccess
} = appSlice.actions;

export const selectListView = (state: any) => state.app.isListView;
export const selectSortBy = (state: any) => state.app.sortBy;
export const selectIsOpenDetailView = (state: any) =>
  state.app.isOpenDetailView;
export const selectIsOpenMobileMenu = (state: any) =>
  state.app.isOpenMobileMenu;
export const selectDownloadControll = (state: any) =>
  state.app.downloadContainer;
export const selectFolderCreate = (state: any) => state.app.isOpenFolderCreate;
export const selectFolderRename = (state: any) => state.app.isOpenFolderRename;
export const selectGeneralAccess = (state: any) => state.app.isOpenGeneralAccess;

export default appSlice.reducer;
