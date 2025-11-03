import styled from 'styled-components';
import Card from '../molecules/card';
import exCardImg from '../../assets/ex-card-img.png';

// 카드 그리드 컨테이너
const CardsGridContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  padding: 10px;
  justify-content: center;

  max-width: ${({ cardsPerRow }) =>
    `${(240 * cardsPerRow) + (24 * (cardsPerRow - 1))}px`}; /* (카드너비 * 개수) + (간격 * (개수-1)) */

  margin: 0 auto;
`;

const tempItems = [
  {
    id: 1,
    imageUrl: exCardImg,
    ownerType: '내 물건',
    itemName: '에어팟 프로',
    timePosted: '3시간 전',
    foundPlace: '도서관 3층'
  },
  {
    id: 2,
    imageUrl: exCardImg,
    ownerType: '네 물건',
    itemName: '검은색 우산',
    timePosted: '어제',
    foundPlace: '학생회관'
  },
  {
    id: 3,
    imageUrl: exCardImg,
    ownerType: '내 물건',
    itemName: '맥북 충전기',
    timePosted: '2일 전',
    foundPlace: '공학관 3층'
  },
  {
    id: 4,
    imageUrl: exCardImg,
    ownerType: '네 물건',
    itemName: '학생증',
    timePosted: '3일 전',
    foundPlace: '도서관 1층'
  },
  {
    id: 5,
    imageUrl: exCardImg,
    ownerType: '내 물건',
    itemName: '갤럭시 폰',
    timePosted: '4일 전',
    foundPlace: '강당'
  },
  {
    id: 6,
    imageUrl: exCardImg,
    ownerType: '네 물건',
    itemName: '지갑',
    timePosted: '5일 전',
    foundPlace: '식당'
  },
  {
    id: 7,
    imageUrl: exCardImg,
    ownerType: '내 물건',
    itemName: '노트북',
    timePosted: '6일 전',
    foundPlace: '컴퓨터실'
  },
  {
    id: 8,
    imageUrl: exCardImg,
    ownerType: '내 물건',
    itemName: '컴일 교과서',
    timePosted: '1주일 전',
    foundPlace: '강의실 301호'
  },
  {
    id: 9,
    imageUrl: exCardImg,
    ownerType: '네 물건',
    itemName: '파우치',
    timePosted: '2주일 전',
    foundPlace: '강의실 303호'
  },
  {
    id: 10,
    imageUrl: exCardImg,
    ownerType: '내 물건',
    itemName: '텀블러',
    timePosted: '4일 전',
    foundPlace: '강의실 102호'
  }
];


// 카드 올가니즘 컴포넌트
const CardsOrganism = ({ cardsPerRow = 5 }) => { // cardsPerRow는 기본 5로 설정
  return (
    // CardsGridContainer에 cardsPerRow 프롭스를 전달합니다.
    <CardsGridContainer cardsPerRow={cardsPerRow}>
      {tempItems.map((item) => (
        <Card
          key={item.id}
          imageUrl={item.imageUrl}
          altText={`${item.itemName} 이미지`}
          ownerType={item.ownerType}
          itemName={item.itemName}
          timePosted={item.timePosted}
          foundPlace={item.foundPlace}
        />
      ))}
    </CardsGridContainer>
  );
};

export default CardsOrganism;