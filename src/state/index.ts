import { createSlice } from "@reduxjs/toolkit";
import { User } from "../models/UserModel";

interface GlobalState {
  mode: "light" | "dark";
  user: User | null;
  isLoggedIn: boolean;
}

const initialState: GlobalState = {
  mode: "light",
  user: null,
  isLoggedIn: false,
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
  },
});

export const { setMode, setLogin, setLogout } = authSlice.actions;
export default authSlice.reducer;
