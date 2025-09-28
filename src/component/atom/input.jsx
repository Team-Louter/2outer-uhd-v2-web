import styled, { css } from 'styled-components';

/**
 * @예시 <Input placeholder="아이디" />
 * @예시 <Input placeholder="비밀번호" type="password" />
 */

const baseInputStyle = css`
  width: ${(props) => props.width || '450px'};
  height: ${(props) => props.height || '58px'};
  background-color: ${(props) => props.$backgroundColor || '#EFEFEF'};
  border: none;
  border-radius: ${(props) => props.$borderRadius || '20px'};
  padding: 19px 25px;
`;

const StyledInput = styled.input`
  ${baseInputStyle}
`;

function Input(props) {
  return <StyledInput {...props} />;
}

export default Input;
