import { useRef, useState } from 'react';
import { Upload } from 'lucide-react';
import styled from 'styled-components';

const UploadContainer = styled.div`
  border: 2px dashed #cbd5e0;
  border-radius: 8px;
  padding: 40px 20px;
  text-align: center;
  background-color: #f7fafc;
  transition: all 0.2s ease;
  cursor: pointer;
  
  &:hover {
    border-color: #4299e1;
    background-color: #ebf8ff;
  }
`;

const UploadIcon = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 16px;
  color: #a0aec0;
`;

const UploadButton = styled.div`
  background-color: #4a5568;
  color: white;
  padding: 8px 16px;
  border-radius: 6px;
  display: inline-block;
  margin-bottom: 8px;
  font-size: 14px;
  font-weight: 500;
`;

const UploadText = styled.p`
  color: #718096;
  font-size: 12px;
  margin: 0;
`;

const SelectedFileName = styled.p`
  margin-top: 12px;
  font-size: 13px;
  color: #4a5568;
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
          <Upload size={48} />
        </UploadIcon>
        <UploadButton>이미지 업로드</UploadButton>
        <UploadText>손으로 직접 올리기</UploadText>

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
