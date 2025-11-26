import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  height: 36rem;
  width: 19rem;
  padding: 28px 28px;
`;
const TitleContainer = styled.div`
  width: 100%;
`;
const Title = styled.h1`
  font-size: 26px;
  margin: 0px;
`;
const Caption = styled.span`
  font-size: 16px;
  color: #808080;
`;
const SearchContainer = styled.div`
  width: 100%;
  margin-top: 20px;
`;
const SearchTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  margin: 0px;
`;
const SearchField = styled.input`
  width: 11rem;
  height: 2rem;
  border: 0px;
  border-bottom: 1px solid #c0c0c0;
  outline: none;
  font-size: 16px;
  &::placeholder {
    color: #808080;
  }
`;
const SearchButton = styled.button`
  width: 57px;
  height: 36px;
  background-color: #ffffff;
  border: 1px solid #c0c0c0;
  border-radius: 10px;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    background-color: #dfdfdf;
  }
`;
const FieldButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const Filter = () => {
  return (
    <Container>
      <TitleContainer>
        <Title>분실물</Title>
        <Caption>분실물이 주인을 찾고 있어요!</Caption>
      </TitleContainer>
      <SearchContainer>
        <SearchTitle>검색어</SearchTitle>
        <FieldButtonContainer>
          <SearchField placeholder='검색어를 입력하세요.' />
          <SearchButton>검색</SearchButton>
        </FieldButtonContainer>
      </SearchContainer>
    </Container>
  );
};

export default Filter;
