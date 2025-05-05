import React, { useState } from "react";
import styled from "styled-components";
// BottomFilterForm을 기본으로 불러옵니다.
import BottomFilterForm from "../../components/BottomFilterForm/BottomFilterForm";
// MobileLayout을 불러옵니다.
import MobileLayout from "../../components/Layout/MobileLayout";
// TopSearchBar를 이름으로 불러옵니다.
import { TopSearchBar } from "../../components/TopSearchBar/TopSearchBar";
import BottomSearchResult from "../../components/BottomSearchResult/BottomSearchResult";
import BottomFilterFormDrag from "../../components/BottomFilterForm/BottomFilterFormDrag";
import ExpandableSearchFilter from "../../components/ExpandableSearchFilter/ExpandableSearchFilter";
import MapSection from "../ViewDetail/MapSection";
import KakaoMap from "../../components/Map/KakaoMap";

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
`;

// --- Map 컴포넌트 정의 ---
const Map = ({ mapReady }) => {
  // 필터 확장/축소 상태
  const [isFilterExpanded, setIsFilterExpanded] = useState(false); // 기본값: 펼쳐짐
  const [searchResult, setSearchResult] = useState([]);
  const [searchParams, setSearchParams] = useState({
    categoryId: [],
    gu: [],
    title: "",
    offset: 0,
    limit: 1,
    isOpen: true,
  });
  const [totalCount, setTotalCount] = useState(0);

  // 필터 확장/축소 상태를 토글하는 함수
  const toggleFilterExpansion = () => {
    setIsFilterExpanded(!isFilterExpanded);
  };
  const toggleAlwaysExpandResult = () => {
    setIsFilterExpanded(true);
  };

  const [filterForm, setFilterForm] = useState(false);

  return (
    <MobileLayout>
      <PageWrapper>
        <ExpandableSearchFilter
          handleResultExpand={toggleAlwaysExpandResult}
          handleSearchResult={setSearchResult}
          handleSearchParams={setSearchParams}
          searchParams={searchParams}
          handleTotalCount={setTotalCount}
        />

        <ContentArea>
          {/* <MapSection
            mapReady={mapReady}
            mapData={{
              latitude: searchResult.latitude,
              longitude: searchResult.longitude,
            }}
            mapLocation={searchResult}
          /> */}

          {mapReady && searchResult.length > 0 && (
            <>
              <KakaoMap
                lat={Number(searchResult[0].latitude)}
                lng={Number(searchResult[0].longitude)}
              />
            </>
          )}
        </ContentArea>

        <BottomSearchResult
          isExpanded={isFilterExpanded} // 확장/축소 상태 전달
          onToggle={toggleFilterExpansion} // 토글 함수 전달
          searchResult={searchResult} //검색결과
          handleSearchResult={setSearchResult} //검색 결과 api
          handleSearchParams={setSearchParams} //검색 params useState
          searchParams={searchParams} //검색 params
          totalCount={totalCount}
        />
      </PageWrapper>
    </MobileLayout>
  );
};

// Map 컴포넌트를 기본으로 내보냅니다.
export default Map;
