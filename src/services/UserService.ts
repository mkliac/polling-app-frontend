import { postApi } from "../utils/api";

const USER_URI = "/users";
class UserService {
  login() {
    return postApi(USER_URI);
  }
}

export default new UserService();
