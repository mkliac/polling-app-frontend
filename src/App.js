import { useEffect, useState } from 'react';
import './App.css';
import { GoogleLogin, googleLogout, useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';

function App() {
  const [token, setToken] = useState([]);

  const responseMessage = (response) => {
    setToken(response.credential);
    console.log(response);
  };
  const errorMessage = (error) => {
    console.log(error);
  };

  useEffect(
    () => {
      axios
        .get("https://voting-app-backend-dev.onrender.com/polls", {
            headers: {
                            Authorization: `Bearer ${token}`
                        }
                    })
                    .then((res) => {
                        console.log(res);
                    })
                    .catch((err) => console.log(err));
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
