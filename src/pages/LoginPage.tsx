import { Box, Card, CardContent, Typography } from "@mui/material";
import { GoogleLogin } from "@react-oauth/google";
import { useContext, useLayoutEffect } from "react";
import { Navigate } from "react-router-dom";
import { AppContext } from "../App";
import TokenService from "../services/TokenService";
import UserService from "../services/UserService";

const LoginForm = () => {
  const { isLoggedIn, setIsLoggedIn, setUser } = useContext(AppContext);

  const getUser = () => {
    UserService.login()
      .then((data) => {
        setUser(data);
        setIsLoggedIn(true);
      })
      .catch(() => {
        setUser(null);
        setIsLoggedIn(false);
      });
  };

  const onError = () => {
    console.log("Failed to login");
  };

  const onSuccess = (res) => {
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
              to={sessionStorage.getItem("redirect") || "/create-poll"}
            />
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default LoginForm;
