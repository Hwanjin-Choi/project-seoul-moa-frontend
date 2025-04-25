import styled from "styled-components";
import KakaoMap from "../../components/Map/KakaoMap";
import Typography from "../../components/Typography/Typography";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Icons } from "../../assets/icons";
import { Color } from "../../styles/colorsheet";

const MapBox = styled.div`
  width: 100%;
  height: 200px;
  border-radius: 10px;
  margin-top: 12px;
  z-index: 0;

  @media (min-width: 768px) {
    height: 300px;
  }

  @media (min-width: 1024px) {
    height: 400px;
  }
`;

const LocationBox = styled.div`
  display: flex;
  align-items: center;
  margin-top: 15px;
  gap: 5px;
  color: ${Color.MC1};
`;

const MapSection = ({ mapReady, mapData, mapLocation }) => {
  const lat = Number(mapData.latitude);
  const lng = Number(mapData.longitude);

  return (
    <>
      <Typography variant="h3" style={{ marginTop: 20 }}>지도</Typography>
      <MapBox>
        {mapReady && <KakaoMap lat={lat} lng={lng} />}
      </MapBox>
      <LocationBox>
        <FontAwesomeIcon icon={Icons.mapPin} />
        <Typography variant="h4" color={Color.MC1}>{mapLocation.location}</Typography>
      </LocationBox>
    </>
  );
};

export default MapSection;
