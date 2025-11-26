import React from 'react';
import styled from 'styled-components';
import PromoPanel from './PromoPanel';

const AppShell = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  min-height: 100dvh;
  padding: clamp(20px, 3vh, 40px) clamp(20px, 2. 5vw, 32px);
  background: linear-gradient(180deg, #eceff7 0%, #e2e4f1 100%);
`;

const LoginCard = styled.div`
  display: flex;
  width: 1000px;
  max-width: 100%;
  min-height: 600px;
  background-color: #ffffff;
  border-radius: 32px;
  box-shadow: 0 20px 60px rgba(25, 35, 88, 0.15);
  overflow: hidden;

  @media (max-width: 980px) {
    flex-direction: column;
    border-radius: 24px;
    min-height: auto;
  }
`;

const FormPanel = styled.section`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 48px 56px;
  background-color: #fbfcff;
  border-left: 1px solid #e7eaf7;
  position: relative;

  @media (max-width: 980px) {
    padding: 40px 32px;
    border-left: none;
    border-top: 1px solid #e1e4f5;
  }

  @media (max-width: 640px) {
    padding: 32px 24px;
  }
`;

const BrandMarkWrapper = styled.div`
  position: absolute;
  top: 48px;
  right: 56px;

  @media (max-width: 980px) {
    position: static;
    display: flex;
    justify-content: center;
    margin-bottom: 32px;
  }

  @media (max-width: 640px) {
    margin-bottom: 24px;
  }
`;

const FormContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex: 1;
  gap: 24px;
  max-width: 400px;
  margin: 0 auto;
  width: 100%;

  @media (max-width: 980px) {
    max-width: 100%;
  }
`;

function AuthLayout({ children }) {
  return (
    <AppShell>
      <LoginCard>
        <PromoPanel />
        <FormPanel>
          <BrandMarkWrapper>
          </BrandMarkWrapper>
          <FormContent>
            {children}
          </FormContent>
        </FormPanel>
      </LoginCard>
    </AppShell>
  );
}

export default AuthLayout;