import { createSlice } from "@reduxjs/toolkit";
import { RootState } from ".";
import { AppConfig } from "../../models/AppConfigModels";
import { cacheAppConfig } from "../../services/AppConfigService";

interface ConfigState {
  appConfig: AppConfig;
  isSideBarExtended: boolean;
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
};

export const configSlice = createSlice({
  name: "config",
  initialState,
  reducers: {
    toggleSideBar: (state) => {
      state.isSideBarExtended = !state.isSideBarExtended;
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

export const { toggleSideBar } = configSlice.actions;
export const selectAppConfig = (state: RootState) => state.config.appConfig;
export const selectSideBar = (state: RootState) =>
  state.config.isSideBarExtended;
export default configSlice.reducer;
