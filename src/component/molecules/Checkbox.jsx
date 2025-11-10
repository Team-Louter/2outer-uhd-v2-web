import Label from '../atom/Label.jsx';
import styled from 'styled-components';

const FieldContainer = styled.div`
  margin-bottom: 24px;
`;

const CheckboxContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
`;

const Item = styled.label`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
`;

const Input = styled.input.attrs({ type: 'checkbox' })`
  width: 19px;
  height: 19px;
  border-radius: 4px;
  border: 1px solid #BFBFBF;
  cursor: pointer;
  accent-color: #BFBFBF;
`;

const Text = styled.span`
  user-select: none;
  font-size: 16px;
  color: #2B2B2B;
`;

// value: 선택된 id 배열, onChange: (ids:string[]) => void
const CheckboxGroup = ({ label, options, required = false, value = [], onChange }) => {
  const handleToggle = (id) => {
    if (!onChange) return;
    const exists = value.includes(id);
    const next = exists ? value.filter((v) => v !== id) : [...value, id];
    onChange(next);
  };

  return (
    <FieldContainer>
      <Label required={required}>{label}</Label>
      <CheckboxContainer>
        {options.map((option) => {
          const checked = value.includes(option.id);
          return (
            <Item key={option.id}>
              <Input
                checked={checked}
                onChange={() => handleToggle(option.id)}
              />
              <Text>{option.label}</Text>
            </Item>
          );
        })}
      </CheckboxContainer>
    </FieldContainer>
  );
};

export default CheckboxGroup;


