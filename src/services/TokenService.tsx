const TOKEN_KEY = "access_token";
class TokenService {
    saveToken(token: string) {
        sessionStorage.setItem(TOKEN_KEY, token);
    }
    getToken() {
        return sessionStorage.getItem(TOKEN_KEY);
    }
}

export default new TokenService();