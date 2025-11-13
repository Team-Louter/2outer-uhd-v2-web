import React, { useState } from "react";
import styled from "styled-components";
import Header from "../component/organisms/header.jsx"; // 공통 Header 재사용, 파일명 확인 필수

const MyPage = () => {
  const [loading, setLoading] = useState(false);

  const handleChangePassword = async () => {
    const newPassword = prompt("새 비밀번호를 입력하세요:");
    if (!newPassword) return;

    try {
      setLoading(true);
      const res = await fetch("http://localhost:4000/api/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: "hwangjb", newPassword }),
      });
      const data = await res.json();
      alert(data.message);
    } catch (err) {
      alert("서버 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (!window.confirm("정말 탈퇴하시겠습니까?")) return;

    try {
      setLoading(true);
      const res = await fetch("http://localhost:4000/api/delete-account", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: "hwangjb" }),
      });
      const data = await res.json();
      alert(data.message);
    } catch (err) {
      alert("서버 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      {/* 공통 Header 사용 */}
      <Header />

      <Main>
        <Section>
          <Title>내 정보</Title>

          <ProfileCard>
            <ProfileImage />
            <UserInfo>
              <UserName>황정빈</UserName>
              <UserId>@hwangjb</UserId>
            </UserInfo>
          </ProfileCard>

          <OptionList>
            <OptionItem onClick={handleChangePassword}>
              {loading ? "처리 중..." : "비밀번호 변경"}
            </OptionItem>
            <OptionItem onClick={handleDeleteAccount}>회원탈퇴</OptionItem>
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