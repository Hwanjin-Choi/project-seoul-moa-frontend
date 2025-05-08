import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import BottomFilterForm from "../../components/BottomFilterForm/BottomFilterForm";
import MobileLayout from "../../components/Layout/MobileLayout";
import { TopSearchBar } from "../../components/TopSearchBar/TopSearchBar";
import BottomSearchResult from "../../components/BottomSearchResult/BottomSearchResult";
import BottomFilterFormDrag from "../../components/BottomFilterForm/BottomFilterFormDrag";
import ExpandableSearchFilter from "../../components/ExpandableSearchFilter/ExpandableSearchFilter";
import MapSection from "../ViewDetail/MapSection";
import KakaoMap from "../../components/Map/KakaoMap";

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%; /* MobileLayout이 높이를 제공한다고 가정 */
`;

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

const Map = ({ mapReady }) => {
  const [isFilterExpanded, setIsFilterExpanded] = useState(false);
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

  /*   useEffect(() => {
    if (!navigator.geolocation) {
      setError("브라우저 위치 정보 오류");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log("hihi");
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
      },
      (err) => {
        switch (err.code) {
          case err.PERMISSION_DENIED:
            setError("위치 정보 접근 권한을 허용해주셔야 합니다.");
            break;
          case err.POSITION_UNAVAILABLE:
            setError("현재 위치 정보를 가져올 수 없습니다.");
            break;
          case err.TIMEOUT:
            setError(" 위치 정보를 가져오는 데 시간이 너무 오래 걸립니다.");
            break;
          default:
            setError("알 수 없는 오류로 위치 정보를 가져오는 데 실패했습니다.");
            break;
        }
      }
    );
  }, []); */

  const getSuccess = (position) => {
    setLatitude(position.coords.latitude);
    setLongitude(position.coords.longitude);
  };

  const getError = () => {
    console.log("geolocation api error");
  };

  const options = {
    enableHighAccuracy: true,
    timeout: 5000, // 5 seconds
    maximumAge: 60000, // 1 minute
  };

  window.navigator.geolocation.getCurrentPosition(
    getSuccess,
    getError,
    options
  );

  useEffect(() => {
    if (window.kakao && window.kakao.maps && mapContainer.current) {
      const mapOption = {
        center: new window.kakao.maps.LatLng(latitude, longitude),
        level: 3,
      };
      const map = new window.kakao.maps.Map(mapContainer.current, mapOption);
    }
  }, [latitude, longitude]);

  const toggleFilterExpansion = () => {
    setIsFilterExpanded(!isFilterExpanded);
  };
  const toggleAlwaysExpandResult = () => {
    setIsFilterExpanded(true);
  };

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
            <p>
              {error ||
                "지도를 표시할 위치 정보를 가져오고 있거나 현재 사용할 수 없습니다."}
            </p>
          )}
        </ContentArea>

        <BottomSearchResult
          isExpanded={isFilterExpanded}
          onToggle={toggleFilterExpansion}
          searchResult={searchResult}
          handleSearchResult={setSearchResult}
          handleSearchParams={setSearchParams}
          searchParams={searchParams}
          totalCount={totalCount}
        />
      </PageWrapper>
    </MobileLayout>
  );
};

export default Map;
