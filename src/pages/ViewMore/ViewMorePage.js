import React from "react";
import styled from "styled-components";
import BackHeader from "../../components/BackHeader/BackHeader";
import MobileLayout from "../../components/Layout/MobileLayout";
import SimpleCard from "../../components/SimpleCard/SimpleCard";
import Typography from "../../components/Typography/Typography";
import Content from "../../components/Content/Content";
import NoBorderLandscapeCard from "../../components/NoBorderLandscapeCard/NoBorderLandscapeCard";
const ViewMorePageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
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
    address: "서울특별시 광진구 중곡로 123",
    date: "2025-09-20~2025-09-20",
  },
  {
    title: "[광진문화재단] 제4회 2025 나루 스트릿 댄스 페스티벌",
    address: "서울특별시 광진구 중곡로 123",
    date: "2025-09-20~2025-09-20",
  },
  {
    title: "[광진문화재단] 제4회 2025 나루 스트릿 댄스 페스티벌",
    address: "서울특별시 광진구 중곡로 123",
    date: "2025-09-20~2025-09-20",
  },
];

const ViewMorePage = () => {
  return (
    <ViewMorePageContainer>
      <MobileLayout>
        <BackHeader />
        <Content>
          <Typography variant="h3">다가오는 문화행사</Typography>
          <UpcomingEventsContainer>
            {UpcomingEventsField.map((item) => (
              <NoBorderLandscapeCard
                title={item.title}
                address={item.address}
                date={item.date}
              />
            ))}
          </UpcomingEventsContainer>
          <Typography variant="h3">실시간 리뷰</Typography>
          <UpcomingEventsContainer>
            {UpcomingEventsField.map((item) => (
              <NoBorderLandscapeCard
                title={item.title}
                address={item.address}
                date={item.date}
              />
            ))}
          </UpcomingEventsContainer>
        </Content>
      </MobileLayout>
    </ViewMorePageContainer>
  );
};

export default ViewMorePage;
