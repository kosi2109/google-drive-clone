import { createSlice } from "@reduxjs/toolkit";
import { deleteCookie, getCookie, hasCookie, setCookie } from "cookies-next";
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
      state.user = action.payload.user;
      setCookie('user_data', action.payload.user, {maxAge : 10000 , sameSite : 'lax'});
      setCookie('access_token', action.payload.access_token, {maxAge : 10000 , sameSite : 'lax'});
    },
    logout: (state) => {
      state.user = null;
      deleteCookie('user_data');
      deleteCookie('access_token');
    },
  },
});

export const { login, logout } = userSlice.actions;

export const selectUser = (state : any) => state.user.user;

export default userSlice.reducer;