import styled from 'styled-components';

const StyledButton = styled.button`
  width: 6.4375rem;
  height: 2.5625rem;
  padding: 0.6875rem 0.9375rem;
  `

function Button( {children, onClick, variant = primary, ...props}) {
  return (
    <button onClick={onClick}
    className={`button ${variant}`}
    {...props}>
      {children}
    </button>
  )
}

export default Button;