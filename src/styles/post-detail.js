import styled from 'styled-components';

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
  background-color: #ffffff;
`;

export const BackButton = styled.button`
  background: none;
  border: none;
  font-size: 32px;
  cursor: pointer;
  padding: 10px;
  margin-bottom: 30px;
  color: #000;
  
  &:hover {
    opacity: 0.7;
  }
`;

export const ContentWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  margin-bottom: 60px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 30px;
  }
`;

export const ImageSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;

  img {
    width: 100%;
    max-width: 534px;
    height: auto;
    border-radius: 12px;
    object-fit: cover;
  }
`;

export const MetaInfo = styled.div`
  margin-top: 140px;
  display: flex;
  gap: 40px;
  font-size: 14px;
  color: #666;

  > div {
    display: flex;
    align-items: center;
    gap: 8px;
  }
`;

export const MetaLabel = styled.span`
  color: #999;
`;

export const MetaValue = styled.span`
  color: #333;
`;

export const InfoSection = styled.div`
  display: flex;
  flex-direction: column;
`;

export const TagBadge = styled.span`
  display: inline-block;
  background-color: #ffffffff;
  color: #3C71CD;

  border-radius: 20px;
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 16px;
  width: fit-content;
`;

export const Title = styled.h1`
  font-size: 24px;
  font-weight: 700;
  color: #000;
  margin: 0 0 12px 0;
  line-height: 1.4;
`;

export const Location = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 16px;
  color: #333;
  margin-bottom: 40px;
`;

export const LocationIcon = styled.img`
  width: 20px;
  height: 20px;
  object-fit: contain;
`;

export const SectionTitle = styled.h2`
  font-size: 18px;
  font-weight: 700;
  color: #000;
  margin: 0 0 12px 0;
`;

export const Description = styled.p`
  font-size: 16px;
  color: #333;
  line-height: 1.6;
  margin: 0 0 40px 0;
`;

export const Category = styled.div`
  margin-bottom: 30px;
`;

export const CategoryLabel = styled.div`
  font-size: 18px;
  font-weight: 700;
  color: #000;
  margin-bottom: 8px;
`;

export const CategoryValue = styled.div`
  font-size: 16px;
  color: #333;
`;

export const RegisterButton = styled.button`
  background-color: #1A1E47;
  color: #ffffff;
  border: none;
  border-radius: 8px;
  padding: 16px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  width: 100%;
  transition: background-color 0.2s;

  &:hover {
    background-color: #1f2740;
  }
`;

export const CommentsSection = styled.div`
  border-top: 1px solid #e0e0e0;
  padding-top: 40px;
`;

export const CommentTitle = styled.h2`
  font-size: 20px;
  font-weight: 700;
  color: #000;
  margin: 0 0 24px 0;
`;

export const CommentInputWrapper = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 30px;
  background-color: #f5f5f5;
  border-radius: 8px;
  padding: 4px;
  align-items: center;
`;

export const CommentInput = styled.input`
  flex: 1;
  border: none;
  background: transparent;
  padding: 12px 16px;
  font-size: 14px;
  outline: none;

  &::placeholder {
    color: #999;
  }
`;

export const SendButton = styled.button`
  background-color: #111111, 1;
  border: none;
  border-radius: 6px;
  padding: 10px 16px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const SendIcon = styled.img`
  width: 20px;
  height: 20px;
  object-fit: contain;
`;

export const CommentList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const CommentItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const CommentAuthor = styled.div`
  font-size: 14px;
  font-weight: 700;
  color: #000;
`;

export const CommentText = styled.div`
  font-size: 14px;
  color: #333;
  line-height: 1.5;
`;

export const CommentTime = styled.div`
  font-size: 12px;
  color: #999;
`;