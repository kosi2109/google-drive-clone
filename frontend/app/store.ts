import { configureStore } from '@reduxjs/toolkit';
import userReducer from "../features/userSlice";
import appReducer from "../features/appSlice";
import itemReducer from "../features/itemSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    app : appReducer,
    item : itemReducer
  },
});