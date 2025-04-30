import React from "react";
import styled from "styled-components";
import Container from "../../components/Layout/Container";
import MobileLayout from "../../components/Layout/MobileLayout";
import { Color } from "../../styles/colorsheet";
import Typography from "../../components/Typography/Typography";

import SchedulePreviewCard from "../../components/Card/SchedulePreviewCard";
import AutoCarousel from "./AutoCarousel";

const MainPostimg = styled.div`
  padding-bottom: 5px;
`;

const Section = styled.div`
  margin-top: 20px;
`;


const DemoPage = () => {
  const mockSchedule = {
    calenderDay: "2025-05-01",
    eventTitle: "[서울시립교향악단] 2025 서울시향 키릴 게르스타인의 브람스 피아노 협주곡 2번",
    eventStartdate: "2025-05-01",
    eventEnddate: "2025-05-01",
    eventLocation: "예술의전당 콘서트홀",
    eventImageurl: "https://culture.seoul.go.kr/cmmn/file/getImage.do?atchFileId=48274ccded064864972fd8e98cd32683&thumb=Y",
  };

  const carouselItems = [
    {
      image: "https://culture.seoul.go.kr/cmmn/file/getImage.do?atchFileId=48274ccded064864972fd8e98cd32683&thumb=Y",
      location: "서울시립미술관",
      startdate: "2025-05-01",
      enddate: "2025-05-03",
      title: "무브 온 전시회",
    },
    {
      image: "https://culture.seoul.go.kr/cmmn/file/getImage.do?atchFileId=238ae5b173814d559271fd73f714f64e&thumb=Y",
      location: "예술의전당",
      startdate: "2025-05-02",
      enddate: "2025-05-02",
      title: "서울시향 정기연주",
    },
    {
      image: "https://culture.seoul.go.kr/cmmn/file/getImage.do?atchFileId=f35edffaeb334b2f8bfa98f57833d765&thumb=Y",
      location: "예술의전당",
      startdate: "2025-05-02",
      enddate: "2025-05-02",
      title: "서울시향 정기연주",
    },
    {
      image: "https://culture.seoul.go.kr/cmmn/file/getImage.do?atchFileId=7555d5020acd4befbf946d1f30436ba9&thumb=Y",
      location: "예술의전당",
      startdate: "2025-05-02",
      enddate: "2025-05-02",
      title: "서울시향 정기연주",
    },
  ];

  return (
    <MobileLayout>
      <MainPostimg>
        <AutoCarousel
          items={carouselItems}
        />
      </MainPostimg>
      <Container>
        <Section>
          <Typography variant="h3">다가오는 나의 일정</Typography>
          <div style={{ marginTop: "10px" }}>
            <SchedulePreviewCard item={mockSchedule} />
          </div>
        </Section>

        <Section>
          <Typography variant="h3">Hot 문화행사</Typography>
        </Section>

      </Container>
    </MobileLayout>
  );
};

export default DemoPage;
