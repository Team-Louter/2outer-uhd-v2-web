import styled from 'styled-components';
import Label from '../atom/Label.jsx';

const FieldContainer = styled.div`
  margin-bottom: 24px;
`;

const StyledTextArea = styled.textarea`
  width: 100%;
  min-height: 120px;
  resize: vertical;
  padding: 12px 16px;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-size: 16px;
  outline: none;
  transition: border-color 0.2s ease;

  &:focus {
    border-color: #4299e1;
  }
`;

const TextAreaField = ({ label, required = false, ...textareaProps }) => {
  return (
    <FieldContainer>
      <Label required={required}>{label}</Label>
      <StyledTextArea {...textareaProps} />
    </FieldContainer>
  );
};

export default TextAreaField;