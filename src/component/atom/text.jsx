import styled, { css } from 'styled-components';
import { FONT_WEIGHTS } from './constants';

/**
 * @설명 기본 텍스트 스타일
 * @사용가능한_variant_값
 *   - 'thin': 매우 가는 글씨
 *   - 'extraLight': 조금 가는 글씨
 *   - 'light': 가는 글씨
 *   - 'regular': 일반 굵기
 *   - 'medium': 중간 굵기
 *   - 'semiBold': 약간 굵은 글씨
 *   - 'bold': 굵은 글씨
 *   - 'extraBold': 매우 굵은 글씨
 *   - 'black': 최대로 굵은 글씨
 * @예시 <Text variant="bold" color="#3C71CD">굵은 파란색 글씨</Text>
 * @예시 <Text variant="black" fontSize="24px">최대로 굵고 큰 글씨</Text>
 */

const baseTextStyle = css`
  font-family: 'Pretendard', sans-serif; // 기본 폰트 설정
  font-size: ${(props) => props.fontSize || '16px'}; // 글자 크기 기본 16px
  font-weight: ${(props) => props.fontWeight || FONT_WEIGHTS.regular}; // 글자 굵기 기본 regular
  color: ${(props) => props.color || '#000'}; // 글자 색 기본 검정
  line-height: ${(props) => props.lineHeight || '1.5'}; // 줄 높이 기본 1.5
  margin: ${(props) => props.margin || '0'}; // 외부 여백 기본 0
  text-align: ${(props) => props.textAlign || 'left'}; // 정렬 기본 left
`;

// variant별 폰트 굵기 스타일 정의
const textVariants = {
  thin: css`font-weight: ${FONT_WEIGHTS.thin};`,
  extraLight: css`font-weight: ${FONT_WEIGHTS.extraLight};`,
  light: css`font-weight: ${FONT_WEIGHTS.light};`,
  regular: css`font-weight: ${FONT_WEIGHTS.regular};`,
  medium: css`font-weight: ${FONT_WEIGHTS.medium};`,
  semiBold: css`font-weight: ${FONT_WEIGHTS.semiBold};`,
  bold: css`font-weight: ${FONT_WEIGHTS.bold};`,
  extraBold: css`font-weight: ${FONT_WEIGHTS.extraBold};`,
  black: css`font-weight: ${FONT_WEIGHTS.black};`,
};

// 실제 Text 컴포넌트의 스타일 적용
const StyledText = styled.p`
  ${baseTextStyle}
  ${(props) => props.variant && textVariants[props.variant]} // variant가 있으면 해당 스타일 추가
`;

// Text 컴포넌트
// children과 전달받은 props를 StyledText에 그대로 전달
const Text = ({ children, ...props }) => <StyledText {...props}>{children}</StyledText>;

export default Text;

