import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Header from "../component/organisms/header.jsx";
import { useAuth } from "../contexts/useAuth";
import { getPostsByUser, deletePost } from "../services/postService";

const MyPostPage = () => {
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    const fetchPosts = async () => {
      if (!user?.userId) return;
      
      try {
        setLoading(true);
        const response = await getPostsByUser(user.userId);
        
        if (response.success && response.data) {
          setPosts(response.data);
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

    fetchPosts();
  }, [user?.userId]);

  const handleDeletePost = async (postId) => {
    if (postId == null) {
      console.error("handleDeletePost: postId is undefined or null");
      alert("게시글 ID가 유효하지 않습니다.");
      return;
    }

    if (!window.confirm("정말 이 게시글을 삭제하시겠습니까?")) return;

    try {
      const response = await deletePost(postId);
      
      if (response.success) {
        setPosts(posts.filter(post => post.postId !== postId));
        alert("게시글이 삭제되었습니다.");
      } else {
        alert(response.error || response.message || "삭제에 실패했습니다.");
      }
    } catch (err) {
      if (err.response?.data?.error) {
        alert(err.response.data.error);
      } else {
        alert("삭제 중 오류가 발생했습니다.");
      }
    }
  };

  const handlePostClick = (postId) => {
    navigate(`/post-detail/${postId}`);
  };

  // Format date to user-friendly format
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  return (
    <Container>
      <Header />

      <Main>
        <Section>
          <Title>내 게시글</Title>

          {loading && <LoadingMessage>로딩 중...</LoadingMessage>}
          
          {error && <ErrorMessage>{error}</ErrorMessage>}

          {!loading && !error && posts.length === 0 && (
            <EmptyMessage>등록된 게시글이 없습니다.</EmptyMessage>
          )}

          <PostList>
            {posts.map((post) => (
              <PostItem key={post.postId}>
                <PostContent onClick={() => handlePostClick(post.postId)}>
                  <PostBadge $status={post.postStatus}>
                    {post.postStatus === "FIND" ? "습득물" : "분실물"}
                  </PostBadge>
                  <PostTitle>{post.postTitle}</PostTitle>
                  <PostMeta>
                    <span>{formatDate(post.postCreatedAt)}</span>
                    <span>조회 {post.viewers || 0}</span>
                  </PostMeta>
                </PostContent>
                <DeleteButton onClick={() => handleDeletePost(post.postId)}>
                  삭제
                </DeleteButton>
              </PostItem>
            ))}
          </PostList>
        </Section>
      </Main>
    </Container>
  );
};

export default MyPostPage;

// ==============================
// 🎨 styled-components 스타일 정의
// ==============================

const Container = styled.div`
  min-height: 100vh;
  background-color: #e9ebf1;
  font-family: "Pretendard", sans-serif;
`;

const Main = styled.main`
  display: flex;
  justify-content: center;
  padding: 48px 0;
`;

const Section = styled.section`
  width: 800px;
  background: #f3f4f8;
  border-radius: 8px;
  padding: 32px;
`;

const Title = styled.h2`
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 32px;
`;

const LoadingMessage = styled.div`
  text-align: center;
  color: #666;
  padding: 40px 0;
`;

const ErrorMessage = styled.div`
  text-align: center;
  color: #ef4444;
  padding: 20px 0;
`;

const EmptyMessage = styled.div`
  text-align: center;
  color: #666;
  padding: 40px 0;
`;

const PostList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const PostItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #fff;
  border-radius: 12px;
  padding: 20px 24px;
`;

const PostContent = styled.div`
  flex: 1;
  cursor: pointer;
  
  &:hover {
    opacity: 0.8;
  }
`;

const PostBadge = styled.span`
  display: inline-block;
  padding: 4px 8px;
  font-size: 12px;
  font-weight: 600;
  border-radius: 4px;
  margin-right: 8px;
  background-color: ${props => props.$status === "FIND" ? "#10b981" : "#ef4444"};
  color: white;
`;

const PostTitle = styled.div`
  font-size: 16px;
  font-weight: 600;
  margin: 8px 0;
`;

const PostMeta = styled.div`
  display: flex;
  gap: 16px;
  font-size: 13px;
  color: #888;
`;

const DeleteButton = styled.button`
  padding: 8px 16px;
  font-size: 14px;
  background: #fff;
  border: 1px solid #ef4444;
  border-radius: 8px;
  color: #ef4444;
  cursor: pointer;
  
  &:hover {
    background: #fef2f2;
  }
`;
