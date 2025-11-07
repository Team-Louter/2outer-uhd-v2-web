import styled, { css } from 'styled-components';

/**
 * @설명 기본 텍스트 스타일
 * @예시 <Text color="#3C71CD">파란색 글씨</Text>
 * @예시 <Text fontSize="24px">큰 글씨</Text>
 */

const baseTextStyle = css`
  font-family: 'Pretendard', sans-serif; // 기본 폰트 설정
  font-size: ${(props) => props.fontSize || '16px'}; // 글자 크기 기본 16px
  font-weight: ${(props) => props.fontWeight || '400'}; // 글자 굵기 기본 regular(400)
  color: ${(props) => props.color || '#000'}; // 글자 색 기본 검정
  line-height: ${(props) => props.lineHeight || '1.5'}; // 줄 높이 기본 1.5
  margin: ${(props) => props.margin || '0'}; // 외부 여백 기본 0
  text-align: ${(props) => props.textAlign || 'left'}; // 정렬 기본 left
`;

// 실제 Text 컴포넌트의 스타일 적용
const StyledText = styled.p`
  ${baseTextStyle}
`;

// Text 컴포넌트
// children과 전달받은 props를 StyledText에 그대로 전달
const Text = ({ children, ...props }) => <StyledText {...props}>{children}</StyledText>;

export default Text;