import { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 19rem;
  padding: 28px;
  background: #f9fafb;
  border-radius: 12px;
  height: fit-content;
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
  margin: 0px 0px 12px 0px;
`;

const SearchField = styled.input`
  width: 100%;
  height: 2.5rem;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 0 12px;
  outline: none;
  font-size: 14px;
  box-sizing: border-box;
  
  &::placeholder {
    color: #808080;
  }
  
  &:focus {
    border-color: #1e2746;
  }
`;

const SearchButton = styled.button`
  width: 100%;
  height: 40px;
  background-color: #1e2746;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  color: #fff;
  cursor: pointer;
  margin-top: 12px;

  &:hover {
    background-color: #2a3454;
  }
`;

const FilterContainer = styled.div`
  margin-top: 20px;
`;

const FilterTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  margin: 0px 0px 12px 0px;
`;

const FilterButtons = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const FilterButton = styled.button`
  width: 100%;
  height: 40px;
  background-color: ${props => props.$active ? '#1e2746' : '#fff'};
  border: 1px solid ${props => props.$active ? '#1e2746' : '#e0e0e0'};
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  color: ${props => props.$active ? '#fff' : '#333'};
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: ${props => props.$active ? '#2a3454' : '#f5f5f5'};
  }
`;

const Filter = ({ 
  onSearch, 
  onFilterChange, 
  currentFilter,
  searchKeyword,
  setSearchKeyword 
}) => {
  const [localKeyword, setLocalKeyword] = useState(searchKeyword || "");

  const handleSearchClick = () => {
    if (onSearch) {
      onSearch(localKeyword);
    }
    if (setSearchKeyword) {
      setSearchKeyword(localKeyword);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearchClick();
    }
  };

  const handleFilterClick = (filter) => {
    if (onFilterChange) {
      onFilterChange(filter);
    }
    // Clear search when changing filter
    setLocalKeyword("");
    if (setSearchKeyword) {
      setSearchKeyword("");
    }
  };

  return (
    <Container>
      <TitleContainer>
        <Title>분실물</Title>
        <Caption>분실물이 주인을 찾고 있어요!</Caption>
      </TitleContainer>

      <FilterContainer>
        <FilterTitle>분류</FilterTitle>
        <FilterButtons>
          <FilterButton 
            $active={currentFilter === "all"} 
            onClick={() => handleFilterClick("all")}
          >
            전체
          </FilterButton>
          <FilterButton 
            $active={currentFilter === "FIND"} 
            onClick={() => handleFilterClick("FIND")}
          >
            습득물
          </FilterButton>
          <FilterButton 
            $active={currentFilter === "LOST"} 
            onClick={() => handleFilterClick("LOST")}
          >
            분실물
          </FilterButton>
        </FilterButtons>
      </FilterContainer>

      <SearchContainer>
        <SearchTitle>검색어</SearchTitle>
        <SearchField 
          placeholder='검색어를 입력하세요.' 
          value={localKeyword}
          onChange={(e) => setLocalKeyword(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <SearchButton onClick={handleSearchClick}>검색</SearchButton>
      </SearchContainer>
    </Container>
  );
};

export default Filter;
