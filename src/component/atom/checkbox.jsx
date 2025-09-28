import { useState } from 'react';
import styled from 'styled-components';

const CheckboxContainer = styled.label`
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  gap: 8px;
`;

const StyledCheckbox = styled.input.attrs({ type: 'checkbox' })`
  width: 19px;
  height: 19px;
  border-radius: 4px;
  border: 1px solid #BFBFBF;
  cursor: pointer;
  accent-color: #BFBFBF;
`;

const LabelText = styled.span`
  user-select: none;
  font-size: 16px;
  color: #2B2B2B;
`;

export default function Checkbox({ label }) {
  const [checked, setChecked] = useState(false);

  const handleChange = () => {
    setChecked(prev => !prev);
  };

  return (
    <CheckboxContainer>
      <StyledCheckbox checked={checked} onChange={handleChange} />
      <LabelText>{label}</LabelText>
    </CheckboxContainer>
  );
}
