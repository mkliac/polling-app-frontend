import { getApi } from "../utils/api";

const USER_URI = "/users";
class UserService {
  getUser() {
    return getApi(USER_URI);
  }
}

export default new UserService();
