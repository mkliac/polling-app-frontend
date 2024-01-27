import { getApi } from "../utils/api";

const POLL_URI = "/polls";
class PollService {
    getPoll(id: number) {
        return getApi(POLL_URI + `/${id}`);
    }

    getPolls() {
        return getApi(POLL_URI);
    }
}

export default new PollService();