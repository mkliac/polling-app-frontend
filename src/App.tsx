import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import LoginForm from "./pages/LoginPage";
import PollForm from "./pages/PollPage";
import PollSubmitForm from "./pages/PollSubmitPage";
import { setLogin, setLogout } from "./redux/reducers/AuthSlice";
import { getNewAccessToken } from "./services/AuthService";
import { getRefreshToken, saveAccessToken } from "./services/TokenService";
import { getUser } from "./services/UserService";
import { themeSettings } from "./theme";
import ProtectedRoute from "./utils/ProtectiveRoutes";

const App = () => {
  const mode = useSelector((state: { mode: string }) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const dispatch = useDispatch();

  useEffect(() => {
    refreshAccessToken();
    const id = setInterval(refreshAccessToken, 1000 * 60 * 30);

    return () => clearInterval(id);
  }, []);

  const refreshAccessToken = async () => {
    let refreshToken = getRefreshToken();
    if (!refreshToken) return;

    try {
      const response = await getNewAccessToken(refreshToken);
      saveAccessToken(response.idToken);
      getUser().then((data) => dispatch(setLogin({ user: data })));
      console.log("refreshed access token");
    } catch (error) {
      console.error(error);
      dispatch(setLogout());
    }
  };

  return (
    <div className="App">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route path="/" element={<LoginForm />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/create-poll" element={<PollSubmitForm />} />
              <Route path="/polls/:id" element={<PollForm />} />
              <Route path="/home" element={<HomePage />} />
            </Route>
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
};

export default App;
