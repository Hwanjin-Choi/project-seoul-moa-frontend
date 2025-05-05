import { useEffect, useRef } from "react";

const KakaoMap = ({ lat, lng, stationLat, stationLng }) => {
  const mapRef = useRef(null);
  console.log(lat, lng, "from map compo");
  useEffect(() => {
    if (!window.kakao || !window.kakao.maps) return;

    const container = mapRef.current;
    if (!container) return;

    const center = new window.kakao.maps.LatLng(lat, lng);
    const map = new window.kakao.maps.Map(container, {
      center,
      level: 5,
    });

    new window.kakao.maps.Marker({
      position: new window.kakao.maps.LatLng(lat, lng),
      map,
      title: "행사 위치",
    });

    if (stationLat && stationLng) {
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
