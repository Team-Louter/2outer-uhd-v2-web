// organisms/Header.jsx
import React, { useState } from 'react';
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

const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.45);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  width: min(25rem, 90%);
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.2);
`;

const ModalHeader = styled.div`
  position: relative;
  background-color: #1a1e47;
  color: #ffffff;
  text-align: center;
  padding: 2rem 1.5rem 1.5rem;
`;

const ModalTitle = styled.h2`
  margin: 0;
  font-size: 1.5rem;
  font-weight: 700;
`;

const ModalDivider = styled.div`
  width: 3rem;
  height: 3px;
  margin: 0.75rem auto 1rem;
  background-color: rgba(255, 255, 255, 0.6);
`;

const ModalDescription = styled.p`
  margin: 0;
  line-height: 1.5;
  font-size: 0.9375rem;
`;

const ModalBody = styled.div`
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding: 2rem 1.5rem 2.5rem;
`;

const ModalButton = styled(Button)`
  font-size: 1rem;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1.25rem;
  left: 1.25rem;
  background: none;
  border: none;
  color: #ffffff;
  font-size: 1.25rem;
  cursor: pointer;
  padding: 0.25rem;

  &:hover {
    opacity: 0.8;
  }
`;

const Header = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleLogoClick = () => {
    navigate('/');
  };

  const handleMyPageClick = () => {
    navigate('/mypost');
  };

  const handlePostRegisterClick = () => {
    setIsModalOpen(true);
  };

  const handleFindRegisterClick = () => {
    setIsModalOpen(false);
    navigate('/findit-register');
  };

  const handleFoundRegisterClick = () => {
    setIsModalOpen(false);
    navigate('/found-register');
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleIndexPageClick = () => {
    navigate('/')
  }

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
      {isModalOpen && (
        <ModalOverlay onClick={handleCloseModal}>
          <ModalContent onClick={(event) => event.stopPropagation()}>
            <ModalHeader>
              <CloseButton aria-label="닫기" onClick={handleCloseModal}>
                {'<'}
              </CloseButton>
              <ModalTitle>분실물 등록</ModalTitle>
              <ModalDivider />
              <ModalDescription>
                본인이 잃어버린 분실물을 등록하려면 '내 물건' 버튼,
                본인이 습득한 분실물을 등록하려면 '네 물건' 버튼을 선택해주세요!
              </ModalDescription>
            </ModalHeader>
            <ModalBody>
              <ModalButton
                variant="secondary"
                $width="100%"
                $height="3rem"
                onClick={handleFindRegisterClick}
              >
                내 물건
              </ModalButton>
              <ModalButton
                variant="secondary"
                $width="100%"
                $height="3rem"
                onClick={handleFoundRegisterClick}
              >
                네 물건
              </ModalButton>
            </ModalBody>
          </ModalContent>
        </ModalOverlay>
      )}
    </HeaderContainer>
  );
};

export default Header;