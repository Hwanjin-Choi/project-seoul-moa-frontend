import React, { useState } from "react";
import styled from "styled-components";
// BottomFilterForm을 기본으로 불러옵니다.
import BottomFilterForm from "../../components/BottomFilterForm/BottomFilterForm";
// MobileLayout을 불러옵니다.
import MobileLayout from "../../components/Layout/MobileLayout";
// TopSearchBar를 이름으로 불러옵니다.
import { TopSearchBar } from "../../components/TopSearchBar/TopSearchBar";
import BottomSearchResult from "../../components/BottomSearchResult/BottomSearchResult";
// --- Layout Styled Components ---
// 전체 페이지 컨텐츠를 감싸는 Wrapper
const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%; /* MobileLayout이 높이를 제공한다고 가정 */
`;

// 상단 검색 바와 하단 필터 폼 사이의 주 컨텐츠 영역 (지도가 표시될 곳)
const ContentArea = styled.div`
  flex-grow: 1; /* 사용 가능한 모든 수직 공간 차지 */
  overflow-y: auto; /* 컨텐츠가 많을 경우 스크롤 */
  padding-top: 10px; /* 상단 패딩 */
  padding-bottom: 0; /* 하단 패딩 제거 */
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #e0e0e0; /* 임시 배경색 */
  min-height: 200px; /* 최소 높이 (임시) */
`;

// --- Map 컴포넌트 정의 ---
const Map = () => {
  // 필터 확장/축소 상태
  const [isFilterExpanded, setIsFilterExpanded] = useState(true); // 기본값: 펼쳐짐

  // 필터 확장/축소 상태를 토글하는 함수
  const toggleFilterExpansion = () => {
    setIsFilterExpanded(!isFilterExpanded);
  };

  // 검색 바 관련 상태 및 핸들러
  const [currentTags, setCurrentTags] = useState(["강남구"]); // 예시 태그
  const [filterForm, setFilterForm] = useState(false);

  // 검색 실행 핸들러
  const handleSearch = (term) => {
    console.log("검색어:", term);
    // 실제 검색 로직 구현 위치
  };

  // 필터 아이콘 클릭 핸들러
  const handleFilterClick = () => {
    console.log("필터 아이콘 클릭됨");
    // 필터 옵션 표시 로직 구현 위치
  };

  // 태그 제거 핸들러
  const handleRemoveTag = (tagToRemove) => {
    console.log("제거할 태그:", tagToRemove);
    setCurrentTags(currentTags.filter((tag) => tag !== tagToRemove));
  };

  // 필터 폼의 제목 변경 핸들러
  const handleTitleChange = (newTitle) => {
    console.log("제목 변경됨:", newTitle);
    // 제목 변경 관련 로직 구현 위치
  };

  // 지역 선택 핸들러 (BottomFilterForm에 전달)
  const handleRegionSelect = () => {
    console.log("Map 컴포넌트에서 지역 선택 처리");
    // 실제 지역 선택 관련 로직 구현 위치
  };

  // 카테고리 선택 핸들러 (BottomFilterForm에 전달)
  const handleCategorySelect = () => {
    console.log("Map 컴포넌트에서 카테고리 선택 처리");
    // 실제 카테고리 선택 관련 로직 구현 위치
  };
  const handleSearchBarClick = () => {
    setFilterForm(!filterForm);
  };

  return (
    // 전체 모바일 레이아웃 적용
    <MobileLayout>
      {/* 페이지 전체를 감싸는 Wrapper */}
      <PageWrapper>
        {/* 상단 검색 바 */}
        <TopSearchBar
          onSearch={handleSearch}
          onFilter={handleFilterClick}
          tags={currentTags}
          onRemoveTag={handleRemoveTag}
          onClick={handleSearchBarClick}
        />

        {/* 중앙 컨텐츠 영역 (지도 등) */}
        <ContentArea>
          {/* 실제 지도 컴포넌트가 위치할 자리 */}
          <h1>지도 표시 영역</h1>
        </ContentArea>

        {/* 하단 필터 폼 */}
        {filterForm ? (
          <BottomFilterForm
            onRegionSelect={handleRegionSelect} // 지역 선택 핸들러 전달
            onCategorySelect={handleCategorySelect} // 카테고리 선택 핸들러 전달
            onTitleChange={handleTitleChange} // 제목 변경 핸들러 전달
            isExpanded={isFilterExpanded} // 확장/축소 상태 전달
            onToggle={toggleFilterExpansion} // 토글 함수 전달
          />
        ) : (
          <BottomSearchResult
            isExpanded={isFilterExpanded} // 확장/축소 상태 전달
            onToggle={toggleFilterExpansion} // 토글 함수 전달
          />
        )}
      </PageWrapper>
    </MobileLayout>
  );
};

// Map 컴포넌트를 기본으로 내보냅니다.
export default Map;
