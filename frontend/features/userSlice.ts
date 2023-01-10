import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { User } from "../types/data/userType";

interface UserState {
  user: User | null
}

const initialState = { user: null } as UserState

export const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
    },
    logout: (state, action) => {
      state.user = null;
    },
  },
});

export const { login, logout } = userSlice.actions;

export const selectUser = (state : any) => state.user.user;

export default userSlice.reducer;