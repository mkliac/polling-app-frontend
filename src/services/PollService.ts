import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  AddPollItemsRequest,
  DeletePollItemsRequest,
  Poll,
  PollFitlerType,
  SavePollRequest,
} from "../models/PollModels";
import { User } from "../models/UserModel";
import { RequestError } from "../types/ApiStatusType";
import { deleteApi, getApi, postApi } from "../utils/api";

interface PageModel {
  pageNumber?: number;
  pageSize?: number;
  sortBy?: string;
  isAscending?: boolean;
  filterType?: PollFitlerType;
  search?: string;
}

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
  PageModel,
  { rejectValue: RequestError }
>("polls/getPolls", async (page: PageModel, thunkAPI) => {
  let data: Poll[] = [];
  try {
    const polls = await getApi(POLL_URI, page);
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

export const addPollItems = createAsyncThunk<
  Poll,
  { id: string; reqBody: AddPollItemsRequest },
  { rejectValue: RequestError }
>("polls/addPollItems", async ({ id, reqBody }, thunkAPI) => {
  let data: Poll = null;
  try {
    const poll = await postApi(POLL_URI + `/${id}/items`, reqBody);
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

export const deletePollItems = createAsyncThunk<
  Poll,
  { id: string; reqBody: DeletePollItemsRequest },
  { rejectValue: RequestError }
>("polls/deletePollItems", async ({ id, reqBody }, thunkAPI) => {
  let data: Poll = null;
  try {
    const poll = await deleteApi(POLL_URI + `/${id}/items`, reqBody);
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

export const updatePollItem = createAsyncThunk<
  Poll,
  { id: string; itemId: string; text: string },
  { rejectValue: RequestError }
>("polls/updatePollItem", async ({ id, itemId, text }, thunkAPI) => {
  let data: Poll = null;
  try {
    const poll = await postApi(POLL_URI + `/${id}/items/${itemId}`, null, {
      text,
    });
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
  string,
  { rejectValue: RequestError }
>("polls/getVoters", async (itemId: string, thunkAPI) => {
  let data: User[] = [];
  try {
    const voters = await getApi(POLL_URI + `/items/${itemId}/voters`);
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
