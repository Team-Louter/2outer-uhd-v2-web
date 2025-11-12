import { useState } from 'react';
import InputField from '../molecules/InputField.jsx';
import TextAreaField from '../molecules/TextAreaField.jsx';
import CheckboxGroup from '../molecules/Checkbox.jsx';
import FileUpload from '../molecules/FileUpload.jsx';
import Button from '../atom/button.jsx';
import styled from 'styled-components';

const FormContainer = styled.form`
  max-width: 800px;
  margin: 0 auto;
  padding: 32px;
  background-color: white;
`;

const FormContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 32px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const LeftColumn = styled.div``;
const RightColumn = styled.div``;

const SubmitButtonContainer = styled.div`
  grid-column: 1 / -1;
  margin-top: 24px;
`;

const categoryOptions = [
  { id: 'electronics', label: '전자기기' },
  { id: 'clothing', label: '의류/액세서리' },
  { id: 'other', label: '기타' },
];

const initialFormState = {
  name: '',
  location: '',
  description: '',
  categories: [],
  file: null,
};

const formCopy = {
  lost: {
    labels: {
      name: '물품명',
      location: '위치',
      description: '간단 설명',
      category: '카테고리',
    },
    placeholders: {
      name: '잃어버린 물건의 이름을 입력하세요',
      location: '분실물이 있을 것으로 예상되는 위치를 입력해주세요',
      description: '분실물에 대한 상세 설명을 입력하세요. (100자 이내)',
    },
    submitText: '분실물 등록',
    endpoint: '/api/lost-item/register',
  },
  found: {
    labels: {
      name: '습득 물품명',
      location: '습득 위치',
      description: '보관/인계 정보',
      category: '카테고리',
    },
    placeholders: {
      name: '습득한 물품의 이름을 입력하세요',
      location: '물건을 발견한 위치를 입력하세요',
      description: '보관 장소나 전달 가능한 정보를 입력하세요. (100자 이내)',
    },
    submitText: '습득물 등록',
    endpoint: '/api/found-item/register',
  },
};

const LostItemForm = ({ mode = 'lost' }) => {
  // ✅ 입력값 상태 저장 (Controlled Components)
  const [form, setForm] = useState(initialFormState);
  const { labels, placeholders, submitText, endpoint } = formCopy[mode] || formCopy.lost;

  // ✅ 모든 필드 onChange 핸들러
  const handleChange = (field, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: value
    }));
  };

  // ✅ 체크박스 변경
  const handleCategoryChange = (values) => {
    setForm((prev) => ({
      ...prev,
      categories: values
    }));
  };

  // ✅ 파일 업로드 변경
  const handleFileChange = (file) => {
    setForm((prev) => ({
      ...prev,
      file
    }));
  };

  // ✅ 폼 제출
  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ 간단한 유효성 검사
    if (!form.name || !form.location || !form.description) {
      alert("모든 필수 항목을 입력하세요.");
      return;
    }

    // ✅ 서버로 보낼 FormData 구성 (파일 포함)
    const formData = new FormData();
    formData.append('name', form.name);
    formData.append('location', form.location);
    formData.append('description', form.description);
    formData.append('categories', JSON.stringify(form.categories));
    if (form.file) formData.append('file', form.file);

    try {
      // ✅ localhost or server 둘 다 자동 처리되도록 환경변수 사용
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';
      const response = await fetch(`${API_URL}${endpoint}`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('서버 오류');

      alert('등록이 완료되었습니다!');
      setForm(initialFormState);
    } catch (error) {
      console.error(error);
      alert('등록 중 문제가 발생했습니다.');
    }
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <FormContent>
        <LeftColumn>
          <InputField
            label={labels.name}
            required
            value={form.name}
            onChange={(e) => handleChange('name', e.target.value)}
            placeholder={placeholders.name}
          />

          <InputField
            label={labels.location}
            required
            value={form.location}
            onChange={(e) => handleChange('location', e.target.value)}
            placeholder={placeholders.location}
          />

          <TextAreaField
            label={labels.description}
            required
            value={form.description}
            onChange={(e) => handleChange('description', e.target.value)}
            placeholder={placeholders.description}
            maxLength={100}
          />

          <CheckboxGroup
            label={labels.category}
            required
            options={categoryOptions}
            value={form.categories}
            onChange={handleCategoryChange}
          />
        </LeftColumn>

        <RightColumn>
          <FileUpload onFileSelect={handleFileChange} />
        </RightColumn>

        <SubmitButtonContainer>
          <Button type="submit" fullWidth size="large">
            {submitText}
          </Button>
        </SubmitButtonContainer>
      </FormContent>
    </FormContainer>
  );
};

export default LostItemForm;
