import React, { useState, useEffect } from "react";
import Header from "../component/organisms/header";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/useAuth";
import { getPostById, deletePost } from "../services/postService";
import { getCommentsByPost, createComment, deleteComment } from "../services/commentService";
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
import styled from "styled-components";

const LoadingContainer = styled.div`
  text-align: center;
  padding: 60px 0;
  color: #666;
`;

const ErrorContainer = styled.div`
  text-align: center;
  padding: 60px 0;
  color: #ef4444;
`;

const DeleteCommentButton = styled.button`
  font-size: 12px;
  color: #ef4444;
  background: none;
  border: none;
  cursor: pointer;
  margin-left: 12px;
  
  &:hover {
    text-decoration: underline;
  }
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 16px;
`;

const ActionButton = styled.button`
  padding: 8px 16px;
  font-size: 14px;
  border-radius: 8px;
  cursor: pointer;
  
  &.delete {
    background: #fff;
    border: 1px solid #ef4444;
    color: #ef4444;
    
    &:hover {
      background: #fef2f2;
    }
  }
`;

const PostDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const response = await getPostById(id);
        
        if (response.success && response.data) {
          setPost(response.data);
        } else {
          setError(response.error || response.message || "게시글을 불러오는데 실패했습니다.");
        }
      } catch (err) {
        if (err.response?.data?.error) {
          setError(err.response.data.error);
        } else {
          setError("게시글을 불러오는 중 오류가 발생했습니다.");
        }
      } finally {
        setLoading(false);
      }
    };

    const fetchComments = async () => {
      try {
        const response = await getCommentsByPost(id);
        
        if (response.success && response.data) {
          setComments(response.data.comments || []);
        }
      } catch (err) {
        console.error("댓글을 불러오는데 실패했습니다.", err);
      }
    };

    fetchPost();
    fetchComments();
  }, [id]);

  const handleBack = () => {
    navigate(-1);
  };

  const handleSendComment = async () => {
    if (!comment.trim()) return;
    
    if (!isAuthenticated()) {
      alert("댓글을 작성하려면 로그인이 필요합니다.");
      navigate("/signin");
      return;
    }

    try {
      setSubmitting(true);
      const response = await createComment({
        userId: user.userId,
        postId: parseInt(id),
        commentContent: comment
      });
      
      if (response.success && response.data) {
        setComments([...comments, response.data]);
        setComment("");
      } else {
        alert(response.error || response.message || "댓글 작성에 실패했습니다.");
      }
    } catch (err) {
      if (err.response?.data?.error) {
        alert(err.response.data.error);
      } else {
        alert("댓글 작성 중 오류가 발생했습니다.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteComment = async (commentId) => {
    if (!window.confirm("댓글을 삭제하시겠습니까?")) return;

    try {
      const response = await deleteComment(commentId, user.userId);
      
      if (response.success) {
        setComments(comments.filter(c => c.commentId !== commentId));
      } else {
        alert(response.error || response.message || "댓글 삭제에 실패했습니다.");
      }
    } catch (err) {
      if (err.response?.data?.error) {
        alert(err.response.data.error);
      } else {
        alert("댓글 삭제 중 오류가 발생했습니다.");
      }
    }
  };

  const handleDeletePost = async () => {
    if (!window.confirm("게시글을 삭제하시겠습니까?")) return;

    try {
      const response = await deletePost(id);
      
      if (response.success) {
        alert("게시글이 삭제되었습니다.");
        navigate("/list");
      } else {
        alert(response.error || response.message || "게시글 삭제에 실패했습니다.");
      }
    } catch (err) {
      if (err.response?.data?.error) {
        alert(err.response.data.error);
      } else {
        alert("게시글 삭제 중 오류가 발생했습니다.");
      }
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendComment();
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "long",
      day: "numeric",
      weekday: "short",
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  const formatCommentDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  if (loading) {
    return (
      <>
        <Header />
        <Container>
          <LoadingContainer>로딩 중...</LoadingContainer>
        </Container>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Header />
        <Container>
          <BackButton onClick={handleBack}>←</BackButton>
          <ErrorContainer>{error}</ErrorContainer>
        </Container>
      </>
    );
  }

  if (!post) {
    return (
      <>
        <Header />
        <Container>
          <BackButton onClick={handleBack}>←</BackButton>
          <ErrorContainer>게시글을 찾을 수 없습니다.</ErrorContainer>
        </Container>
      </>
    );
  }

  const isOwner = isAuthenticated() && user?.userId === post.userId;

  return (
    <>
      <Header />
      <Container>
        <BackButton onClick={handleBack}>←</BackButton>

        <ContentWrapper>
          <ImageSection>
            <img src={post.postImage || "https://via.placeholder.com/400x300?text=No+Image"} alt={post.postTitle} />
          </ImageSection>

          <InfoSection>
            <TagBadge>{post.postStatus === "FIND" ? "습득물" : "분실물"}</TagBadge>
            <Title>{post.postTitle}</Title>
            <Location>
              <LocationIcon src={markerIcon} alt='location' />
              {post.postContent?.split('\n')[0] || "위치 정보 없음"}
            </Location>

            <SectionTitle>간단설명</SectionTitle>
            <Description>{post.postContent}</Description>

            <MetaInfo>
              <div>
                <MetaLabel>등록자</MetaLabel>
                <MetaValue>{post.userId}</MetaValue>
              </div>
              <div>
                <MetaLabel>등록일시</MetaLabel>
                <MetaValue>{formatDate(post.postCreatedAt)}</MetaValue>
              </div>
              <div>
                <MetaLabel>조회수</MetaLabel>
                <MetaValue>{post.viewers || 0}</MetaValue>
              </div>
            </MetaInfo>

            {isOwner && (
              <ActionButtons>
                <ActionButton className="delete" onClick={handleDeletePost}>
                  삭제
                </ActionButton>
              </ActionButtons>
            )}
          </InfoSection>
        </ContentWrapper>

        <CommentsSection>
          <CommentTitle>댓글 ({comments.length})</CommentTitle>

          <CommentInputWrapper>
            <CommentInput
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={isAuthenticated() ? '댓글을 입력해주세요.' : '로그인 후 댓글을 작성할 수 있습니다.'}
              disabled={submitting || !isAuthenticated()}
            />
            <SendButton onClick={handleSendComment} disabled={submitting || !isAuthenticated()}>
              <SendIcon src={sendIcon} alt='send' />
            </SendButton>
          </CommentInputWrapper>

          <CommentList>
            {comments.map((c) => (
              <CommentItem key={c.commentId}>
                <CommentAuthor>
                  {c.userName || c.userId}
                  {isAuthenticated() && user?.userId === c.userId && (
                    <DeleteCommentButton onClick={() => handleDeleteComment(c.commentId)}>
                      삭제
                    </DeleteCommentButton>
                  )}
                </CommentAuthor>
                <CommentText>{c.commentContent}</CommentText>
                <CommentTime>{formatCommentDate(c.commentCreatedAt)}</CommentTime>
              </CommentItem>
            ))}
          </CommentList>
        </CommentsSection>
      </Container>
    </>
  );
};

export default PostDetail;
