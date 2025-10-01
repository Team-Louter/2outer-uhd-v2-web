import styled, { css } from 'styled-components';

// 버튼에 공통적으로 적용되는 스타일 정의
const commonButtonStyle = css`
  width: ${(props) => props.$width || '6.4375rem'};
  height: ${(props) => props.$height || '2.5625rem'};
  padding: 0.6875rem 0.9375rem;
  cursor: pointer;
  border-radius: ${(props) => props.$borderRadius || '10px'};
`;

/**
 * @설명 공통 버튼 컴포넌트
 * @사용가능한_variant_값
 *   - 'primary': 진한 남색 배경, 흰색 텍스트 (기본값)
 *   - 'secondary': 흰색 배경, 남색 텍스트 + 회색 테두리
 * @사용가능한_크기_및_모양_옵션
 *   - width: 버튼 가로 크기 (예: "200px", "10rem")
 *   - height: 버튼 세로 크기 (예: "60px")
 *   - borderRadius: 버튼 모서리 둥글기 (예: "30px", "50%")
 * @예시
 *   <Button>기본 버튼</Button>
 *   <Button width="200px" height="60px">커스텀 크기 버튼</Button>
 *   <Button borderRadius="30px" variant="secondary">둥근 버튼</Button>
 */


// 버튼 스타일을 variant 값에 따라 다르게 지정
const buttonVariant = {
  primary: css`
    background-color: #1A1E47;
    color: #fff;
    border: none;
  `,
  secondary: css`
    background-color: #fff;
    color: #1A1E47;
    border: solid 1px #808080;
  `,
};

// Styled-components로 버튼 컴포넌트 생성
const StyledButton = styled.button`
  ${commonButtonStyle}
  ${(props) => buttonVariant[props.$variant || 'primary']}
`;

// 기본 variant는 primary
function Button({ children, onClick, variant = 'primary', width, height, borderRadius, ...props }) {
  return (
    <StyledButton
      onClick={onClick}
      $variant={variant}
      $width={width}
      $height={height}
      $borderRadius={borderRadius}
      {...props}
    >
      {children}
    </StyledButton>
  );
}

export default Button;
