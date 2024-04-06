import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./AuthSlice";
import configReducer from "./ConfigSlice";
import pollDataReducer from "./PollSlice";
import userReducer from "./UserSlice";

export const rootReducer = combineReducers({
  auth: authReducer,
  poll: pollDataReducer,
  config: configReducer,
  user: userReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
