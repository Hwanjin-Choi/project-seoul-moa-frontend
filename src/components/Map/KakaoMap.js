import { useEffect, useRef } from "react";

const loadKakaoScript = () => {
  return new Promise((resolve) => {
    const existingScript = document.querySelector("script[src*='dapi.kakao.com']");
    if (existingScript) {
      if (window.kakao && window.kakao.maps) {
        resolve();
      } else {
        existingScript.addEventListener("load", resolve);
      }
      return;
    }

    const script = document.createElement("script");
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.REACT_APP_KAKAO_API_KEY}&autoload=false`;
    script.async = true;
    script.onload = () => resolve();
    document.head.appendChild(script);
  });
};

const KakaoMap = ({ lat, lng, stationLat, stationLng }) => {
  const mapRef = useRef(null);

  useEffect(() => {
    loadKakaoScript().then(() => {
      if (!window.kakao || !window.kakao.maps || !window.kakao.maps.load) {
        console.error("Kakao Maps SDK 로드 실패 또는 load 함수 없음");
        return;
      }

      window.kakao.maps.load(() => {
        const container = mapRef.current;
        if (!container) return;

        const center = new window.kakao.maps.LatLng(lat, lng);
        const map = new window.kakao.maps.Map(container, {
          center,
          level: 5,
        });

        new window.kakao.maps.Marker({
          position: center,
          map,
          title: "행사 위치",
        });

        if (
          typeof stationLat === "number" &&
          typeof stationLng === "number" &&
          !isNaN(stationLat) &&
          !isNaN(stationLng)
        ) {
          const markerImage = new window.kakao.maps.MarkerImage(
            "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png",
            new window.kakao.maps.Size(24, 35)
          );

          new window.kakao.maps.Marker({
            position: new window.kakao.maps.LatLng(stationLat, stationLng),
            map,
            image: markerImage,
            title: "지하철역 위치",
          });
        }
      });
    });
  }, [lat, lng, stationLat, stationLng]);

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
