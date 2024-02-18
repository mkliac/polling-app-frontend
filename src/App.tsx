import LoginForm from "./components/LoginPage";
import PollSubmitForm from "./components/PollSubmitPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PollForm from "./components/PollPage";
import "./App.css";
import { createContext, useState } from "react";
import ProtectedRoute from "./utils/ProtectiveRoutes";

export const AppContext = createContext(null);

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <AppContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      <BrowserRouter>
        <div className="App">
          <Routes>
            <Route path="/login" element={<LoginForm />} />
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
