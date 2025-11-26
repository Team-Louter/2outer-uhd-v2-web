import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthLayout from '../component/organisms/AuthLayout';
import { sendEmailVerification, verifyEmail } from '../services/authService';
import {
  LoginForm,
  InputField,
  Input,
  InputFieldRow,
  InlineActionButton,
  PrimaryButton,
  FormFooter,
  GhostLinkButton,
  FieldStatus,
} from '../styles/AuthStyles';

function SignupPage() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [emailSent, setEmailSent] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSendVerification = async () => {
    if (!email) {
      setError('이메일을 입력해주세요.');
      return;
    }

    setLoading(true);
    setError('');
    try {
      const response = await sendEmailVerification({
        userEmail: email,
        purpose: 'SIGN_UP'
      });
      
      if (response.success && response.data?.success) {
        setEmailSent(true);
        setSuccessMessage('인증 코드가 이메일로 전송되었습니다.');
      } else {
        setError(response.error || response.message || '이메일 전송에 실패했습니다.');
      }
    } catch (err) {
      if (err.response?.data?.error) {
        setError(err.response.data.error);
      } else {
        setError('이메일 전송 중 오류가 발생했습니다.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyEmail = async () => {
    if (!verificationCode) {
      setError('인증 코드를 입력해주세요.');
      return;
    }

    setLoading(true);
    setError('');
    try {
      const response = await verifyEmail({
        userEmail: email,
        code: verificationCode,
        purpose: 'SIGN_UP'
      });
      
      if (response.success && response.data?.success) {
        setEmailVerified(true);
        setSuccessMessage('이메일이 인증되었습니다.');
      } else {
        setError(response.error || response.message || '인증에 실패했습니다.');
      }
    } catch (err) {
      if (err.response?.data?.error) {
        setError(err.response.data.error);
      } else {
        setError('인증 중 오류가 발생했습니다.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleNext = (e) => {
    e.preventDefault();
    
    if (!name) {
      setError('성명을 입력해주세요.');
      return;
    }
    if (!username) {
      setError('아이디를 입력해주세요.');
      return;
    }
    if (!email) {
      setError('이메일을 입력해주세요.');
      return;
    }
    if (!emailVerified) {
      setError('이메일 인증을 완료해주세요.');
      return;
    }

    navigate('/signup-pw', { 
      state: { name, username, email } 
    });
  };

  return (
    <AuthLayout>
      <LoginForm onSubmit={handleNext}>
        {error && (
          <div style={{ color: '#ef4444', fontSize: '0.9rem', marginBottom: '8px' }}>
            {error}
          </div>
        )}
        {successMessage && (
          <div style={{ color: '#10b981', fontSize: '0.9rem', marginBottom: '8px' }}>
            {successMessage}
          </div>
        )}
        
        <InputField>
          <span>성명</span>
          <Input 
            type="text" 
            placeholder="성명 입력"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={loading}
          />
        </InputField>

        <InputField>
          <span>아이디</span>
          <Input 
            type="text" 
            placeholder="아이디 입력"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            disabled={loading}
          />
        </InputField>

        <InputField>
          <span>이메일</span>
          <InputFieldRow>
            <Input 
              type="email" 
              placeholder="이메일 입력"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setEmailSent(false);
                setEmailVerified(false);
              }}
              disabled={loading || emailVerified}
            />
            <InlineActionButton 
              type="button"
              onClick={handleSendVerification}
              disabled={loading || emailVerified}
            >
              {emailSent ? '재전송' : '인증요청'}
            </InlineActionButton>
          </InputFieldRow>
        </InputField>

        {emailSent && !emailVerified && (
          <InputField>
            <span>인증 코드</span>
            <InputFieldRow>
              <Input 
                type="text" 
                placeholder="인증 코드 입력"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                disabled={loading}
              />
              <InlineActionButton 
                type="button"
                onClick={handleVerifyEmail}
                disabled={loading}
              >
                확인
              </InlineActionButton>
            </InputFieldRow>
          </InputField>
        )}

        {emailVerified && (
          <FieldStatus $match={true}>
            이메일이 인증되었습니다.
          </FieldStatus>
        )}

        <PrimaryButton type="submit" disabled={loading}>
          {loading ? '처리 중...' : '다음'}
        </PrimaryButton>
      </LoginForm>

      <FormFooter>
        <GhostLinkButton
          type="button"
          onClick={() => navigate('/signin')}
        >
          이미 계정이 있어요. 
        </GhostLinkButton>
      </FormFooter>
    </AuthLayout>
  );
}

export default SignupPage;