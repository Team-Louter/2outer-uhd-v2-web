// src/components/templates/MainPageTemplate.jsx
import React from 'react';
import styled from 'styled-components'; // styled-components는 필요 없지만, 다른 스타일링이 있다면 남겨두세요.
import Header from '../organisms/header';
import SectionHeader from '../molecules/sectionHeader';
import SearchSection from '../organisms/searchSection';
import CardsOrganism from '../organisms/cardArray';

const MainPageTemplate = () => {
  return (
    <div>
      {/* 1. Header는 전체 너비 차지 */}
      <Header />
      
      {/* 2. 나머지 섹션들은 각자 max-width와 margin: 0 auto;를 통해 중앙 정렬됩니다. */}
      {/* 각 컴포넌트 내부에서 상하 마진(margin: 40px auto;)을 가지고 있으므로, 추가적인 Wrapper는 불필요합니다. */}
      <SearchSection />
      <SectionHeader title={'최근 등록된 게시물'} />
      <CardsOrganism />
    </div>
  );
};

export default MainPageTemplate;