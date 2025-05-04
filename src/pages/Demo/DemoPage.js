import React from "react";
import styled from "styled-components";
import Container from "../../components/Layout/Container";
import MobileLayout from "../../components/Layout/MobileLayout";
import { Color } from "../../styles/colorsheet";
import Typography from "../../components/Typography/Typography";

import SchedulePreviewCard from "../../components/Card/SchedulePreviewCard";
import AutoCarousel from "./AutoCarousel";
import HotEventCard from "../../components/Card/HotEventCard";

const MainPostimg = styled.div`
  padding-bottom: 5px;
`;

const Section = styled.div`
  margin-top: 20px;
`;

const CardGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  background-color: rgba(255, 255, 255, 0.7);
  padding: 10px;
  justify-content: center;
  margin-top: 10px;
  border-radius: 10px;
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

  const hoteventItems = [
    {
      "eventId": 1,
      "eventTitle": "K-핸드메이드페어 2025",
      "startDate": "2025-12-18",
      "endDate": "2025-12-21",
      "location": "서울 삼성동 코엑스 1층  B홀",
      "categoryId": 11,
      "categoryName": "전시/미술",
      "gu": "강남구",
      "imageUrl": "https://culture.seoul.go.kr/cmmn/file/getImage.do?atchFileId=42afe00583eb4b0983dba37a04a41222&thumb=Y",
      "likeCount": 2,
      "likeYn": "U"
    },
    {
      "eventId": 2,
      "eventTitle": "2025 금천하모니축제",
      "startDate": "2025-10-18",
      "endDate": "2025-10-19",
      "location": "금천구청광장, 안양천다목적광장, 금천구 전역",
      "categoryId": 8,
      "categoryName": "축제",
      "gu": "금천구",
      "imageUrl": "https://culture.seoul.go.kr/cmmn/file/getImage.do?atchFileId=520ec510b1db4ca6976e8f87402fd6d1&thumb=Y",
      "likeCount": 2,
      "likeYn": "U"
    },
    {
      "eventId": 3,
      "eventTitle": "2025 서울라이트 한강 빛섬축제",
      "startDate": "2025-10-03",
      "endDate": "2025-10-12",
      "location": "뚝섬 한강공원",
      "categoryId": 8,
      "categoryName": "축제",
      "gu": "광진구",
      "imageUrl": "https://culture.seoul.go.kr/cmmn/file/getImage.do?atchFileId=b13d2032bec441088ab18e1f0164eaa6&thumb=Y",
      "likeCount": 1,
      "likeYn": "U"
    },
    {
      "eventId": 28,
      "eventTitle": "프로젝트 K [Regather] - 음악으로 다시 모이다",
      "startDate": "2025-05-31",
      "endDate": "2025-05-31",
      "location": "예술의전당 IBK기업은행챔버홀",
      "categoryId": 3,
      "categoryName": "클래식",
      "gu": "서초구",
      "imageUrl": "https://culture.seoul.go.kr/cmmn/file/getImage.do?atchFileId=fe99cc7b880244a98570f58f0c09f228&thumb=Y",
      "likeCount": 1,
      "likeYn": "U"
    },
  ]

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
          <CardGrid>
            {hoteventItems.map(item => (
              <HotEventCard key={item.eventId} item={item} />
            ))}
          </CardGrid>
          <Typography variant="h3">더보기</Typography>
        </Section>

      </Container>
    </MobileLayout>
  );
};

export default DemoPage;
