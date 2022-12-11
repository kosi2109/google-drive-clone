import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: {
        name : "Si Thu Htet"
    },
  },
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
    },
    logout: (state, action) => {
      state.user = {
        name : ''
      };
    },
  },
});

export const { login, logout } = userSlice.actions;

export const selectUser = (state : any) => state.user.user;

export default userSlice.reducer;