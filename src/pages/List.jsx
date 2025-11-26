import Header from "../component/organisms/header";
import Filter from "../component/organisms/Filter";
import styled from "styled-components";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAllPosts, getPostsByStatus, searchPosts } from "../services/postService";

const Container = styled.div`
  background-color: #FFFFFF;
  min-height: 100vh;
`;

const ContentWrapper = styled.div`
  display: flex;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  gap: 40px;
`;

const PostsSection = styled.div`
  flex: 1;
`;

const PostsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const PostCount = styled.span`
  font-size: 14px;
  color: #666;
`;

const PostsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
`;

const PostCard = styled.div`
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
  }
`;

const PostImage = styled.div`
  height: 180px;
  background-color: #f0f0f0;
  background-image: url(${props => props.$image});
  background-size: cover;
  background-position: center;
`;

const PostInfo = styled.div`
  padding: 16px;
`;

const PostBadge = styled.span`
  display: inline-block;
  padding: 4px 8px;
  font-size: 12px;
  font-weight: 600;
  border-radius: 4px;
  background-color: ${props => props.$status === "FIND" ? "#10b981" : "#ef4444"};
  color: white;
`;

const PostTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  margin: 12px 0 8px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const PostMeta = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 13px;
  color: #888;
`;

const LoadingMessage = styled.div`
  text-align: center;
  padding: 60px 0;
  color: #666;
`;

const EmptyMessage = styled.div`
  text-align: center;
  padding: 60px 0;
  color: #666;
`;

const ErrorMessage = styled.div`
  text-align: center;
  padding: 20px;
  color: #ef4444;
`;

function List() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("all"); // "all", "FIND", "LOST"
  const [searchKeyword, setSearchKeyword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        setError("");
        
        let response;
        if (filter === "all") {
          response = await getAllPosts();
        } else {
          response = await getPostsByStatus(filter);
        }
        
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
  }, [filter]);

  const handleSearch = async (keyword) => {
    if (!keyword.trim()) {
      // Reload posts with current filter
      const loadPosts = async () => {
        try {
          setLoading(true);
          setError("");
          
          let response;
          if (filter === "all") {
            response = await getAllPosts();
          } else {
            response = await getPostsByStatus(filter);
          }
          
          if (response.success && response.data) {
            setPosts(response.data);
          }
        } catch (err) {
          console.error(err);
        } finally {
          setLoading(false);
        }
      };
      loadPosts();
      return;
    }

    try {
      setLoading(true);
      setError("");
      const response = await searchPosts(keyword);
      
      if (response.success && response.data) {
        setPosts(response.data);
      } else {
        setError(response.error || response.message || "검색에 실패했습니다.");
      }
    } catch (err) {
      if (err.response?.data?.error) {
        setError(err.response.data.error);
      } else {
        setError("검색 중 오류가 발생했습니다.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handlePostClick = (postId) => {
    navigate(`/post-detail/${postId}`);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "short",
      day: "numeric"
    });
  };

  return (
    <Container>
      <Header />
      <ContentWrapper>
        <Filter 
          onSearch={handleSearch}
          onFilterChange={setFilter}
          currentFilter={filter}
          searchKeyword={searchKeyword}
          setSearchKeyword={setSearchKeyword}
        />
        <PostsSection>
          <PostsHeader>
            <PostCount>총 {posts.length}건</PostCount>
          </PostsHeader>

          {error && <ErrorMessage>{error}</ErrorMessage>}
          
          {loading && <LoadingMessage>게시글을 불러오는 중...</LoadingMessage>}
          
          {!loading && !error && posts.length === 0 && (
            <EmptyMessage>게시글이 없습니다.</EmptyMessage>
          )}

          <PostsGrid>
            {posts.map((post) => (
              <PostCard key={post.postId} onClick={() => handlePostClick(post.postId)}>
                <PostImage $image={post.postImage} />
                <PostInfo>
                  <PostBadge $status={post.postStatus}>
                    {post.postStatus === "FIND" ? "습득물" : "분실물"}
                  </PostBadge>
                  <PostTitle>{post.postTitle}</PostTitle>
                  <PostMeta>
                    <span>{formatDate(post.postCreatedAt)}</span>
                    <span>조회 {post.viewers || 0}</span>
                  </PostMeta>
                </PostInfo>
              </PostCard>
            ))}
          </PostsGrid>
        </PostsSection>
      </ContentWrapper>
    </Container>
  );
}

export default List;