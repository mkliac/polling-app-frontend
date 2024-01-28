import { useEffect, useState } from 'react';
import './App.css';
import { GoogleLogin } from '@react-oauth/google';
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
      PollService.vote("65a211bc7ef89907c966a3c8","65a211bc7ef89907c966a3c7")
      // PollService.getPolls()
      // PollService.updatePollItem("65a211bc7ef89907c966a3c8", "65a211bc7ef89907c966a3c7", "new text")
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
