import LoginForm from './components/LoginForm';
import PollSubmitForm from './components/PollSubmitForm';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PollForm from './components/PollForm';
import './App.css';

function App() {
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
