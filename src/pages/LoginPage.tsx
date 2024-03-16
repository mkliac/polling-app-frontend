import { Box, Card, CardContent, Typography } from "@mui/material";
import { GoogleLogin } from "@react-oauth/google";
import { useLayoutEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import {
  selectIsLoggedIn,
  setLogin,
  setLogout,
} from "../redux/reducers/AuthSlice";
import { cacheAppConfig } from "../services/AppConfigService";
import TokenService from "../services/TokenService";
import UserService from "../services/UserService";

const LoginForm = () => {
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const dispatch = useAppDispatch();

  const getUser = () => {
    UserService.login()
      .then((data) => {
        dispatch(setLogin({ user: data }));
      })
      .catch(() => {
        dispatch(setLogout());
      });
  };

  const onError = () => {
    console.log("Failed to login");
  };

  const onSuccess = (res) => {
    TokenService.saveToken(res.credential);
    getUser();
    dispatch(cacheAppConfig());
  };

  useLayoutEffect(() => {
    getUser();
  }, []);

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
            <GoogleLogin
              size="large"
              type="standard"
              text="signin_with"
              theme="filled_black"
              onSuccess={onSuccess}
              onError={onError}
            />
          ) : (
            <Navigate to={sessionStorage.getItem("redirect") || "/home"} />
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default LoginForm;
