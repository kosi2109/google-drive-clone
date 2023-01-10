import { createSlice } from "@reduxjs/toolkit";
import { getCookie, hasCookie } from "cookies-next";
import Cookies from "js-cookie";
import { User } from "../types/data/userType";

interface UserState {
  user: User | null
}

if (hasCookie('user_data')) {
  var initialState = { user : JSON.parse(getCookie('user_data') as string) } as UserState 
} else {
  var initialState = { user: null } as UserState;
}

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