import Label from '../atom/Label.jsx';
import Input from '../atom/Input.jsx';
import styled from 'styled-components';

const FieldContainer = styled.div`
  margin-bottom: 24px;
`;

const InputField = ({ label, required = false, ...inputProps }) => {
  return (
    <FieldContainer>
      <Label required={required}>{label}</Label>
      <Input {...inputProps} />
    </FieldContainer>
  );
};

export default InputField;