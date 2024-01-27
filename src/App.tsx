import { useEffect, useState } from 'react';
import './App.css';
import { GoogleLogin, googleLogout, useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import TokenService from './services/TokenService';
import PollService from './services/PollService';

function App() {
  const [token, setToken] = useState([]);

  const responseMessage = (response) => {
    TokenService.saveToken(response.credential);
    setToken(response.credential);
    console.log(response);
  };
  const errorMessage = () => {
    console.log("Failed to login");
  };

  useEffect(
    () => {
      PollService.getPolls()
      .then((res) => {
        console.log(res);
      })
      .catch(() => {
        console.log("Failed to get poll");
      });
    },
    [token]
  );

  return (
    <div>
      <h2>React Google Login</h2>
      <br />
      <br />
      <GoogleLogin onSuccess={responseMessage} onError={errorMessage} />
    </div>
  )
}

export default App;
