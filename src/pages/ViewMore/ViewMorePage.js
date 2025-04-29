import React from "react";
import styled from "styled-components";
import MobileLayout from "../../components/Layout/MobileLayout";
import Typography from "../../components/Typography/Typography";
import NoBorderLandscapeCard from "../../components/NoBorderLandscapeCard/NoBorderLandscapeCard";
import EmptyListMessage from "./EmptyListMessage";

const ViewMorePageContainer = styled.div`
  /* display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center; */
  padding: 20px 20px;
`;

const UpcomingEventsContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  background-color: white;
  border-radius: 10px;
`;

const UpcomingEventsField = [
  {
    title: "[광진문화재단] 제4회 2025 나루 스트릿 댄스 페스티벌",
    location: "서울시립 북서울미술관 2층 전시실 3, 4",
    startDate: "2025-05-13T00:00:00",
    endDate: "2025-06-04T00:00:00",
  },
  {
    title: "[광진문화재단] 제4회 2025 나루 스트릿 댄스 페스티벌",
    location: "서울시립 북서울미술관 2층 전시실 3, 4",
    startDate: "2025-05-13T00:00:00",
    endDate: "2025-06-04T00:00:00",
  },
  {
    title: "[광진문화재단] 제4회 2025 나루 스트릿 댄스 페스티벌",
    location: "서울시립 북서울미술관 2층 전시실 3, 4",
    startDate: "2025-05-13T00:00:00",
    endDate: "2025-06-04T00:00:00",
  },
];

const RecentReviewEventsField = [];

const ViewMorePage = () => {
  return (
    <MobileLayout>
      <ViewMorePageContainer>
        <Typography variant="h3">다가오는 문화행사</Typography>
        <UpcomingEventsContainer>
          {UpcomingEventsField.map((item) => (
            <NoBorderLandscapeCard
              title={item.title}
              endDate={item.endDate}
              startDate={item.startDate}
              location={item.location}
            />
          ))}
        </UpcomingEventsContainer>
        <Typography variant="h3">실시간 리뷰</Typography>
        <UpcomingEventsContainer>
          {RecentReviewEventsField.length > 0 ? (
            UpcomingEventsField.map((item) => (
              <NoBorderLandscapeCard
                title={item.title}
                endDate={item.endDate}
                startDate={item.startDate}
                location={item.location}
              />
            ))
          ) : (
            <EmptyListMessage message={"아직 리뷰가 없습니다"} />
          )}
        </UpcomingEventsContainer>
      </ViewMorePageContainer>
    </MobileLayout>
  );
};

export default ViewMorePage;
