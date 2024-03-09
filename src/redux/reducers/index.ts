import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./AuthSlice";
import pollDataReducer from "./PollSlice";

export const rootReducer = combineReducers({
    auth: authReducer,
    poll: pollDataReducer
});

export type RootState = ReturnType<typeof rootReducer>;