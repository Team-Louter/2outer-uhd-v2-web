import Label from '../atom/Label.jsx';
import Input from '../atoms/Input.jsx';
import styled from 'styled-components';

const FieldContainer = styled.div`
  margin-bottom: 24px;
`;

const InputField = ({ StyledButton, StyledInput = false, ...inputProps }) => {
  return (
    <FieldContainer>
      <Label required={required}>{label}</Label>
      <Input {...inputProps} />
    </FieldContainer>
  );
};

export default InputField;