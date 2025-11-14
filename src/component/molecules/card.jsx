import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

// 1. 카드 전체 컨테이너
const CardContainer = styled.div`
  width: 237px;
  height: 270px;
  border: 1px solid #e0e0e0;
  border-radius: 5px;
  overflow: hidden;
  background-color: #fff;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
`;

// 2. 카드 이미지
const CardImage = styled.img`
  width: 206px;
  height: 160px;
  object-fit: cover;
  display: block;
  border-radius: 5px;
  margin-top: 1rem;
`;

// 3. 카드 내용 영역
const CardContent = styled.div`
  padding: 0.8rem 1rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  gap: 1px; /* ItemName과 하단 정보 사이 기본 gap */
`;

// 4. OwnerType과 ItemName 사이 전용 컨테이너
const OwnerItemGap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1px; /* OwnerType과 ItemName 사이 간격 */
`;

// 5. 하단 정보 행
const InfoRow = styled.div`
  display: flex;
  flex-direction: row;
  gap: 4px;        /* 점과 텍스트 사이 간격 */
  font-size: 12px;
  color: #808080;
  align-items: center;
`;

const Dot = styled.span`
  margin: 0;
`;

// 6. 텍스트 스타일 정의
const OwnerType = styled.span`
  font-size: 11px;
  font-weight: 600;
  color: ${(props) => (props.type === 'mine' ? '#E53935' : '#1976D2')};
  /* 내 물건=빨강, 네 물건=파랑 */
`;

const ItemName = styled.span`
  font-size: 20px;
  font-weight: 500;
  color: #000;
`;

const TimePosted = styled.span``;
const FoundPlace = styled.span``;

// 7. 카드 컴포넌트
const Card = ({ id, imageUrl, altText, ownerType, itemName, timePosted, foundPlace }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/post-detail/${id}`);
  };

  return (
    <CardContainer onClick={handleClick}>
      {imageUrl && <CardImage src={imageUrl} alt={altText || "카드 이미지"} />}
      <CardContent>
        <OwnerItemGap>
          <OwnerType type={ownerType === '내 물건' ? 'mine' : 'yours'}>
            {ownerType}
          </OwnerType>
          <ItemName>{itemName}</ItemName>
        </OwnerItemGap>
        <InfoRow>
          <TimePosted>{timePosted}</TimePosted>
          <Dot>·</Dot>
          <FoundPlace>{foundPlace}</FoundPlace>
        </InfoRow>
      </CardContent>
    </CardContainer>
  );
};

export default Card;
