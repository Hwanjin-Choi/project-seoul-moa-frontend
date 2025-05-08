import styled from "styled-components";
import { Color } from "../../styles/colorsheet";
import { useParams } from "react-router-dom";

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
import useReviewFetch from "../../hooks/useReviewFetch";
import EventDescriptionSection from "./EventDescriptionSection.js";
import WeatherSection from "./WeatherSection";

const BottomButton = styled(Button)`
  width: 100%;
  margin-top: 20px;
  margin-bottom: 20px;
  background-color: ${Color.MC1};
  color: white;
  @media (min-width: 768px) {
    margin-top: 20px;
    margin-bottom: 30px;
  }

  @media (min-width: 1024px) {
    margin-top: 40px;
    margin-bottom: 40px;
  }
`;

const ViewDetail = ({ mapReady }) => {
  const { eventId } = useParams();
  const { eventData, loading } = EventDetail(eventId);

  const {
    isReviewModalOpen,
    setIsReviewModalOpen,
    isReserveOpen,
    setIsReserveOpen,
    currentDay,
    subwayChartWithColor,
    currentHour,
    state,
  } = useViewDetail(eventId);

  const {
    reviews,
    fetchMoreReviews,
    hasMore,
    loading: reviewLoading,
  } = useReviewFetch(eventId);

  return (
    <MobileLayout>
      {loading || !eventData ? (
        <></>
      ) : (
        <>
          <Container>
            <DetailHeader data={eventData} />

            <EventDescriptionSection description={eventData.eventDescription} />

            <ReadReviewSection
              reviewData={reviews}
              isOpen={isReviewModalOpen}
              setIsOpen={setIsReviewModalOpen}
              fetchMore={fetchMoreReviews}
              hasMore={hasMore}
              loading={reviewLoading}
            />

            <MapSection
              mapReady={mapReady}
              mapData={{
                latitude: eventData.latitude,
                longitude: eventData.longitude,
              }}
              mapLocation={eventData}
            />

            <SubwayChart
              data={subwayChartWithColor}
              currentHour={currentHour}
              subwayName={eventData?.nearestStation?.name}
              subwayLine={eventData?.nearestStation?.line}
              state={state}
            />

            <WeatherSection gu={eventData.gu} />

            <BottomButton onClick={() => setIsReserveOpen(true)}>
              일정 추가
            </BottomButton>
          </Container>
          {isReserveOpen && (
            <ReserveModal
              onClose={() => setIsReserveOpen(false)}
              date={currentDay}
              data={eventData}
              eventId={eventId}
            />
          )}
        </>
      )}
    </MobileLayout>
  );
};

export default ViewDetail;
