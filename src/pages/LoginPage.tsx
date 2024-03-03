import { Box, Card, CardContent, Typography } from "@mui/material";
import { GoogleLogin } from "@react-oauth/google";
import { useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import TokenService from "../services/TokenService";
import UserService from "../services/UserService";
import { setLogin, setLogout } from "../state";

const LoginForm = () => {
  const isLoggedIn = useSelector(
    (state: { isLoggedIn: boolean }) => state.isLoggedIn
  );
  const dispatch = useDispatch();

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
    console.log(res);
    TokenService.saveToken(res.credential);
    getUser();
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
            <Navigate
              to={sessionStorage.getItem("redirect") || "/home"}
            />
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default LoginForm;
