import styled from "styled-components";
import Input from "../atom/Input";
import Text from "../atom/text";
import bgImage from '../../assets/search-section-bg.png';

const SearchSectionContainer = styled.section`
  width: 100%;
  height: 17.375rem;
  background-image: url(${bgImage});
  background-size: cover;
  background-position: center;
  display: flex;
  justify-content: center;
  align-items: center;
`

const SearchContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 600px;
  gap: 1.5rem; // 라벨과 인풋 사이 간격
`

const SearchTitle = styled(Text)`
  font-family: 'esamanru OTF', sans-serif;
  font-size: 2rem;
  font-weight: 600;
  color: #ffffff;
  text-shadow: 0 0 5.5px rgba(0, 0, 0, 0.7);
`;

const SearchSection = () => {
  return (
    <SearchSectionContainer>
      <SearchContentContainer>
        <SearchTitle>대소고에서 어떤 물건을 찾으시나요?</SearchTitle>
        <Input placeholder="대구소프트웨어마이스터고에서 찾을 물건을 검색해보세요." width="100%"></Input>
      </SearchContentContainer>
    </SearchSectionContainer>
  )
}

export default SearchSection;