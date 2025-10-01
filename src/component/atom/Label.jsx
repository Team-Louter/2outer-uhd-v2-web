import styled from 'styled-components';

const StyledLabel = styled.label`       
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: #2d3748;
  margin-bottom: 8px;
  
  ${props => props.required && `
    &::after {
      content: ' *';
      color: #e53e3e;
    }
  `}
`;//라벨에 색 넓이,높이 지정

const Label = ({ children, required = false, ...props }) => { //child,required요소를 Label필드에 지정
  return (
    <StyledLabel required={required} {...props}>{/*requied요소와 child 요소를 지정 */}
      {children}
    </StyledLabel>
  );
};

export default Label;