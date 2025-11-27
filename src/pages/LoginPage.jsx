import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthLayout from '../component/organisms/AuthLayout';
import BrandMark from '../component/organisms/BrandMark';
import { useAuth } from '../contexts/useAuth';
import { login as loginApi } from '../services/authService';
import {
  LoginForm,
  InputField,
  Input,
  RememberMe,
  PrimaryButton,
  SecondaryButton,
  FormFooter,
  Divider,
} from '../styles/AuthStyles';

function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [userId, setUserId] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!userId || !userPassword) {
      setError('아이디와 비밀번호를 입력해주세요.');
      return;
    }

    setLoading(true);
    try {
      const response = await loginApi({ userId, userPassword });
      
      // Log response for debugging
      console.log('Login API Response:', response);
      
      // Check nested data structure: response.data contains success, token, userId
      if (response.success && response.data?.success) {
        const { token, userId: returnedUserId } = response.data;
        
        // Validate token exists
        if (!token) {
          console.error('Token is missing from response:', response);
          setError('로그인 응답에 토큰이 없습니다. 서버 관리자에게 문의하세요.');
          return;
        }
        
        // Save login credentials using AuthContext
        login(token, {
          userId: returnedUserId || userId,
        });
        
        console.log('Login successful, token saved');
        
        // Navigate to main page
        navigate('/');
      } else {
        setError(response.error || response.message || '로그인에 실패했습니다.');
      }
    } catch (err) {
      console.error('Login error:', err);
      
      // Handle CORS errors
      if (err.message === 'Network Error' || err.code === 'ERR_NETWORK') {
        setError('서버에 연결할 수 없습니다. CORS 설정을 확인해주세요.');
      } else if (err.response?.data?.error) {
        setError(err.response.data.error);
      } else if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError('로그인 중 오류가 발생했습니다.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout formClassName="is-login">
      <BrandMark />
      
      <LoginForm onSubmit={handleLogin}>
        {error && (
          <div style={{ color: '#ef4444', fontSize: '0.9rem', marginBottom: '8px' }}>
            {error}
          </div>
        )}
        
        <InputField>
          <span>아이디</span>
          <Input 
            type="text" 
            placeholder="아이디 입력"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            disabled={loading}
          />
        </InputField>

        <InputField>
          <span>비밀번호</span>
          <Input 
            type="password" 
            placeholder="비밀번호 입력"
            value={userPassword}
            onChange={(e) => setUserPassword(e.target.value)}
            disabled={loading}
          />
        </InputField>

        <RememberMe>
          <input 
            type="checkbox"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
          />
          <span>아이디 저장</span>
        </RememberMe>

        <PrimaryButton type="submit" disabled={loading}>
          {loading ? '로그인 중...' : '로그인'}
        </PrimaryButton>
      </LoginForm>

      <FormFooter className="login-footer">
        <Divider />
        <SecondaryButton
          type="button"
          onClick={() => navigate('/signup-id')}
        >
          이메일로 회원가입
        </SecondaryButton>
      </FormFooter>
    </AuthLayout>
  );
}

export default LoginPage;