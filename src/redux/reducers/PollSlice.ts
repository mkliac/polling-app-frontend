import { createSlice } from "@reduxjs/toolkit";
import { RootState } from ".";
import { Poll } from "../../models/PollModels";
import {
  bookmark,
  closePoll,
  deletePoll,
  getPoll,
  getPolls,
  getVoters,
  savePoll,
  updatePoll,
  vote,
} from "../../services/PollService";
import { APIStatus, APIStatusType } from "../../types/ApiStatusType";

type PollState = {
  poll: Poll;
  getPollsStatus: APIStatusType;
  submitStatus: APIStatusType;
  updateStatus: APIStatusType;
  error: string | null;
};

const initialState: PollState = {
  poll: null,
  getPollsStatus: APIStatus.IDLE,
  submitStatus: APIStatus.IDLE,
  updateStatus: APIStatus.IDLE,
  error: null,
};

export const pollDataSlice = createSlice({
  name: "poll",
  initialState,
  reducers: {
    resetSubmitStatus: (state) => {
      state.submitStatus = APIStatus.IDLE;
    },
    resetUpdateStatus: (state) => {
      state.updateStatus = APIStatus.IDLE;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(getPoll.pending, (state) => {});

    builder.addCase(getPoll.fulfilled, (state, { payload }) => {
      state.poll = { ...payload };
    });

    builder.addCase(getPoll.rejected, (state, { payload }) => {});

    builder.addCase(getPolls.pending, (state) => {
      state.getPollsStatus = APIStatus.LOADING;
      state.error = null;
    });

    builder.addCase(getPolls.fulfilled, (state, { payload }) => {
      state.getPollsStatus = APIStatus.SUCCESS;
    });

    builder.addCase(getPolls.rejected, (state, { payload }) => {
      state.getPollsStatus = APIStatus.ERROR;
      state.error = payload.message;
    });

    builder.addCase(savePoll.pending, (state) => {
      state.submitStatus = APIStatus.LOADING;
      state.error = null;
    });

    builder.addCase(savePoll.fulfilled, (state, { payload }) => {
      state.submitStatus = APIStatus.SUCCESS;
      state.poll = { ...payload };
    });

    builder.addCase(savePoll.rejected, (state, { payload }) => {
      state.submitStatus = APIStatus.ERROR;
      state.error = payload.message;
    });

    builder.addCase(updatePoll.pending, (state) => {
      state.updateStatus = APIStatus.LOADING;
      state.error = null;
    });

    builder.addCase(updatePoll.fulfilled, (state, { payload }) => {
      state.updateStatus = APIStatus.SUCCESS;
    });

    builder.addCase(updatePoll.rejected, (state, { payload }) => {
      state.updateStatus = APIStatus.ERROR;
      state.error = payload.message;
    });

    builder.addCase(deletePoll.pending, (state) => {});

    builder.addCase(deletePoll.fulfilled, (state) => {});

    builder.addCase(deletePoll.rejected, (state, { payload }) => {});

    builder.addCase(vote.pending, (state) => {});

    builder.addCase(vote.fulfilled, (state, { payload }) => {});

    builder.addCase(vote.rejected, (state, { payload }) => {});

    builder.addCase(closePoll.pending, (state) => {});

    builder.addCase(closePoll.fulfilled, (state, { payload }) => {});

    builder.addCase(closePoll.rejected, (state, { payload }) => {});

    builder.addCase(getVoters.pending, (state) => {});

    builder.addCase(getVoters.fulfilled, (state, { payload }) => {});

    builder.addCase(getVoters.rejected, (state, { payload }) => {});

    builder.addCase(bookmark.pending, (state) => {});

    builder.addCase(bookmark.fulfilled, (state, { payload }) => {});

    builder.addCase(bookmark.rejected, (state, { payload }) => {});
  },
});

export const selectPoll = (state: RootState) => state.poll.poll;
export const selectPollStatus = (state: RootState) => state.poll.getPollsStatus;
export const selectSubmitPollStatus = (state: RootState) =>
  state.poll.submitStatus;
export const selectUpdatePollStatus = (state: RootState) =>
  state.poll.updateStatus;
export const selectPollError = (state: RootState) => state.poll.error;
export const { resetSubmitStatus, resetUpdateStatus } = pollDataSlice.actions;
export default pollDataSlice.reducer;
