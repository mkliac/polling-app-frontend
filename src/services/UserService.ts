import { postApi } from "../utils/api";

const USER_URI = "/users";
class UserService {
    saveUser() {
        return postApi(USER_URI);
    }
}