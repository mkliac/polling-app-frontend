import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  BookmarkRequest,
  GetPollsRequest,
  GetVotersRequest,
  Poll,
  PollFilter,
  SavePollRequest,
  UpdatePollRequest,
} from "../models/PollModels";
import { User } from "../models/UserModel";
import { RequestError } from "../types/ApiStatusType";
import { deleteApi, getApi, postApi } from "../utils/api";

const POLL_URI = "/polls";
export const getPoll = createAsyncThunk<
  Poll,
  string,
  { rejectValue: RequestError }
>("polls/getPoll", async (id: string, thunkAPI) => {
  let data: Poll = null;
  try {
    const poll = await getApi(POLL_URI + `/${id}`);
    data = {
      ...poll,
    };
  } catch (error) {
    return thunkAPI.rejectWithValue({
      message: error.response.data.message,
    });
  }

  return data;
});

export const getPolls = createAsyncThunk<
  Poll[],
  GetPollsRequest,
  { rejectValue: RequestError }
>("polls/getPolls", async (request: GetPollsRequest, thunkAPI) => {
  let data: Poll[] = [];
  try {
    const uri =
      POLL_URI +
      (request.filterType === PollFilter.USER
        ? `/users/${request.userId}`
        : "");
    const polls = await getApi(uri, request);
    data = polls.map((poll: Poll) => {
      return {
        ...poll,
      };
    });
  } catch (error) {
    return thunkAPI.rejectWithValue({ message: error.response.data.message });
  }

  return data;
});

export const savePoll = createAsyncThunk<
  Poll,
  SavePollRequest,
  { rejectValue: RequestError }
>("polls/savePoll", async (reqBody: SavePollRequest, thunkAPI) => {
  let data: Poll = null;
  try {
    const poll = await postApi(POLL_URI, reqBody);
    data = {
      ...poll,
    };
  } catch (error) {
    console.log(error);
    return thunkAPI.rejectWithValue({ message: error.response.data.message });
  }

  return data;
});

export const updatePoll = createAsyncThunk<
  Poll,
  UpdatePollRequest,
  { rejectValue: RequestError }
>("polls/updatePoll", async (reqBody: UpdatePollRequest, thunkAPI) => {
  let data: Poll = null;
  try {
    const poll = await postApi(POLL_URI + `/${reqBody.id}`, reqBody);
    data = {
      ...poll,
    };
  } catch (error) {
    return thunkAPI.rejectWithValue({ message: error.response.data.message });
  }

  return data;
});

export const deletePoll = createAsyncThunk<
  void,
  string,
  { rejectValue: RequestError }
>("polls/deletePoll", async (id: string, thunkAPI) => {
  try {
    await deleteApi(POLL_URI + `/${id}`);
  } catch (error) {
    return thunkAPI.rejectWithValue({
      message: error.response.data.message,
    });
  }
});

export const vote = createAsyncThunk<
  Poll,
  { id: string; itemId: string },
  { rejectValue: RequestError }
>("polls/vote", async ({ id, itemId }, thunkAPI) => {
  let data: Poll = null;
  try {
    const poll = await postApi(POLL_URI + `/${id}/items/${itemId}/vote`);
    data = {
      ...poll,
    };
  } catch (error) {
    return thunkAPI.rejectWithValue({ message: error.response.data.message });
  }

  return data;
});

export const closePoll = createAsyncThunk<
  Poll,
  string,
  { rejectValue: RequestError }
>("polls/closePoll", async (id: string, thunkAPI) => {
  let data: Poll = null;
  try {
    const poll = await postApi(POLL_URI + `/${id}/close`);
    data = {
      ...poll,
    };
  } catch (error) {
    return thunkAPI.rejectWithValue({
      message: error.response.data.message,
    });
  }

  return data;
});

export const getVoters = createAsyncThunk<
  User[],
  GetVotersRequest,
  { rejectValue: RequestError }
>("polls/getVoters", async (request: GetVotersRequest, thunkAPI) => {
  let data: User[] = [];
  try {
    const voters = await getApi(
      POLL_URI + `/${request.pollId}/items/${request.itemId}/voters`,
      request
    );
    data = voters.map((voter: User) => {
      return {
        ...voter,
      };
    });
  } catch (error) {
    return thunkAPI.rejectWithValue({
      message: error.response.data.message,
    });
  }

  return data;
});

export const bookmark = createAsyncThunk<
  void,
  BookmarkRequest,
  { rejectValue: RequestError }
>("polls/bookmark", async (request: BookmarkRequest, thunkAPI) => {
  try {
    await postApi(POLL_URI + `/${request.pollId}/bookmark`, null, request);
  } catch (error) {
    return thunkAPI.rejectWithValue({
      message: error.response.data.message,
    });
  }
});
