import React, { useState } from "react";
import styled, { css } from "styled-components";
import MobileLayout from "../../components/Layout/MobileLayout";
import UpcomingEventsSection from "./UpcomingEventsSection";
import RecentlyReviewedEventsSection from "./RecentlyReviewedEventsSection";
import { Color } from "../../styles/colorsheet";
import SavedEventsSection from "./SavedEventsSection";

const ViewMorePageContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%; // MobileLayout의 콘텐츠 슬롯이 제공하는 높이를 100% 사용
  background-color: ${Color.White};
`;

// TabContainer: 탭 버튼들을 담는 컨테이너
const TabContainer = styled.div`
  display: flex;
  background-color: ${Color.White};
  padding: 0 10px; // 탭 좌우 내부 여백
  flex-shrink: 0; // 탭 컨테이너의 높이가 내용에 따라 줄어들지 않도록 고정

  @media (min-width: 769px) {
    padding: 0 20px; // 데스크탑에서의 탭 좌우 내부 여백
  }
`;

// TabButton: 개별 탭 버튼
const TabButton = styled.button`
  flex: 1; // 탭 버튼들이 가로 공간을 균등하게 차지
  padding: 12px 10px; // 탭 버튼 내부 패딩
  font-size: 16px;
  font-weight: 500;
  text-align: center;
  cursor: pointer;
  background-color: transparent;
  border: none;
  border-bottom: 3px solid transparent; // 비활성 탭의 하단 테두리
  color: ${Color.Gray500}; // 비활성 탭 텍스트 색상
  transition: all 0.3s ease; // 부드러운 상태 전환 효과

  ${(props) =>
    props.active &&
    css`
      color: ${Color.Black}; // 활성 탭 텍스트 색상
      font-weight: 700;
      border-bottom: 3px solid ${Color.Blue100}; // 활성 탭 하단 강조 테두리
    `}

  &:hover {
    color: ${Color.Black}; // 마우스 호버 시 텍스트 색상
  }

  @media (max-width: 768px) {
    font-size: 15px; // 모바일에서의 탭 버튼 폰트 크기
    padding: 10px 5px;
  }
`;

const TabContentContainer = styled.div`
  flex-grow: 1; // 사용 가능한 모든 세로 공간을 차지
  display: flex; // 자식 컴포넌트(활성 섹션)가 높이 100%를 효과적으로 사용하도록 설정
  flex-direction: column; // 자식 컴포넌트를 세로로 쌓음 (실제로는 하나만 렌더링됨)
  overflow: hidden; // 이 컨테이너 자체가 스크롤되는 것을 방지. 스크롤은 자식 섹션 내부 리스트에서 처리.
`;

const ViewMorePage = () => {
  const [activeTab, setActiveTab] = useState("upcoming");

  return (
    <MobileLayout>
      <ViewMorePageContainer>
        <TabContainer>
          <TabButton
            active={activeTab === "upcoming"}
            onClick={() => setActiveTab("upcoming")}
          >
            다가오는 문화행사
          </TabButton>
          <TabButton
            active={activeTab === "reviews"}
            onClick={() => setActiveTab("reviews")}
          >
            실시간 리뷰
          </TabButton>
          {localStorage.getItem("isLoggedIn") === "true" && (
            <TabButton
              active={activeTab === "saved"}
              onClick={() => setActiveTab("saved")}
            >
              저장된 행사
            </TabButton>
          )}
        </TabContainer>

        <TabContentContainer>
          {activeTab === "upcoming" && <UpcomingEventsSection />}
          {activeTab === "reviews" && <RecentlyReviewedEventsSection />}
          {activeTab === "saved" && <SavedEventsSection />}
        </TabContentContainer>
      </ViewMorePageContainer>
    </MobileLayout>
  );
};

export default ViewMorePage;
