import React from 'react';
import styled from 'styled-components';

/**
 * @설명 섹션 타이틀
 * @사용가능한_크기_및_모양_옵션
 *   - title: 섹션의 제목 (예: 최근 등록된 게시물)
 * @예시
 *   <SectionHeader title={"최근 등록된 게시물"} />
 */

const HeaderWrapper = styled.div`
  margin-bottom: 1.5rem;
`;

const Title = styled.p`
  font-size: 1.5rem;
  font-weight: 600;
  color: #1a1e47;
  margin-bottom: 1rem;
  margin-top: 1rem;
  padding-left: 4rem;
`;

const Divider = styled.hr`
  border: none;
  height: 2px;
  background-color: #e0e0e0;
`;

const SectionHeader = ({ title }) => {
  return (
    <HeaderWrapper>
      <Title>{title}</Title>
      <Divider />
    </HeaderWrapper>
  );
};

export default SectionHeader;