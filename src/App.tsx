import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import LoginForm from "./pages/LoginPage";
import PollForm from "./pages/PollPage";
import PollSubmitForm from "./pages/PollSubmitPage";
import ProtectedRoute from "./utils/ProtectiveRoutes";

const App = () => {
  return (
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
  );
};

export default App;
