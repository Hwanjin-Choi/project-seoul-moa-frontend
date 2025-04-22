import styled from "styled-components";
import { Color } from "../../styles/colorsheet";

import MobileLayout from "../../components/Layout/MobileLayout";
import Button from "../../components/Button/Button";
import Navigation from "../../components/Navigation/Navigation.js";

import DetailHeader from "./DatailHeader.js";
import ReviewSection from "../../components/Layout/ReviewSection";
import SubwayChart from "./SubwayChart.js";
import ReserveModal from "./ReserveModal";
import useViewDetail from "../../hooks/useViewDetail.js";
import MapSection from "./MapSection.js";

import { EventDetailData, reviewData, mapData, subwayData } from "./data";

const BottomButton = styled(Button)`
  width: 100%;
  margin-top: 17px;
  margin-bottom: 17px;
  background-color: ${Color.MC1};
  color: white;
  @media (min-width: 768px) {
    margin-top: 20px;
    margin-bottom: 20px;
  }

  @media (min-width: 1024px) {
    margin-top: 40px;
    margin-bottom: 40px;
  }
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
    state,
  } = useViewDetail();

  return (
    <MobileLayout>
      <DetailHeader data={EventDetailData} />

      <ReviewSection
        reviewData={reviewData}
        isOpen={isReviewModalOpen}
        setIsOpen={setIsReviewModalOpen}
      />

      <MapSection
        mapReady={mapReady}
        mapData={mapData}
        mapLocation={EventDetailData}
      />

      <SubwayChart
        data={subwayChartWithColor}
        currentHour={currentHour}
        subwayName={subwayData.subwayName}
        state={state}
      />

      <BottomButton onClick={() => setIsReserveOpen(true)}>
        일정 추가
      </BottomButton>
      <Navigation />

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