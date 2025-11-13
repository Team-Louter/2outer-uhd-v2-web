import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Index from './pages/Index';
import Intro from './pages/Intro';
import Find from './pages/Find';
import Found from './pages/Found';
import FindItRegister from './pages/FindItRegister';
import FoundRegister from './pages/FoundRegister';
import SignIn from './pages/SignIn';
import SignupID from './pages/SignupID';
import SignupPW from './pages/SignupPW';
import SignupSchool from './pages/SignupSchool';
import MyPost from './pages/MyPost';
import Popup from './pages/Popup';
import MyPage from './pages/MyPage';
import GlobalStyle from './styles/GlobalStyle';

function App() {
  return (
    <>
    <GlobalStyle />
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/intro" element={<Intro />} />
          <Route path="/find" element={<Find />} />
          <Route path="/found" element={<Found />} />
          <Route path="/findit-register" element={<FindItRegister />} />
          <Route path="/found-register" element={<FoundRegister />} />
          {/* <Route path="/signin" element={<SignIn />} /> */}
          {/* <Route path="/signup-id" element={<SignupID />} /> */}
          {/* <Route path="/signup-pw" element={<SignupPW />} /> */}
          {/* <Route path="/signup-school" element={<SignupSchool />} /> */}
          <Route path="/mypost" element={<MyPost />} />
          <Route path="/popup" element={<Popup />} />
          <Route path="/mypage" element={<MyPage />} />
        </Routes>
      </div>
    </Router>
    </>
  );
}

export default App;