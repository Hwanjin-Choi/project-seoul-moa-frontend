import { useEffect, useRef } from "react";

const KakaoMap = ({ lat, lng, stationLat, stationLng }) => {
  const mapRef = useRef(null);

  useEffect(() => {
    // window.kakao 객체와 window.kakao.maps 객체가 로드되었는지 먼저 확인합니다.
    // kakao.maps.load 함수 자체가 없을 수도 있으므로 kakao.maps도 확인합니다.
    if (!window.kakao || !window.kakao.maps || !window.kakao.maps.load) {
      console.error(
        "Kakao Maps SDK 스크립트가 로드되지 않았거나, load 함수를 찾을 수 없습니다."
      );
      // 필요하다면 여기에 스크립트를 동적으로 로드하는 로직을 추가할 수도 있습니다.
      // 하지만 일반적으로 index.html에 스크립트 태그를 포함하는 것이 권장됩니다.
      return;
    }

    // kakao.maps.load()를 사용하여 지도 API 로딩 완료 후 관련 로직을 실행합니다.
    window.kakao.maps.load(() => {
      const container = mapRef.current;
      if (!container) {
        console.error(
          "지도를 표시할 컨테이너(mapRef.current)를 찾을 수 없습니다."
        );
        return;
      }

      // 위도, 경도가 유효한 값인지 확인 (선택 사항이나 권장)
      if (
        typeof lat !== "number" ||
        typeof lng !== "number" ||
        isNaN(lat) ||
        isNaN(lng)
      ) {
        console.error("유효하지 않은 위도 또는 경도 값입니다.", { lat, lng });
        // 기본 위치를 설정하거나, 지도를 로드하지 않을 수 있습니다.
        // 예: return; 또는 기본 lat, lng 값 할당
        return;
      }

      const center = new window.kakao.maps.LatLng(lat, lng);
      const mapOptions = {
        center,
        level: 5,
      };
      const map = new window.kakao.maps.Map(container, mapOptions);

      // 행사 위치 마커
      new window.kakao.maps.Marker({
        position: new window.kakao.maps.LatLng(lat, lng),
        map,
        title: "행사 위치",
      });

      // 지하철역 위치 마커 (stationLat, stationLng가 유효할 때만)
      if (
        typeof stationLat === "number" &&
        typeof stationLng === "number" &&
        !isNaN(stationLat) &&
        !isNaN(stationLng)
      ) {
        const imageSrc =
          "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png";
        const imageSize = new window.kakao.maps.Size(24, 35);
        const markerImage = new window.kakao.maps.MarkerImage(
          imageSrc,
          imageSize
        );

        new window.kakao.maps.Marker({
          position: new window.kakao.maps.LatLng(stationLat, stationLng),
          map,
          image: markerImage,
          title: "지하철역 위치",
        });
      }
    });
  }, [lat, lng, stationLat, stationLng]); // 의존성 배열은 그대로 유지합니다.

  return (
    <div
      ref={mapRef}
      style={{
        width: "100%",
        height: "100%",
        borderRadius: "10px",
      }}
    />
  );
};

export default KakaoMap;
