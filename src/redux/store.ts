import { configureStore } from "@reduxjs/toolkit";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
  persistStore,
} from "redux-persist";
import storageSession from "redux-persist/lib/storage/session";
import { rootReducer } from "./reducers";
import { pollDataSlice } from "./reducers/PollSlice";
import { userSlice } from "./reducers/UserSlice";

export const persistConfig = {
  key: "root",
  storage: storageSession,
  version: 1,
};
const persistedReducer = persistReducer(
  { ...persistConfig, blacklist: [pollDataSlice.name, userSlice.name] },
  rootReducer
);
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export type AppDispatch = typeof store.dispatch;
export const persistor = persistStore(store);
