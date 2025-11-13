import Label from '../atom/Label.jsx';
import Input from '../atoms/Input.jsx';
import styled from 'styled-components';

const FieldContainer = styled.div`
  margin-bottom: 24px;
`;

const InputField = ({ StyledButton, StyledInput = false, ...inputProps }) => { //스타일 모듈과 atom에 있는 Label,Input요소를 Input필드에 지정
  return (
    <FieldContainer>
      <Label required={required}>{label}</Label> {/*들고온 Label을 태그로 사용*/}
      <Input {...inputProps} /> {/*들고온 Input을 태그로 사용*/}
    </FieldContainer>
  );
};

export default InputField;