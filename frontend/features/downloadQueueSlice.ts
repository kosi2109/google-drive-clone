import { createSlice } from "@reduxjs/toolkit";

export type DownQueueState = {
  id: string;
  name: string;
  completed: number;
  state: string;
};

const initialState: DownQueueState[] = [];

export const downloadQueueSlice = createSlice({
  name: "downloadQueue",
  initialState,
  reducers: {
    addToQeue: (state, action) => {
      state.push(action.payload);
    },
    updateProgessById: (state, action) => {
      let item = state.find((i) => i.id === action.payload?.id);
      if (item) {
        item.completed = action.payload.completed;
        item.state = action.payload.state;
      }
    },
  },
});

export const { addToQeue, updateProgessById } = downloadQueueSlice.actions;

export const selectDownloadQueue = (state: any) => state.downloadQueueSlice;

export default downloadQueueSlice.reducer;
