import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./AuthSlice";
import pollDataReducer from "./PollSlice";
import configReducer from "./ConfigSlice";

export const rootReducer = combineReducers({
    auth: authReducer,
    poll: pollDataReducer,
    config: configReducer
});

export type RootState = ReturnType<typeof rootReducer>;