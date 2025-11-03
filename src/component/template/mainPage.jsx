// src/components/templates/MainPageTemplate.jsx
import React from 'react';
import Header from '../organisms/header';
import SectionHeader from '../molecules/sectionHeader';
import SearchSection from '../organisms/searchSection';
import CardsOrganism from '../organisms/cardArray';

const MainPageTemplate = () => {
  return (
    <div>
      <Header />
      <SearchSection />
      <SectionHeader title={'최근 등록된 게시물'} />
      <CardsOrganism />
    </div>
  );
};

export default MainPageTemplate;