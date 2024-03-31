import { getApi } from "../utils/api";

const USER_URI = "/users";

export const getUser = () => {
  return getApi(USER_URI);
};
