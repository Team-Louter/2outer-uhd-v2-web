import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import AuthLayout from '../component/organisms/AuthLayout';
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

  const { name, username } = location.state || {};

  const passwordsMatch = password. length > 0 && password === passwordConfirm;
  const showPasswordStatus = password.length > 0 && passwordConfirm.length > 0;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (! passwordsMatch) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }
    console.log('회원가입 완료:', { name, username, password });
    navigate('/signin');
  };

  return (
    <AuthLayout>
      <LoginForm className="password-form" onSubmit={handleSubmit}>
        <InputField>
          <span>비밀번호 설정</span>
          <Input
            type="password"
            placeholder="비밀번호 입력 (숫자, 특수문자 포함 8자 이상)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </InputField>

        <InputField>
          <span>비밀번호 확인</span>
          <Input
            type="password"
            placeholder="비밀번호 다시 입력"
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
          />
          {showPasswordStatus && (
            <FieldStatus $match={passwordsMatch}>
              {passwordsMatch ? '비밀번호가 일치합니다.' : '비밀번호가 일치하지 않습니다.'}
            </FieldStatus>
          )}
        </InputField>

        <PrimaryButton type="submit">
          다음
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