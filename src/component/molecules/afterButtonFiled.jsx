import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Button from '../atom/Button.jsx'; // 버튼 컴포넌트

// 버튼 주변 컨테이너 (아래쪽 여백 24px)
const FieldContainer = styled.div`
  margin-bottom: 24px;
`;

// AfterbuttonField 컴포넌트 정의
const AfterbuttonField = ({ to = '/', label = '다음', ...buttonProps }) => {
  const navigate = useNavigate(); // 페이지 이동 함수 준비

  // 버튼 클릭 시 이동
  const handleClick = () => {
    navigate(to);
  };

  return (
    <FieldContainer>
      {/* 버튼 렌더링, 글자색 흰색으로 지정 */}
      <Button
        onClick={handleClick}
        style={{ color: 'white' }} // 글자색 흰색
        {...buttonProps}
      >
        {label}
      </Button>
    </FieldContainer>
  );
};

export default AfterbuttonField;

/*
사용 예시:
<AfterbuttonField to="/next-page" label="다음 페이지로" />

→ 버튼 글자는 흰색, 클릭 시 "/next-page"로 이동
*/