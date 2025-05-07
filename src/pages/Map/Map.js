import React, { useState, useEffect, useRef } from "react";
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

  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [error, setError] = useState(null);

  const mapContainer = useRef(null);

  useEffect(() => {
    // 브라우저가 Geolocation API를 지원하는지 확인합니다.
    if (!navigator.geolocation) {
      setError("브라우저 위치 정보 오류");
      return;
    }

    // 사용자의 현재 위치를 가져옵니다.
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
      },
      (err) => {
        // 오류 처리: 사용자가 권한을 거부했거나 다른 오류가 발생한 경우
        switch (err.code) {
          case err.PERMISSION_DENIED:
            setError("전하, 위치 정보 접근 권한을 허용해주셔야 합니다.");
            break;
          case err.POSITION_UNAVAILABLE:
            setError("전하, 현재 위치 정보를 가져올 수 없습니다.");
            break;
          case err.TIMEOUT:
            setError(
              "전하, 위치 정보를 가져오는 데 시간이 너무 오래 걸립니다."
            );
            break;
          default:
            setError(
              "전하, 알 수 없는 오류로 위치 정보를 가져오는 데 실패했습니다."
            );
            break;
        }
      }
    );
  }, []); // 컴포넌트가 마운트될 때 한 번만 실행합니다.

  useEffect(() => {
    // window.kakao와 kakao.maps가 로드되었는지, 그리고 mapContainer.current가 존재하는지 확인
    if (window.kakao && window.kakao.maps && mapContainer.current) {
      const mapOption = {
        center: new window.kakao.maps.LatLng(latitude, longitude), // 중심 좌표
        level: 3, // 확대 레벨
      };
      const map = new window.kakao.maps.Map(mapContainer.current, mapOption);
      // 추가적인 마커, 컨트롤 등을 설정할 수 있습니다.
    }
  }, [latitude, longitude]); // lat, lng가 변경될 때 지도를 다시 그리거나 업데이트 할 수 있습니다.

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
          {/* 조건 1: 검색 결과가 있고, 해당 결과에 유효한 위도/경도 값이 있는 경우 */}
          {mapReady &&
          searchResult.length > 0 &&
          searchResult[0]?.latitude != null &&
          searchResult[0]?.longitude != null ? (
            <>
              <KakaoMap
                lat={Number(searchResult[0].latitude)}
                lng={Number(searchResult[0].longitude)}
              />
            </>
          ) : // 조건 2: 사용자 현재 위치의 위도/경도 값이 유효한 경우
          latitude != null && longitude != null ? ( // null/undefined 확인
            <>
              <KakaoMap lat={Number(latitude)} lng={Number(longitude)} />
            </>
          ) : (
            // 조건 1과 2 모두 해당하지 않는 경우 (오류 또는 데이터 없음)
            // error 상태에 메시지가 있으면 해당 메시지를, 없으면 기본 메시지를 표시
            <p>
              {error ||
                "지도를 표시할 위치 정보를 가져오고 있거나 현재 사용할 수 없습니다."}
            </p>
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
