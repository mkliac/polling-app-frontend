import { createAsyncThunk } from "@reduxjs/toolkit";
import { GetUsersRequest, User } from "../models/UserModel";
import { RequestError } from "../types/ApiStatusType";
import { getApi, postApi } from "../utils/api";

const USER_URI = "/users";

export const getUser = () => {
  return getApi(USER_URI);
};

export const getUserInfo = createAsyncThunk<
  User,
  string,
  { rejectValue: RequestError }
>("users/getUserInfo", async (userId: string, thunkAPI) => {
  let data: User = null;
  try {
    const user = await getApi(USER_URI + `/${userId}`);
    data = {
      ...user,
    };
  } catch (error) {
    return thunkAPI.rejectWithValue({
      message: error.response.data.message,
    });
  }

  return data;
});

export const getFollowers = createAsyncThunk<
  User[],
  GetUsersRequest,
  { rejectValue: RequestError }
>("users/getFollowers", async (request: GetUsersRequest, thunkAPI) => {
  let data: User[] = [];
  try {
    const followers = await getApi(
      USER_URI + `/${request.userId}/followers`,
      request
    );
    data = followers.map((follower: User) => {
      return {
        ...follower,
      };
    });
  } catch (error) {
    return thunkAPI.rejectWithValue({ message: error.response.data.message });
  }

  return data;
});

export const getFollowing = createAsyncThunk<
  User[],
  GetUsersRequest,
  { rejectValue: RequestError }
>("users/getFollowing", async (request: GetUsersRequest, thunkAPI) => {
  let data: User[] = [];
  try {
    const following = await getApi(
      USER_URI + `/${request.userId}/following`,
      request
    );
    data = following.map((follow: User) => {
      return {
        ...follow,
      };
    });
  } catch (error) {
    return thunkAPI.rejectWithValue({ message: error.response.data.message });
  }

  return data;
});

export const followUser = createAsyncThunk<
  User,
  string,
  { rejectValue: RequestError }
>("users/followUser", async (userId: string, thunkAPI) => {
  let data: User = null;
  try {
    const user = await postApi(USER_URI + `/follow/${userId}`);
    data = {
      ...user,
    };
  } catch (error) {
    return thunkAPI.rejectWithValue({ message: error.response.data.message });
  }

  return data;
});

export const unFollowUser = createAsyncThunk<
  User,
  string,
  { rejectValue: RequestError }
>("users/unFollowUser", async (userId: string, thunkAPI) => {
  let data: User = null;
  try {
    const user = await postApi(USER_URI + `/unfollow/${userId}`);
    data = {
      ...user,
    };
  } catch (error) {
    return thunkAPI.rejectWithValue({ message: error.response.data.message });
  }

  return data;
});
