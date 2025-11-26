import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import GlobalStyle from './styles/GlobalStyle'; // 경로는 실제 GlobalStyle 위치에 맞게 조정

// 기존 페이지들
import Index from './pages/Index';
import Intro from './pages/Intro';
import List from './pages/List';
import FindItRegister from './pages/FindItRegister';
import FoundRegister from './pages/FoundRegister';
import MyPost from './pages/MyPost';
import MyPage from './pages/MyPage';
import PostDetail from './pages/PostDetail';

// 새로 추가된 인증 페이지들
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import SetPasswordPage from './pages/SetPasswordPage';

function App() {
  return (
    <>
      <GlobalStyle />
      <Router>
        <div className='App'>
          <Routes>
            {/* 기존 라우트 */}
            <Route path='/' element={<Index />} />
            <Route path='/intro' element={<Intro />} />
            <Route path='/list' element={<List />} />
            <Route path='/findit-register' element={<FindItRegister />} />
            <Route path='/found-register' element={<FoundRegister />} />
            <Route path='/mypost' element={<MyPost />} />
            <Route path='/mypage' element={<MyPage />} />
            <Route path='/post-detail/:id' element={<PostDetail />} />
            
            {/* 인증 관련 라우트 (주석 해제 및 새 컴포넌트로 대체) */}
            <Route path='/signin' element={<LoginPage />} />
            <Route path='/signup-id' element={<SignupPage />} />
            <Route path='/signup-pw' element={<SetPasswordPage />} />
            {/* <Route path="/signup-school" element={<SignupSchool />} /> */}
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;