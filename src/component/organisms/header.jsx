// organisms/Header.jsx
import React from 'react';
import styled from 'styled-components';
import Logo from '../atom/logo';
import NavigationMenu from '../molecules/navigationMenu';
import Button from '../atom/button';
import { useNavigate } from 'react-router-dom';

const HeaderContainer = styled.header`
  height: 5rem;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  border-bottom: 1px solid #e0e0e0;
  margin: 0;
  padding: 0;
`;

const LogoContainer = styled.div`
  padding-left: 1.5rem; // 로고에 왼쪽 여백 1rem 추가
  cursor: pointer;
  
  &:hover {
    opacity: 0.8;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  padding-right: 1.5rem; // 버튼에 오른쪽 여백 1rem 추가
`;

const Header = () => {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate('/');
  };

  const handleMyPageClick = () => {
    navigate('/mypost');
  };

  const handlePostRegisterClick = () => {
    navigate('/findit-register');
  };

  return (
    <HeaderContainer>
      <LogoContainer onClick={handleLogoClick}>
        <Logo width={100} alt="로고" />
      </LogoContainer>
      <NavigationMenu />
      <ButtonContainer>
        <Button 
          onClick={handleMyPageClick} 
          variant="secondary"
        >
          마이페이지
        </Button>
        <Button 
          onClick={handlePostRegisterClick} $width={"100px"} $height={"40px"}
        >
          게시물 등록
        </Button>
      </ButtonContainer>
    </HeaderContainer>
  );
};

export default Header;