import { useRef, useState } from 'react';
import { Upload } from 'lucide-react';
import styled from 'styled-components';

const UploadContainer = styled.div`
  width: 422px;
  min-height: 407px;
  padding: 36px 28px;
  text-align: center;
  background-color: #ffffff;
  border: 2px solid #d5d9e2;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 18px;
  cursor: pointer;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    border-color: #b8bfd0;
    box-shadow: 0 16px 28px rgba(26, 30, 71, 0.08);
  }
`;

const UploadIcon = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 4px;
  color: #7a8197;
`;

const UploadButton = styled.div`
  background-color: #4f5476;
  color: #ffffff;
  padding: 10px 28px;
  border-radius: 12px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 15px;
  font-weight: 600;
`;

const UploadText = styled.p`
  color: #7a8197;
  font-size: 12px;
  margin: 0;
`;

const SelectedFileName = styled.p`
  margin-top: 16px;
  font-size: 13px;
  color: #4a5263;
`;

const FileUpload = ({ onFileSelect }) => {
  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);

  // ✅ 클릭 → input 클릭
  const handleClick = () => {
    fileInputRef.current.click();
  };

  // ✅ 파일 선택 핸들러
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setSelectedFile(file);

    // ✅ 상위 컴포넌트(LostItemForm)로 전달
    if (onFileSelect) {
      onFileSelect(file);
    }
  };

  return (
    <>
      <UploadContainer onClick={handleClick}>
        <UploadIcon>
          <Upload size={64} strokeWidth={1.8} />
        </UploadIcon>
        <UploadButton>이미지 업로드</UploadButton>
        <UploadText>또는 파일을 드래그하여 업로드하세요</UploadText>
        {selectedFile && (
          <SelectedFileName>선택된 파일: {selectedFile.name}</SelectedFileName>
        )}
      </UploadContainer>

      {/* ✅ 숨겨진 파일 선택 input */}
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />
    </>
  );
};

export default FileUpload;
