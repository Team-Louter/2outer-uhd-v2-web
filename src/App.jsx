import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import GlobalStyle from './styles/GlobalStyle'; // 경로는 실제 GlobalStyle 위치에 맞게 조정
import { AuthProvider } from './contexts/AuthContext';
import { useAuth } from './contexts/useAuth';

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

// Protected Route component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();
  
  if (isLoading) {
    return <div>로딩 중...</div>;
  }
  
  if (!isAuthenticated()) {
    return <Navigate to="/signin" replace />;
  }
  
  return children;
};

function AppRoutes() {
  return (
    <Routes>
      {/* 기존 라우트 */}
      <Route path='/' element={<Index />} />
      <Route path='/intro' element={<Intro />} />
      <Route path='/list' element={<List />} />
      <Route path='/post-detail/:id' element={<PostDetail />} />
      
      {/* 보호된 라우트 (로그인 필요) */}
      <Route path='/findit-register' element={
        <ProtectedRoute>
          <FindItRegister />
        </ProtectedRoute>
      } />
      <Route path='/found-register' element={
        <ProtectedRoute>
          <FoundRegister />
        </ProtectedRoute>
      } />
      <Route path='/mypost' element={
        <ProtectedRoute>
          <MyPost />
        </ProtectedRoute>
      } />
      <Route path='/mypage' element={
        <ProtectedRoute>
          <MyPage />
        </ProtectedRoute>
      } />
      
      {/* 인증 관련 라우트 */}
      <Route path='/signin' element={<LoginPage />} />
      <Route path='/signup-id' element={<SignupPage />} />
      <Route path='/signup-pw' element={<SetPasswordPage />} />
    </Routes>
  );
}

function App() {
  return (
    <>
      <GlobalStyle />
      <AuthProvider>
        <Router>
          <div className='App'>
            <AppRoutes />
          </div>
        </Router>
      </AuthProvider>
    </>
  );
}

export default App;