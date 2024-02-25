import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import LoginForm from "./pages/LoginPage";
import PollForm from "./pages/PollPage";
import PollSubmitForm from "./pages/PollSubmitPage";
import { themeSettings } from "./theme";
import ProtectedRoute from "./utils/ProtectiveRoutes";

const App = () => {
  const mode = useSelector((state: { mode: string }) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  return (
    <div className="App">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route path="/" element={<LoginForm />} />
            <Route
              path="/create-poll"
              element={
                <ProtectedRoute>
                  <PollSubmitForm />
                </ProtectedRoute>
              }
            />
            <Route
              path="/polls/:id"
              element={
                <ProtectedRoute>
                  <PollForm />
                </ProtectedRoute>
              }
            />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
};

export default App;
