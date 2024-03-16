import { createSlice } from "@reduxjs/toolkit";
import { AppConfig, PollConfig } from "../../models/AppConfigModels";
import { cacheAppConfig } from "../../services/AppConfigService";
import { RootState } from ".";

interface ConfigState {
    appConfig: AppConfig
}

const initialState: ConfigState = {
    appConfig: {
        pollConfig: {
            maxPollItems: 0,
            maxDescriptionLength: 0,
            minTitleLength: 0,
            maxTitleLength: 0,
            maxItemTextLength: 0,
        }
    }
}

export const configSlice = createSlice({
    name: "config",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(cacheAppConfig.fulfilled, (state, { payload }) => {
            state.appConfig = payload;
        });
        builder.addCase(cacheAppConfig.rejected, (state, { payload }) => {
            console.log(payload.message);
        });
    }
})

export const selectAppConfig = (state: RootState ) => state.config.appConfig;
export default configSlice.reducer;