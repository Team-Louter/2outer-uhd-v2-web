import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Header from "../component/organisms/header.jsx";
import { useAuth } from "../contexts/useAuth";
import { updatePassword } from "../services/authService";

const MyPage = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleChangePassword = async () => {
    const newPassword = prompt("새 비밀번호를 입력하세요 (숫자, 특수문자 포함 8자 이상):");
    if (!newPassword) return;

    // Password validation
    if (!/^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/.test(newPassword)) {
      alert("비밀번호는 숫자, 특수문자를 포함하여 8자 이상이어야 합니다.");
      return;
    }

    try {
      setLoading(true);
      const response = await updatePassword({
        userId: user?.userId,
        userPassword: newPassword
      });
      
      if (response.success && response.data?.success) {
        alert("비밀번호가 변경되었습니다.");
      } else {
        alert(response.error || response.message || "비밀번호 변경에 실패했습니다.");
      }
    } catch (err) {
      if (err.response?.data?.error) {
        alert(err.response.data.error);
      } else {
        alert("서버 오류가 발생했습니다.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    if (window.confirm("로그아웃 하시겠습니까?")) {
      logout();
      navigate("/");
    }
  };

  return (
    <Container>
      <Header />

      <Main>
        <Section>
          <Title>내 정보</Title>

          <ProfileCard>
            <ProfileImage />
            <UserInfo>
              <UserName>{user?.userName || "사용자"}</UserName>
              <UserId>@{user?.userId || "unknown"}</UserId>
            </UserInfo>
          </ProfileCard>

          <OptionList>
            <OptionItem onClick={handleChangePassword}>
              {loading ? "처리 중..." : "비밀번호 변경"}
            </OptionItem>
            <OptionItem onClick={handleLogout}>로그아웃</OptionItem>
          </OptionList>
        </Section>
      </Main>
    </Container>
  );
};

export default MyPage;

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
  width: 640px;
  background: #f3f4f8;
  border-radius: 8px;
  padding: 32px;
`;

const Title = styled.h2`
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 32px;
`;

const ProfileCard = styled.div`
  display: flex;
  align-items: center;
  background: #fff;
  border-radius: 12px;
  padding: 24px;
  margin-bottom: 24px;
`;

const ProfileImage = styled.div`
  width: 80px;
  height: 80px;
  background: #d9d9d9;
  border-radius: 50%;
  margin-right: 24px;
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const UserName = styled.div`
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 4px;
`;

const UserId = styled.div`
  font-size: 14px;
  color: #888;
`;

const OptionList = styled.div`
  background: #fff;
  border-radius: 12px;
  overflow: hidden;
`;

const OptionItem = styled.div`
  padding: 16px 24px;
  font-size: 16px;
  border-bottom: 1px solid #eee;
  cursor: pointer;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background-color: #f7f7f7;
  }
`;