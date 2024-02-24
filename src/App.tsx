import { createContext, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { User } from "./models/UserModel";
import LoginForm from "./pages/LoginPage";
import PollForm from "./pages/PollPage";
import PollSubmitForm from "./pages/PollSubmitPage";
import ProtectedRoute from "./utils/ProtectiveRoutes";

export const AppContext = createContext(null);

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<User>(null);

  return (
    <AppContext.Provider value={{ isLoggedIn, setIsLoggedIn, user, setUser }}>
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
