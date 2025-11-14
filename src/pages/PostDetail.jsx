import React, { useState } from "react";
import Header from "../component/organisms/header";
import { useParams, useNavigate } from "react-router-dom";
import {
  Container,
  BackButton,
  ContentWrapper,
  ImageSection,
  InfoSection,
  TagBadge,
  Title,
  Location,
  LocationIcon,
  SectionTitle,
  Description,
  Category,
  CategoryLabel,
  CategoryValue,
  RegisterButton,
  CommentsSection,
  CommentTitle,
  CommentInputWrapper,
  CommentInput,
  SendButton,
  SendIcon,
  CommentList,
  CommentItem,
  CommentAuthor,
  CommentText,
  CommentTime,
  MetaInfo,
  MetaLabel,
  MetaValue,
} from "../styles/post-detail";
import markerIcon from "../assets/marker.png";
import sendIcon from "../assets/send.png";

const PostDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [comment, setComment] = useState("");

  // 샘플 데이터 - 실제로는 API에서 가져올 데이터
  const postData = {
    tag: "네 물건",
    title: "회색 스테인리스 텀블러를 찾았어요.",
    location: "실습동 2층 남자화장실 세면대 위",
    registrant: "황정빈",
    registrationTime: "2025년 9월 10일(수) 오후 5시 32분",
    description:
      "실습동 2층 남자화장실 세면대 위에서 회색 스테인리스 텀블러를 찾았어요. 뚜껑 색깔은 검은색이고 열면에 대스고 로고가 그려져 있어요.",
    category: "기타",
    image: "https://contents.sixshop.com/thumbnails/uploadedFiles/40894/product/image_1606273079515_750.jpg",
    comments: [
      {
        id: 1,
        author: "최현수",
        text: "그거 제껀데 어디로 가면 돼요????",
        time: "2025. 9. 10. 16:32",
      },
      {
        id: 2,
        author: "최현수",
        text: "그거 제껀데 어디로 가면 돼요????",
        time: "2025. 9. 10. 16:32",
      },
      {
        id: 3,
        author: "최현수",
        text: "그거 제껀데 어디로 가면 돼요????",
        time: "2025. 9. 10. 16:32",
      },
      {
        id: 4,
        author: "최현수",
        text: "그거 제껀데 어디로 가면 돼요????",
        time: "2025. 9. 10. 16:32",
      },
      {
        id: 5,
        author: "최현수",
        text: "그거 제껀데 어디로 가면 돼요????",
        time: "2025. 9. 10. 16:32",
      },
    ],
  };

  const handleBack = () => {
    navigate(-1);
  };

  const handleSendComment = () => {
    if (comment.trim()) {
      // 댓글 전송 로직
      console.log("댓글:", comment);
      setComment("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendComment();
    }
  };

  return (
    <>
      <Header />
      <Container>
        <BackButton onClick={handleBack}>←</BackButton>

        <ContentWrapper>
          <ImageSection>
            <img src={postData.image} alt={postData.title} />
            <MetaInfo>
              <div>
                <MetaLabel>등록자</MetaLabel>
                <MetaValue>{postData.registrant}</MetaValue>
              </div>
              <div>
                <MetaLabel>등록일시</MetaLabel>
                <MetaValue>{postData.registrationTime}</MetaValue>
              </div>
            </MetaInfo>
          </ImageSection>

          <InfoSection>
            <TagBadge>{postData.tag}</TagBadge>
            <Title>{postData.title}</Title>
            <Location>
              <LocationIcon src={markerIcon} alt='location' />
              {postData.location}
            </Location>

            <SectionTitle>간단설명</SectionTitle>
            <Description>{postData.description}</Description>

            <Category>
              <CategoryLabel>카테고리</CategoryLabel>
              <CategoryValue>{postData.category}</CategoryValue>
            </Category>
          </InfoSection>
        </ContentWrapper>

        <CommentsSection>
          <CommentTitle>댓글</CommentTitle>

          <CommentInputWrapper>
            <CommentInput
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder='댓글을 입력해주세요.'
            />
            <SendButton onClick={handleSendComment}>
              <SendIcon src={sendIcon} alt='send' />
            </SendButton>
          </CommentInputWrapper>

          <CommentList>
            {postData.comments.map((comment) => (
              <CommentItem key={comment.id}>
                <CommentAuthor>{comment.author}</CommentAuthor>
                <CommentText>{comment.text}</CommentText>
                <CommentTime>{comment.time}</CommentTime>
              </CommentItem>
            ))}
          </CommentList>
        </CommentsSection>
      </Container>
    </>
  );
};

export default PostDetail;
