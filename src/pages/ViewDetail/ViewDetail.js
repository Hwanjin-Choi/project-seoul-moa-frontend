import styled from "styled-components";
import { Color } from "../../styles/colorsheet";

import MobileLayout from "../../components/Layout/MobileLayout";
import Button from "../../components/Button/Button";
import DetailHeader from "./DatailHeader.js";
import ReadReviewSection from "../../components/Layout/ReadReviewSection";
import SubwayChart from "./SubwayChart.js";
import ReserveModal from "./ReserveModal";
import useViewDetail from "../../hooks/useViewDetail.js";
import MapSection from "./MapSection.js";
import Container from "../../components/Layout/Container.js";
import EventDetail from "../../api/EventDetail.js";

import { reviewData, subwayData } from "./data";

const BottomButton = styled(Button)`
  width: 100%;
  margin-top: 17px;
  background-color: ${Color.MC1};
  color: white;
  @media (min-width: 768px) {
    margin-top: 20px;
  }

  @media (min-width: 1024px) {
    margin-top: 40px;
  }
`;

const ViewDetail = ({ mapReady }) => {
  const { eventData, loading } = EventDetail(59);

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

  if (loading || !eventData) return <div>로딩 중...</div>;

  return (
    <MobileLayout>
      <Container>
        <DetailHeader data={eventData} />

        <ReadReviewSection
          reviewData={reviewData}
          isOpen={isReviewModalOpen}
          setIsOpen={setIsReviewModalOpen}
        />

        <MapSection
          mapReady={mapReady}
          mapData={{
            latitude: eventData.longtitude,
            longitude: eventData.latitude,
          }}
          mapLocation={eventData}
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
      </Container>

      {isReserveOpen && (
        <ReserveModal
          onClose={() => setIsReserveOpen(false)}
          date={currentDay}
          data={eventData}
        />
      )}
    </MobileLayout>
  );
};

export default ViewDetail;