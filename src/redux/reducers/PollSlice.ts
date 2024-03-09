import { createSlice } from "@reduxjs/toolkit"
import { RootState } from "."
import { Poll } from "../../models/PollModels"
import { addPollItems, closePoll, deletePoll, deletePollItems, getPoll, getPolls, savePoll, updatePollItem, vote } from "../../services/PollService"
import { APIStatus, APIStatusType } from "../../types/ApiStatusType"

type PollState = {
    polls: Poll[]
    poll: Poll
    status: APIStatusType
    submitStatus: APIStatusType
    error: string | null
}

const initialState: PollState = {
    polls: [],
    poll: null,
    status: APIStatus.IDLE,
    submitStatus: APIStatus.IDLE,
    error: null
}

export const pollDataSlice = createSlice({
    name: "pollData",
    initialState,
    reducers: {
       resetSubmitStatus: (state) => {
                console.log("resetSubmitStatus")
              state.submitStatus = APIStatus.IDLE
         } 
    },

    extraReducers: (builder) => {
        builder.addCase(getPoll.pending, (state) => {
            state.status = APIStatus.LOADING
            state.error = null
        })

        builder.addCase(getPoll.fulfilled, (state, { payload }) => {
            state.status = APIStatus.SUCCESS
            state.poll = {...payload}
        })

        builder.addCase(getPoll.rejected, (state, { payload }) => {
            state.status = APIStatus.ERROR
            state.error = payload.message
        })

        builder.addCase(getPolls.pending, (state) => {
            state.status = APIStatus.LOADING
            state.error = null
        })

        builder.addCase(getPolls.fulfilled, (state, { payload }) => {
            state.status = APIStatus.SUCCESS
            state.polls = [...payload]
        })

        builder.addCase(getPolls.rejected, (state, { payload }) => {
            state.status = APIStatus.ERROR
            state.error = payload.message
        })

        builder.addCase(savePoll.pending, (state) => {
            state.submitStatus = APIStatus.LOADING
            state.error = null
        })

        builder.addCase(savePoll.fulfilled, (state, { payload }) => {
            state.submitStatus = APIStatus.SUCCESS
            state.poll = {...payload}
        })

        builder.addCase(savePoll.rejected, (state, { payload }) => {
            state.submitStatus = APIStatus.ERROR
            state.error = payload.message
        })

        builder.addCase(deletePoll.pending, (state) => {
            state.status = APIStatus.LOADING
            state.error = null
        })

        builder.addCase(deletePoll.fulfilled, (state) => {
            state.status = APIStatus.SUCCESS
        })

        builder.addCase(deletePoll.rejected, (state, { payload }) => {
            state.status = APIStatus.ERROR
            state.error = payload.message
        })

        builder.addCase(addPollItems.pending, (state) => {
            state.status = APIStatus.LOADING
            state.error = null
        })

        builder.addCase(addPollItems.fulfilled, (state, { payload }) => {
            state.status = APIStatus.SUCCESS
            state.poll = {...payload}
        })

        builder.addCase(addPollItems.rejected, (state, { payload }) => {
            state.status = APIStatus.ERROR
            state.error = payload.message
        })

        builder.addCase(deletePollItems.pending, (state) => {
            state.status = APIStatus.LOADING
            state.error = null
        })

        builder.addCase(deletePollItems.fulfilled, (state, { payload }) => {
            state.status = APIStatus.SUCCESS
            state.poll = {...payload}
        })

        builder.addCase(deletePollItems.rejected, (state, { payload }) => {
            state.status = APIStatus.ERROR
            state.error = payload.message
        })

        builder.addCase(updatePollItem.pending, (state) => {
            state.status = APIStatus.LOADING
            state.error = null
        })

        builder.addCase(updatePollItem.fulfilled, (state, { payload }) => {
            state.status = APIStatus.SUCCESS
            state.poll = {...payload}
        })

        builder.addCase(updatePollItem.rejected, (state, { payload }) => {
            state.status = APIStatus.ERROR
            state.error = payload.message
        })

        builder.addCase(vote.pending, (state) => {
            state.status = APIStatus.LOADING
            state.error = null
        })

        builder.addCase(vote.fulfilled, (state, { payload }) => {
            state.status = APIStatus.SUCCESS
            state.poll = {...payload}
        })

        builder.addCase(vote.rejected, (state, { payload }) => {
            state.status = APIStatus.ERROR
            state.error = payload.message
        })

        builder.addCase(closePoll.pending, (state) => {
            state.status = APIStatus.LOADING
            state.error = null
        })

        builder.addCase(closePoll.fulfilled, (state, { payload }) => {
            state.status = APIStatus.SUCCESS
            state.poll = {...payload}
        })

        builder.addCase(closePoll.rejected, (state, { payload }) => {
            state.status = APIStatus.ERROR
            state.error = payload.message
        })
    }
})

export const selectPolls = (state: RootState) => state.poll.polls
export const selectPoll = (state: RootState) => state.poll.poll
export const selectPollStatus = (state: RootState) => state.poll.status
export const selectSubmitStatus = (state: RootState) => state.poll.submitStatus
export const selectPollError = (state: RootState) => state.poll.error
export const { resetSubmitStatus} = pollDataSlice.actions
export default pollDataSlice.reducer