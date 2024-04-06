import { createSlice } from "@reduxjs/toolkit";
import { RootState } from ".";
import { User } from "../../models/UserModel";
import {
    followUser,
    getFollowers,
    getFollowing,
    getUserInfo,
    unFollowUser,
} from "../../services/UserService";
import { APIStatus, APIStatusType } from "../../types/ApiStatusType";

type UserState = {
  currentUserInfo: User;
  getUserInfoStatus: APIStatusType;
  getFollowersStatus: APIStatusType;
  getFollowingStatus: APIStatusType;
  followUserStatus: APIStatusType;
  unfollowUserStatus: APIStatusType;
};

const initialState: UserState = {
  currentUserInfo: null,
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
    setCurrentUserFollowerCount(state, action) {
      state.currentUserInfo.followerCount = action.payload;
    },
    increaseCurrentUserFollowerCount(state) {
      state.currentUserInfo.followerCount++;
    },
    decreaseCurrentUserFollowerCount(state) {
      state.currentUserInfo.followerCount--;
    },
    setCurrentUserFollowingCount(state, action) {
      state.currentUserInfo.followingCount = action.payload;
    },
    increaseCurrentUserFollowingCount(state) {
      state.currentUserInfo.followingCount++;
    },
    decreaseCurrentUserFollowingCount(state) {
      state.currentUserInfo.followingCount--;
    },
    setCurrentUserPollCount(state, action) {
      state.currentUserInfo.pollCount = action.payload;
    },
    toggleFollowing(state) {
      state.currentUserInfo.following = !state.currentUserInfo.following;
    },
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

    builder.addCase(getUserInfo.fulfilled, (state, { payload }) => {
      state.getUserInfoStatus = APIStatus.SUCCESS;
      state.currentUserInfo = { ...payload };
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
  setCurrentUserFollowerCount,
  increaseCurrentUserFollowerCount,
  decreaseCurrentUserFollowerCount,
  setCurrentUserFollowingCount,
  increaseCurrentUserFollowingCount,
  decreaseCurrentUserFollowingCount,
  setCurrentUserPollCount,
  toggleFollowing,
  resetGetUserInfoStatus,
  resetGetFollowersStatus,
  resetGetFollowingStatus,
  resetPostFollowStatus,
  resetPostUnfollowStatus,
} = userSlice.actions;
export const selectCurrentUserInfo = (state: RootState) =>
  state.user.currentUserInfo;
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
