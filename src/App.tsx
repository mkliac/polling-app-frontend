import LoginForm from './components/LoginForm';
import PollSubmitForm from './components/PollSubmitForm';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PollForm from './components/PollForm';
import './App.css';
import { createContext, useState } from 'react';
import ProtectedRoute from './utils/ProtectiveRoutes';

export const AuthContext = createContext(null);

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <AuthContext.Provider value={{isLoggedIn, setIsLoggedIn}}>
      <BrowserRouter>
        <div className='App'>
          <Routes>
            <Route path="/login" element={<LoginForm />}/>
            <Route path="/create-poll" element={<ProtectedRoute><PollSubmitForm /></ProtectedRoute>}/>
            <Route path="/polls/:id" element={<ProtectedRoute><PollForm /></ProtectedRoute>}/>
          </Routes>
        </div>
      </BrowserRouter>
    </AuthContext.Provider>
  )
}

export default App;
