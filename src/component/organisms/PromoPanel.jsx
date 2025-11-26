import React from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import pinImage from '../../assets/image-2.png';


const PromoPanelWrapper = styled. section`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 50px;
  background-color: #ffffff;
  text-align: center;
  border-right: 1px solid #e8ebf0;

  @media (max-width: 980px) {
    padding: 40px 32px;
    border-right: none;
    border-bottom: 1px solid #e8ebf0;
  }
`;

const IllustrationWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-bottom: 48px;
`;

const PinIllustration = styled.img`
  width: 160px;
  height: auto;

  @media (max-width: 980px) {
    width: 140px;
  }
`;

const PromoCopy = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
`;

const PromoTitle = styled.h1`
  margin: 0;
  font-size: 2rem;
  font-weight: 700;
  letter-spacing: -0.02em;
  line-height: 1.4;
  color: #1a1d2e;

  @media (max-width: 640px) {
    font-size: 1.6rem;
  }
`;

const PromoText = styled.p`
  margin: 0;
  font-size: 0.9rem;
  color: #75788d;
  line-height: 1.6;
  white-space: pre-line;

  @media (max-width: 640px) {
    font-size: 0. 85rem;
  }
`;

const PromoDots = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 48px;
`;

const Dot = styled. span`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: ${props => props.$active ? '#252b48' : '#d1d5db'};
  transition: background-color 0. 3s ease;
`;

function PromoPanel() {
  const location = useLocation();
  
  const getActiveDot = () => {
    if (location.pathname === '/signin') return 'login';
    if (location.pathname === '/signup-id') return 'signup';
    if (location.pathname === '/signup-pw') return 'password';
    return 'login';
  };

  const dots = ['login', 'signup', 'password'];
  const activeDot = getActiveDot();

  return (
    <PromoPanelWrapper>
      <IllustrationWrapper>
        <PinIllustration
          src={pinImage}
          alt="주황색 위치 핀"
        />
      </IllustrationWrapper>
      <PromoCopy>
        <PromoTitle>내 물건 어디갔지?</PromoTitle>
        <PromoText>학교에서 잃어버린 내 물건,{'\n'}'어디'에서 손쉽게 찾아보세요!</PromoText>
      </PromoCopy>
      <PromoDots>
        {dots.map((dotView) => (
          <Dot
            key={dotView}
            $active={activeDot === dotView}
          />
        ))}
      </PromoDots>
    </PromoPanelWrapper>
  );
}

export default PromoPanel;