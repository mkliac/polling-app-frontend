const ACCESS_TOKEN_KEY = "access_token";
const REFRESH_TOKEN_KEY = "refresh_token";

class TokenService {
  saveAccessToken(token: string) {
    sessionStorage.setItem(ACCESS_TOKEN_KEY, token);
  }

  getAccessToken() {
    return sessionStorage.getItem(ACCESS_TOKEN_KEY);
  }

  saveRefreshToken(token: string) {
    localStorage.setItem(REFRESH_TOKEN_KEY, token);
  }

  getRefreshToken() {
    return localStorage.getItem(REFRESH_TOKEN_KEY);
  }
}

export default new TokenService();
