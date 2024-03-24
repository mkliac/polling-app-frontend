import { createSlice } from "@reduxjs/toolkit";
import { RootState } from ".";
import { Poll } from "../../models/PollModels";
import {
  addPollItems,
  closePoll,
  deletePoll,
  deletePollItems,
  getPoll,
  getPolls,
  getVoters,
  savePoll,
  updatePollItem,
  vote,
} from "../../services/PollService";
import { APIStatus, APIStatusType } from "../../types/ApiStatusType";

type PollState = {
  poll: Poll;
  getPollsStatus: APIStatusType;
  submitStatus: APIStatusType;
  error: string | null;
};

const initialState: PollState = {
  poll: null,
  getPollsStatus: APIStatus.IDLE,
  submitStatus: APIStatus.IDLE,
  error: null,
};

export const pollDataSlice = createSlice({
  name: "poll",
  initialState,
  reducers: {
    resetSubmitStatus: (state) => {
      state.submitStatus = APIStatus.IDLE;
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

    builder.addCase(deletePoll.pending, (state) => {});

    builder.addCase(deletePoll.fulfilled, (state) => {});

    builder.addCase(deletePoll.rejected, (state, { payload }) => {});

    builder.addCase(addPollItems.pending, (state) => {});

    builder.addCase(addPollItems.fulfilled, (state, { payload }) => {
      state.poll = { ...payload };
    });

    builder.addCase(addPollItems.rejected, (state, { payload }) => {});

    builder.addCase(deletePollItems.pending, (state) => {});

    builder.addCase(deletePollItems.fulfilled, (state, { payload }) => {
      state.poll = { ...payload };
    });

    builder.addCase(deletePollItems.rejected, (state, { payload }) => {});

    builder.addCase(updatePollItem.pending, (state) => {});

    builder.addCase(updatePollItem.fulfilled, (state, { payload }) => {});

    builder.addCase(updatePollItem.rejected, (state, { payload }) => {});

    builder.addCase(vote.pending, (state) => {});

    builder.addCase(vote.fulfilled, (state, { payload }) => {});

    builder.addCase(vote.rejected, (state, { payload }) => {});

    builder.addCase(closePoll.pending, (state) => {});

    builder.addCase(closePoll.fulfilled, (state, { payload }) => {});

    builder.addCase(closePoll.rejected, (state, { payload }) => {});

    builder.addCase(getVoters.pending, (state) => {});

    builder.addCase(getVoters.fulfilled, (state, { payload }) => {});

    builder.addCase(getVoters.rejected, (state, { payload }) => {});
  },
});

export const selectPoll = (state: RootState) => state.poll.poll;
export const selectPollStatus = (state: RootState) => state.poll.getPollsStatus;
export const selectSubmitStatus = (state: RootState) => state.poll.submitStatus;
export const selectPollError = (state: RootState) => state.poll.error;
export const { resetSubmitStatus } = pollDataSlice.actions;
export default pollDataSlice.reducer;
