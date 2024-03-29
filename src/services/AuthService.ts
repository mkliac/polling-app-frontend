import { getApiWithoutAuth, postApiWithoutAuth } from "../utils/api";

const AUTH_URI = "/auth";
export const getTokens = async (code: string, redirectUri: string) => {
  let tokens = null;
  try {
    tokens = await postApiWithoutAuth(AUTH_URI, null, { code, redirectUri });
  } catch (error) {
    throw error;
  }

  return tokens;
};

export const getNewAccessToken = async (refreshToken: string) => {
  let tokens = null;
  try {
    tokens = await getApiWithoutAuth(AUTH_URI + "/refresh-token", {
      refreshToken,
    });
  } catch (error) {
    throw error;
  }

  return tokens;
};

export const logout = async (refreshToken: string) => {
  try {
    await postApiWithoutAuth(AUTH_URI + "/revoke-token", null, {
      refreshToken,
    });
  } catch (error) {
    throw error;
  }
};
