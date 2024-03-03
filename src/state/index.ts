import { createSlice } from "@reduxjs/toolkit";
import { User } from "../models/UserModel";

interface GlobalState {
  mode: "light" | "dark";
  user: User | null;
  isLoggedIn: boolean;
  isSideBarExtend: boolean;
}

const initialState: GlobalState = {
  mode: "light",
  user: null,
  isLoggedIn: false,
  isSideBarExtend: true,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.isLoggedIn = true;
    },
    setLogout: (state) => {
      state.user = null;
      state.isLoggedIn = false;
    },
    toggleSideBar: (state) => {
      state.isSideBarExtend = !state.isSideBarExtend;
    },
  },
});

export const { setMode, setLogin, setLogout, toggleSideBar} = authSlice.actions;
export default authSlice.reducer;
