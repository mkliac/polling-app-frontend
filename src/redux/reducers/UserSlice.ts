import { createSlice } from "@reduxjs/toolkit";
import { RootState } from ".";
import {
    followUser,
    getFollowers,
    getFollowing,
    getUserInfo,
    unFollowUser,
} from "../../services/UserService";
import { APIStatus, APIStatusType } from "../../types/ApiStatusType";

type UserState = {
  getUserInfoStatus: APIStatusType;
  getFollowersStatus: APIStatusType;
  getFollowingStatus: APIStatusType;
  followUserStatus: APIStatusType;
  unfollowUserStatus: APIStatusType;
};

const initialState: UserState = {
  getUserInfoStatus: APIStatus.IDLE,
  getFollowersStatus: APIStatus.IDLE,
  getFollowingStatus: APIStatus.IDLE,
  followUserStatus: APIStatus.IDLE,
  unfollowUserStatus: APIStatus.IDLE,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    resetGetUserInfoStatus: (state) => {
      state.getUserInfoStatus = APIStatus.IDLE;
    },
    resetGetFollowersStatus: (state) => {
      state.getFollowersStatus = APIStatus.IDLE;
    },
    resetGetFollowingStatus: (state) => {
      state.getFollowingStatus = APIStatus.IDLE;
    },
    resetPostFollowStatus: (state) => {
      state.followUserStatus = APIStatus.IDLE;
    },
    resetPostUnfollowStatus: (state) => {
      state.unfollowUserStatus = APIStatus.IDLE;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(getUserInfo.pending, (state) => {
      state.getUserInfoStatus = APIStatus.LOADING;
    });

    builder.addCase(getUserInfo.fulfilled, (state) => {
      state.getUserInfoStatus = APIStatus.SUCCESS;
    });

    builder.addCase(getUserInfo.rejected, (state) => {
      state.getUserInfoStatus = APIStatus.ERROR;
    });

    builder.addCase(getFollowers.pending, (state) => {
      state.getFollowersStatus = APIStatus.LOADING;
    });

    builder.addCase(getFollowers.fulfilled, (state) => {
      state.getFollowersStatus = APIStatus.SUCCESS;
    });

    builder.addCase(getFollowers.rejected, (state) => {
      state.getFollowersStatus = APIStatus.ERROR;
    });

    builder.addCase(getFollowing.pending, (state) => {
      state.getFollowingStatus = APIStatus.LOADING;
    });

    builder.addCase(getFollowing.fulfilled, (state) => {
      state.getFollowingStatus = APIStatus.SUCCESS;
    });

    builder.addCase(getFollowing.rejected, (state) => {
      state.getFollowingStatus = APIStatus.ERROR;
    });

    builder.addCase(followUser.pending, (state) => {
      state.followUserStatus = APIStatus.LOADING;
    });

    builder.addCase(followUser.fulfilled, (state) => {
      state.followUserStatus = APIStatus.SUCCESS;
    });

    builder.addCase(followUser.rejected, (state) => {
      state.followUserStatus = APIStatus.ERROR;
    });

    builder.addCase(unFollowUser.pending, (state) => {
      state.unfollowUserStatus = APIStatus.LOADING;
    });

    builder.addCase(unFollowUser.fulfilled, (state) => {
      state.unfollowUserStatus = APIStatus.SUCCESS;
    });

    builder.addCase(unFollowUser.rejected, (state) => {
      state.unfollowUserStatus = APIStatus.ERROR;
    });
  },
});

export const {
  resetGetUserInfoStatus,
  resetGetFollowersStatus,
  resetGetFollowingStatus,
  resetPostFollowStatus,
  resetPostUnfollowStatus,
} = userSlice.actions;
export const selectGetUserInfoStatus = (state: RootState) =>
  state.user.getUserInfoStatus;
export const selectGetFollowersStatus = (state: RootState) =>
  state.user.getFollowersStatus;
export const selectGetFollowingStatus = (state: RootState) =>
  state.user.getFollowingStatus;
export const selectFollowUserStatus = (state: RootState) =>
  state.user.followUserStatus;
export const selectUnfollowUserStatus = (state: RootState) =>
  state.user.unfollowUserStatus;
export default userSlice.reducer;
