import { useEffect, useRef } from "react";

const KakaoMap = ({ lat, lng }) => {
  const mapRef = useRef(null);

  useEffect(() => {
    if (!window.kakao || !window.kakao.maps) return;

    const container = mapRef.current;
    const options = {
      center: new window.kakao.maps.LatLng(lat, lng),
      level: 3,
    };

    const map = new window.kakao.maps.Map(container, options);

    new window.kakao.maps.Marker({
      position: new window.kakao.maps.LatLng(lat, lng),
      map,
    });
  }, [lat, lng]);

  return (
    <div
      ref={mapRef}
      style={{
        width: "100%",
        height: "100%",
        borderRadius: "12px",
      }}
    />
  );
};

export default KakaoMap;