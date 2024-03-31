import { Google } from "@mui/icons-material";
import { Box, Button, Card, CardContent, Typography } from "@mui/material";
import { useGoogleLogin } from "@react-oauth/google";
import { useEffect, useState } from "react";
import { Navigate, useSearchParams } from "react-router-dom";
import LoadingContent from "../components/LoadingContent";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import { selectIsLoggedIn, setLogin } from "../redux/reducers/AuthSlice";
import { cacheAppConfig } from "../services/AppConfigService";
import { getTokens } from "../services/AuthService";
import { saveAccessToken, saveRefreshToken } from "../services/TokenService";
import { getUser } from "../services/UserService";

const LoginForm = () => {
  const [searchParams] = useSearchParams();
  const code = searchParams.get("code");
  const redirectUri = window.location.href.split("?")[0].slice(0, -1);
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const signIn = useGoogleLogin({
    onSuccess: (codeResponse) => console.log(codeResponse),
    onError: (error) => console.log(error),
    flow: "auth-code",
    scope: "openid profile email",
    ux_mode: "redirect",
    redirect_uri: redirectUri,
  });

  useEffect(() => {
    handleLogin();
  }, [code]);

  const handleLogin = async () => {
    if (code) {
      setIsLoading(true);
      try {
        const response = await getTokens(code, redirectUri);
        onLoginSuccess(response);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const onLoginSuccess = (response) => {
    if (response.refreshToken) saveRefreshToken(response.refreshToken);
    saveAccessToken(response.idToken);
    getUser().then((data) => dispatch(setLogin({ user: data })));
  };

  useEffect(() => {
    if (isLoggedIn) {
      console.log("caching app config");
      dispatch(cacheAppConfig());
    }
  }, [isLoggedIn]);

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
            <Button
              onClick={signIn}
              startIcon={<Google />}
              variant="contained"
              color="primary"
            >
              Login with Google
            </Button>
          ) : (
            <Navigate to={sessionStorage.getItem("redirect") || "/home"} />
          )}
        </CardContent>
      </Card>
      {isLoading && <LoadingContent />}
    </Box>
  );
};

export default LoginForm;
