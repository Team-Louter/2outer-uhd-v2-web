import Header from '../organisms/header.jsx';
import styled from 'styled-components';

const PageContainer = styled.div`
  min-height: 100vh;
  background-color: #f7fafc;
`;

const PageHeader = styled.div`
  background-color: #1a1e47;
  color: white;
  padding: 24px 32px;
`;

const PageTitle = styled.h1`
  font-size: 24px;
  font-weight: bold;
  margin: 0;
`;

const PageDescription = styled.p`
  margin: 12px 0 0;
  font-size: 15px;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.85);
`;

const ContentArea = styled.main`
  padding: 24px;
`;

const LostItemFormTemplate = ({ title, description, children }) => {
  return (
    <PageContainer>
      <Header />
      <PageHeader>
        <PageTitle>{title}</PageTitle>
        {description && <PageDescription>{description}</PageDescription>}
      </PageHeader>
      <ContentArea>
        {children}
      </ContentArea>
    </PageContainer>
  );
};

export default LostItemFormTemplate;