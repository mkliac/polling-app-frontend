import { Box, Button, Card, CardContent, Typography } from "@mui/material";
import { useGoogleLogin } from "@react-oauth/google";
import { useEffect } from "react";
import { Navigate, useSearchParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import {
  selectIsLoggedIn,
  setLogin,
  setLogout,
} from "../redux/reducers/AuthSlice";
import { cacheAppConfig } from "../services/AppConfigService";
import { getNewAccessToken, getTokens } from "../services/AuthService";
import TokenService from "../services/TokenService";
import UserService from "../services/UserService";

const LoginForm = () => {
  const [searchParams] = useSearchParams();
  const code = searchParams.get("code");
  const redirectUri = window.location.href.split("?")[0].slice(0, -1);
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isLoggedIn) return;

    let refreshToken = TokenService.getRefreshToken();
    if (!refreshToken) return;

    getNewAccessToken(refreshToken)
      .then((res) => {
        onLoginSuccess(res);
      })
      .catch(() => {
        dispatch(setLogout());
      });
  }, []);

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => console.log(codeResponse),
    onError: (error) => console.log(error),
    flow: "auth-code",
    scope: "openid profile email",
    ux_mode: "redirect",
    redirect_uri: redirectUri,
  });

  useEffect(() => {
    exchangeAuthCode();
  }, [code]);

  const exchangeAuthCode = async () => {
    if (code) {
      try {
        const response = await getTokens(code, redirectUri);
        onLoginSuccess(response);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const onLoginSuccess = (response) => {
    if (response.refreshToken)
      TokenService.saveRefreshToken(response.refreshToken);
    TokenService.saveAccessToken(response.idToken);
    UserService.getUser().then((data) => dispatch(setLogin({ user: data })));
    dispatch(cacheAppConfig());
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      {" "}
      <Card>
        <CardContent>
          <Typography textAlign={"left"} component="h1" fontSize={24}>
            <b>Welcome!</b>
          </Typography>
          <Typography textAlign={"left"}>Sign in to continue.</Typography>
          {!isLoggedIn ? (
            <Button onClick={login}>Login with Google</Button>
          ) : (
            <Navigate to={sessionStorage.getItem("redirect") || "/home"} />
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default LoginForm;
