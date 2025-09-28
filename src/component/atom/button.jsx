import styled, {css} from 'styled-components';

const commonButtonStyle = css `
  width: 6.4375rem;
  height: 2.5625rem;
  padding: 0.6875rem 0.9375rem;
  cursor: pointer;
  border-radius: 10px;
  `

const buttonVariant = {
  primary: css `
  background-color: #1A1E47;
  color: #fff;
  border: none;
  `, 
  secondary: css`
  background-color: #fff;
  color: #1A1E47;
  border: solid 1px #808080;
  `
}

const StyledButton = styled.button`
  ${commonButtonStyle}
  ${props => buttonVariant[props.$variant || 'primary']}
  `

function Button( {children, onClick, variant = 'primary', ...props}) {
  return (
    <StyledButton onClick={onClick}
    $variant={variant}
    {...props}>
      {children}
    </StyledButton>
  )
}

export default Button;