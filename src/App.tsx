import { useEffect } from 'react';
import './App.css';
import PollService from './services/PollService';
import LoginForm from './components/LoginForm';

function App() {
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
    []
  );

  return (
    <div>
      <LoginForm></LoginForm>
    </div>
  )
}

export default App;
