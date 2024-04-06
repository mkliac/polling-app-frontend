import { createSlice } from "@reduxjs/toolkit";
import { RootState } from ".";
import { AppConfig } from "../../models/AppConfigModels";
import { cacheAppConfig } from "../../services/AppConfigService";

interface ConfigState {
  appConfig: AppConfig;
  isSideBarExtended: boolean;
  isFollowDrawerOpen: boolean;
  isShownFollower: boolean;
}

const initialState: ConfigState = {
  appConfig: {
    pollConfig: {
      maxPollItems: 0,
      maxDescriptionLength: 0,
      minTitleLength: 0,
      maxTitleLength: 0,
      maxItemTextLength: 0,
    },
  },
  isSideBarExtended: false,
  isFollowDrawerOpen: false,
  isShownFollower: false,
};

export const configSlice = createSlice({
  name: "config",
  initialState,
  reducers: {
    toggleSideBar: (state) => {
      state.isSideBarExtended = !state.isSideBarExtended;
    },
    setSideBar: (state, action) => {
      state.isSideBarExtended = action.payload;
    },
    toggleFollowDrawer: (state) => {
      state.isFollowDrawerOpen = !state.isFollowDrawerOpen;
    },
    setFollowDrawer: (state, action) => {
      state.isFollowDrawerOpen = action.payload;
    },
    setIsShownFollower: (state, action) => {
      state.isShownFollower = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(cacheAppConfig.fulfilled, (state, { payload }) => {
      state.appConfig = payload;
    });
    builder.addCase(cacheAppConfig.rejected, (state, { payload }) => {
      console.log(payload.message);
    });
  },
});

export const {
  toggleSideBar,
  setSideBar,
  toggleFollowDrawer,
  setFollowDrawer,
  setIsShownFollower,
} = configSlice.actions;
export const selectAppConfig = (state: RootState) => state.config.appConfig;
export const selectSideBar = (state: RootState) =>
  state.config.isSideBarExtended;
export const selectFollowDrawer = (state: RootState) =>
  state.config.isFollowDrawerOpen;
export const selectIsShownFollower = (state: RootState) =>
  state.config.isShownFollower;
export default configSlice.reducer;
