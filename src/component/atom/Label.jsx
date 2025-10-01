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
`;

const Label = ({ children, required = false, ...props }) => {
  return (
    <StyledLabel required={required} {...props}>
      {children}
    </StyledLabel>
  );
};

export default Label;