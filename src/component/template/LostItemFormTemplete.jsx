import Header from '../organisms/header.jsx';
import styled from 'styled-components';

const PageContainer = styled.div`
  min-height: 100vh;
  background-color: #f7fafc;
`;

const PageHeader = styled.div`
  background-color: #2d3748;
  color: white;
  padding: 24px 32px;
`;

const PageTitle = styled.h1`
  font-size: 24px;
  font-weight: bold;
  margin: 0;
`;

const ContentArea = styled.main`
  padding: 24px;
`;

const LostItemFormTemplate = ({ children }) => {
  return (
    <PageContainer>
      <Header />
      <PageHeader>
        <PageTitle>분실물 등록 - 내 물건</PageTitle>
      </PageHeader>
      <ContentArea>
        {children}
      </ContentArea>
    </PageContainer>
  );
};

export default LostItemFormTemplate;