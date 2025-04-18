import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Icons } from "../../assets/icons.js";
import { Color } from "../../styles/colorsheet";

import MobileLayout from "../../components/Layout/MobileLayout";
import Container from "../../components/Layout/Container";
import Button from "../../components/Button/Button";

import DetailHeader from "./DatailHeader.js";
import ReviewSection from "../../components/Layout/ReviewSection";
import SubwayChart from "./SubwayChart.js";
import ReserveModal from "./ReserveModal";
import useViewDetail from "../../hooks/useViewDetail.js";
import MapSection from "./MapSection.js";

import { EventDetailData, reviewData, mapData, subwayData } from "./data";

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
  const {
    isReviewModalOpen,
    setIsReviewModalOpen,
    isReserveOpen,
    setIsReserveOpen,
    currentDay,
    subwayChartWithColor,
    currentHour,
  } = useViewDetail();

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

        <MapSection
          mapReady={mapReady}
          mapData={mapData}
          subwayName={subwayData.subwayName}
        />

        <SubwayChart
          data={subwayChartWithColor}
          currentHour={currentHour}
          subwayName={subwayData.subwayName}
          state={subwayData.state}
        />

        <BottomButton onClick={() => setIsReserveOpen(true)}>
          일정 추가
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
