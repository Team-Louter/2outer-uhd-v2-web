import React from 'react';
import { useNavigate } from 'react-router-dom';
import AuthLayout from '../component/organisms/AuthLayout';
import BrandMark from '../component/organisms/BrandMark';
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

  const handleLogin = (e) => {
    e. preventDefault();
    console.log('로그인 처리');
    // 로그인 성공 시 메인 페이지로 이동
    // navigate('/');
  };

  return (
    <AuthLayout formClassName="is-login">
      <BrandMark />
      
      <LoginForm onSubmit={handleLogin}>
        <InputField>
          <span>아이디</span>
          <Input type="text" placeholder="아이디 입력" />
        </InputField>

        <InputField>
          <span>비밀번호</span>
          <Input type="password" placeholder="비밀번호 입력" />
        </InputField>

        <RememberMe>
          <input type="checkbox" />
          <span>아이디 저장</span>
        </RememberMe>

        <PrimaryButton type="submit">
          로그인
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