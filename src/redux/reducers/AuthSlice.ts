import { createSlice } from "@reduxjs/toolkit";
import { User } from "../../models/UserModel";

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
      localStorage.removeItem("refresh_token");
      state.user = null;
      state.isLoggedIn = false;
    },
  },
});

export const { setMode, setLogin, setLogout } = authSlice.actions;
export const selectIsLoggedIn = (state: { auth: GlobalState }) =>
  state.auth.isLoggedIn;
export const selectUser = (state: { auth: GlobalState }) => state.auth.user;
export const selectMode = (state: { auth: GlobalState }) => state.auth.mode;
export default authSlice.reducer;
