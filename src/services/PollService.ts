import { AddPollItemsRequest, DeletePollItemsRequest, SavePollRequest } from "../models/PollModels";
import { deleteApi, getApi, postApi, putApi } from "../utils/api";

const POLL_URI = "/polls";
class PollService {
    getPoll(id: string) {
        return getApi(POLL_URI + `/${id}`);
    }

    getPolls() {
        return getApi(POLL_URI);
    }

    savePoll(reqBody: SavePollRequest) {
        return postApi(POLL_URI, reqBody);
    }

    deletePoll(id: string) {
        return deleteApi(POLL_URI + `/${id}`);
    }

    addPollItems(id: string, reqBody: AddPollItemsRequest) {
        return postApi(POLL_URI + `/${id}/items`, reqBody);
    }

    deletePollItems(id: string, reqBody: DeletePollItemsRequest) {
        return deleteApi(POLL_URI + `/${id}/items`, reqBody);
    }

    updatePollItem(id: string, itemId: string, text: string) {
        return postApi(POLL_URI + `/${id}/items/${itemId}`, null, {text});
    }

    vote(id: string, itemId: string) {
        return postApi(POLL_URI + `/${id}/items/${itemId}/vote`);
    }
}

export default new PollService();