import { createAsyncThunk } from "@reduxjs/toolkit";
import { AppConfig } from "../models/AppConfigModels";
import { RequestError } from "../types/ApiStatusType";
import { getApi } from "../utils/api";

const APP_CONFIG_URI = "/app-config";
export const cacheAppConfig = createAsyncThunk<
  AppConfig,
  void,
  { rejectValue: RequestError }
>("appConfig/cacheAppConfig", async (_, thunkAPI) => {
  let data: AppConfig = null;
  try {
    const appConfig = await getApi(APP_CONFIG_URI);
    data = {
      ...appConfig,
    };
  } catch (error) {
    return thunkAPI.rejectWithValue({
      message: "Failed to fetch app config",
    });
  }

  return data;
});
