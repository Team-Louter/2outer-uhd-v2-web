import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import InputField from '../molecules/InputField.jsx';
import TextAreaField from '../molecules/TextAreaField.jsx';
import CheckboxGroup from '../molecules/Checkbox.jsx';
import FileUpload from '../molecules/FileUpload.jsx';
import Button from '../atom/button.jsx';
import styled from 'styled-components';
import { useAuth } from '../../contexts/useAuth';
import { createPost } from '../../services/postService';

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

const ErrorMessage = styled.div`
  color: #ef4444;
  font-size: 0.9rem;
  margin-bottom: 16px;
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
  imageUrl: '',
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
    postStatus: 'LOST',
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
    postStatus: 'FIND',
  },
};

const LostItemForm = ({ mode = 'lost' }) => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const [form, setForm] = useState(initialFormState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { labels, placeholders, submitText, postStatus } = formCopy[mode] || formCopy.lost;

  // 모든 필드 onChange 핸들러
  const handleChange = (field, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: value
    }));
  };

  // 체크박스 변경
  const handleCategoryChange = (values) => {
    setForm((prev) => ({
      ...prev,
      categories: values
    }));
  };

  // 파일 업로드 변경 (URL로 처리)
  const handleFileChange = (file) => {
    setForm((prev) => ({
      ...prev,
      file
    }));
    // 파일이 있으면 임시 URL 생성 (실제로는 파일 업로드 API 필요)
    if (file) {
      const url = URL.createObjectURL(file);
      setForm((prev) => ({
        ...prev,
        imageUrl: url
      }));
    }
  };

  // 폼 제출
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // 로그인 확인
    if (!isAuthenticated()) {
      alert("게시글을 등록하려면 로그인이 필요합니다.");
      navigate('/signin');
      return;
    }

    // 유효성 검사
    if (!form.name || !form.location || !form.description) {
      setError("모든 필수 항목을 입력하세요.");
      return;
    }

    setLoading(true);
    try {
      // 게시글 내용을 조합 (위치 + 설명)
      const postContent = `${form.location}\n\n${form.description}`;
      
      const response = await createPost({
        userId: user.userId,
        postTitle: form.name,
        postContent: postContent,
        postImage: form.imageUrl || '',
        postStatus: postStatus
      });

      if (response.success && response.data) {
        alert('등록이 완료되었습니다!');
        setForm(initialFormState);
        navigate(`/post-detail/${response.data.postId}`);
      } else {
        setError(response.error || response.message || '등록에 실패했습니다.');
      }
    } catch (err) {
      if (err.response?.data?.error) {
        setError(err.response.data.error);
      } else {
        setError('등록 중 문제가 발생했습니다.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      
      <FormContent>
        <LeftColumn>
          <InputField
            label={labels.name}
            required
            value={form.name}
            onChange={(e) => handleChange('name', e.target.value)}
            placeholder={placeholders.name}
            disabled={loading}
          />

          <InputField
            label={labels.location}
            required
            value={form.location}
            onChange={(e) => handleChange('location', e.target.value)}
            placeholder={placeholders.location}
            disabled={loading}
          />

          <TextAreaField
            label={labels.description}
            required
            value={form.description}
            onChange={(e) => handleChange('description', e.target.value)}
            placeholder={placeholders.description}
            maxLength={100}
            disabled={loading}
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
          <Button type="submit" fullWidth size="large" disabled={loading}>
            {loading ? '등록 중...' : submitText}
          </Button>
        </SubmitButtonContainer>
      </FormContent>
    </FormContainer>
  );
};

export default LostItemForm;
