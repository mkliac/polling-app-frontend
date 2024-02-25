import { GoogleOAuthProvider } from "@react-oauth/google";
import { configureStore } from "@reduxjs/toolkit";
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";
import persistReducer from "redux-persist/es/persistReducer";
import persistStore from "redux-persist/es/persistStore";
import sessionStorage from "redux-persist/es/storage/session";
import { PersistGate } from "redux-persist/integration/react";
import App from "./App";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import authReducer from "./state";

const persistConfig = { key: "root", storage: sessionStorage, version: 1 };
const persistedReducer = persistReducer(persistConfig, authReducer);
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="644055749143-bs1eame2dme1otikcqcrq5jidhmauidt.apps.googleusercontent.com">
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistStore(store)}>
          <App />
        </PersistGate>
      </Provider>
    </GoogleOAuthProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
