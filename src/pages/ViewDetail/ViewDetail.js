import styled from "styled-components";
import { useState } from "react";

import Typography from "../../components/Typography/Typography";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Icons } from "../../assets/icons.js";
import { Color } from "../../styles/colorsheet";

import MobileLayout from "../../components/Layout/MobileLayout";
import Container from "../../components/Layout/Container";
import Button from "../../components/Button/Button";
import KakaoMap from "../../components/Map/KakaoMap";

import DetailHeader from "./DatailHeader.js";
import ReviewSection from "../../components/Layout/ReviewSection";
import SubwayChart from "./SubwayChart.js";
import ReserveModal from "./ReserveModal";

import {
  EventDetailData,
  reviewData,
  mapData,
  subwayData
} from "./data";

import useSubwayChartData from "../../hooks/useSubwayChartData.js";

const MapBox = styled.div`
  width: 100%;
  height: 200px;
  border-radius: 10px;
  margin-top: 12px;
  z-index: 0;
`;

const LocationBox = styled.div`
  display: flex;
  align-items: center;
  margin-top: 8px;
  gap: 4px;
  color: ${Color.MC1};
`;

const BottomButton = styled(Button)`
  width: 100%;
  margin-top: 16px;
  background-color: ${Color.MC1};
  color: white;
`;

const ViewDetailLayout = styled(Container)`
  background: linear-gradient(to top, ${Color.MC3}, ${Color.MC5});
  padding-bottom: 5vw;
  padding-top: 1.5vw;
`;

const TopBar = styled.div`
  position: sticky;
  top: 0;
  left: 0;
  width: 100%;
  padding: 0 25px;
  background-color: white;
  @media (min-width: 768px) {
    max-width: 720px;
    padding: 0 55px;
  }
  @media (min-width: 1024px) {
    max-width: 960px;
    padding: 0 70px;
  }
  z-index: 1;
  display: flex;
  align-items: center;
  height: 50px;
`;

const ViewDetail = ({ mapReady }) => {
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [isReserveOpen, setIsReserveOpen] = useState(false);
  const today = new Date();
  const currentDay = `${today.getFullYear()}년 ${today.getMonth() + 1}월 ${today.getDate()}일`;

  const { coloredData: subwayChartWithColor, currentHour } = useSubwayChartData(subwayData);
  return (
    <MobileLayout>
      <TopBar>
        <FontAwesomeIcon icon={Icons.back} />
      </TopBar>

      <ViewDetailLayout>
        <DetailHeader data={EventDetailData} />

        <ReviewSection
          reviewData={reviewData}
          isOpen={isReviewModalOpen}
          setIsOpen={setIsReviewModalOpen}
        />

        <Typography variant="h3" style={{ marginTop: 20 }}>지도</Typography>
        <MapBox>
          {mapReady && (
            <KakaoMap
              lat={Number(mapData.latitude)}
              lng={Number(mapData.longitude)}
            />
          )}
        </MapBox>

        <LocationBox>
          <FontAwesomeIcon icon={Icons.mapPin} />
          <Typography variant="h3" color={Color.MC1}>
            {subwayData.subwayName}
          </Typography>
        </LocationBox>

        <SubwayChart
          data={subwayChartWithColor}
          currentHour={currentHour}
          subwayName={subwayData.subwayName}
          state={subwayData.state}
        />

        <BottomButton onClick={() => setIsReserveOpen(true)}>
          예약하기
        </BottomButton>
      </ViewDetailLayout>

      {isReserveOpen && (
        <ReserveModal
          onClose={() => setIsReserveOpen(false)}
          date={currentDay}
          data={EventDetailData}
        />
      )}
    </MobileLayout>
  );
};

export default ViewDetail;