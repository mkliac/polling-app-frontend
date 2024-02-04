import { useEffect } from 'react';
import './App.css';
import PollService from './services/PollService';
import LoginForm from './components/LoginForm';
import PollSubmitForm from './components/PollSubmitForm';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PollForm from './components/PollForm';

function App() {
  // useEffect(
  //   () => {
  //     PollService.vote("65a211bc7ef89907c966a3c8","65a211bc7ef89907c966a3c7")
  //     // PollService.getPolls()
  //     // PollService.updatePollItem("65a211bc7ef89907c966a3c8", "65a211bc7ef89907c966a3c7", "new text")
  //     .then((res) => {
  //       console.log(res);
  //     })
  //     .catch(() => {
  //       console.log("Failed to get poll");
  //     });
  //   },
  //   []
  // );

  return (
    <BrowserRouter>
        <div className='App'>
          <Routes>
            <Route path="/" element={<LoginForm />}/>
            <Route path="/create-poll" element={<PollSubmitForm />}/>
            <Route path="/polls/:id" element={<PollForm />}/>
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App;
