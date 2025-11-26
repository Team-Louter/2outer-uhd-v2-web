import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthLayout from '../component/organisms/AuthLayout';
import {
  LoginForm,
  InputField,
  Input,
  InputFieldRow,
  InlineActionButton,
  PrimaryButton,
  FormFooter,
  GhostLinkButton,
} from '../styles/AuthStyles';

function SignupPage() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');

  const handleCheckDuplicate = () => {
    console.log('아이디 중복 확인:', username);
  };

  const handleNext = (e) => {
    e. preventDefault();
    navigate('/signup-pw', { 
      state: { name, username } 
    });
  };

  return (
    <AuthLayout>
      <LoginForm onSubmit={handleNext}>
        <InputField>
          <span>성명</span>
          <Input 
            type="text" 
            placeholder="성명 입력"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </InputField>

        <InputField>
          <span>아이디</span>
          <InputFieldRow>
            <Input 
              type="text" 
              placeholder="아이디 입력"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <InlineActionButton 
              type="button"
              onClick={handleCheckDuplicate}
            >
              중복확인
            </InlineActionButton>
          </InputFieldRow>
        </InputField>

        <PrimaryButton type="submit">
          다음
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