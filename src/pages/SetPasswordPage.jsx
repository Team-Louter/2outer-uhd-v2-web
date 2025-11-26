import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import AuthLayout from '../component/organisms/AuthLayout';
import { signup } from '../services/authService';
import {
  LoginForm,
  InputField,
  Input,
  FieldStatus,
  PrimaryButton,
  FormFooter,
  GhostLinkButton,
} from '../styles/AuthStyles';

function SetPasswordPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { name, username, email } = location.state || {};

  // Redirect if no signup data is available
  if (!name || !username || !email) {
    navigate('/signup-id');
    return null;
  }

  const passwordsMatch = password.length > 0 && password === passwordConfirm;
  const showPasswordStatus = password.length > 0 && passwordConfirm.length > 0;

  // Password validation (at least 8 characters, numbers and special characters)
  const isPasswordValid = /^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/.test(password);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!isPasswordValid) {
      setError('비밀번호는 숫자, 특수문자를 포함하여 8자 이상이어야 합니다.');
      return;
    }

    if (!passwordsMatch) {
      setError('비밀번호가 일치하지 않습니다.');
      return;
    }

    setLoading(true);
    try {
      const response = await signup({
        userId: username,
        userPassword: password,
        userName: name,
        userEmail: email
      });
      
      if (response.success && response.data?.success) {
        alert('회원가입이 완료되었습니다.');
        navigate('/signin');
      } else {
        setError(response.error || response.message || '회원가입에 실패했습니다.');
      }
    } catch (err) {
      if (err.response?.data?.error) {
        setError(err.response.data.error);
      } else if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError('회원가입 중 오류가 발생했습니다.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <LoginForm className="password-form" onSubmit={handleSubmit}>
        {error && (
          <div style={{ color: '#ef4444', fontSize: '0.9rem', marginBottom: '8px' }}>
            {error}
          </div>
        )}

        <InputField>
          <span>비밀번호 설정</span>
          <Input
            type="password"
            placeholder="비밀번호 입력 (숫자, 특수문자 포함 8자 이상)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
          />
          {password.length > 0 && !isPasswordValid && (
            <FieldStatus $match={false}>
              숫자, 특수문자를 포함하여 8자 이상 입력해주세요.
            </FieldStatus>
          )}
        </InputField>

        <InputField>
          <span>비밀번호 확인</span>
          <Input
            type="password"
            placeholder="비밀번호 다시 입력"
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
            disabled={loading}
          />
          {showPasswordStatus && (
            <FieldStatus $match={passwordsMatch}>
              {passwordsMatch ? '비밀번호가 일치합니다.' : '비밀번호가 일치하지 않습니다.'}
            </FieldStatus>
          )}
        </InputField>

        <PrimaryButton type="submit" disabled={loading}>
          {loading ? '가입 중...' : '회원가입'}
        </PrimaryButton>
      </LoginForm>

      <FormFooter className="password-footer">
        <GhostLinkButton
          type="button"
          onClick={() => navigate('/signup-id')}
        >
          이전으로
        </GhostLinkButton>
      </FormFooter>
    </AuthLayout>
  );
}

export default SetPasswordPage;