import { createContext, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import LoginForm from "./components/LoginPage";
import PollForm from "./components/PollPage";
import PollSubmitForm from "./components/PollSubmitPage";
import ProtectedRoute from "./utils/ProtectiveRoutes";

export const AppContext = createContext(null);

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <AppContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      <BrowserRouter>
        <div className="App">
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
        </div>
      </BrowserRouter>
    </AppContext.Provider>
  );
};

export default App;
