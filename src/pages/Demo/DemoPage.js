import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Container from "../../components/Layout/Container";
import MobileLayout from "../../components/Layout/MobileLayout";
import { Color } from "../../styles/colorsheet";
import Typography from "../../components/Typography/Typography";

import SchedulePreviewCarousel from "../../components/Card/SchedulePreviewCard";
import AutoCarousel from "./AutoCarousel";
import HotEventCard from "../../components/Card/HotEventCard";
import { getUpcomingEvents } from "../../api/event/events";
import { fetchUserScheduleList } from "../../api/userScheduleList";

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
  const [carouselItems, setCarouselItems] = useState([]);
  const [error, setError] = useState("");
  const [userSchedules, setUserSchedules] = useState([]);

  useEffect(() => {
    const fetchCarouselItems = async () => {
      const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
      const rawCategoryId = localStorage.getItem("categoryId");
      console.log("로그인 상태:", isLoggedIn);
      console.log("raw categoryId:", rawCategoryId);

      let categoryId = [];
      try {
        categoryId = JSON.parse(rawCategoryId || "[]");
        console.log("Parsed categoryId:", categoryId);
      } catch (err) {
        console.error("categoryId 파싱 실패:", err);
      }

      const payload = isLoggedIn
        ? {
          categoryId: categoryId,
          isOpen: true,
          offset: 0,
          limit: 5,
        }
        : {
          isOpen: true,
          offset: 0,
          limit: 5,
        };

      try {
        const res = await getUpcomingEvents(payload);
        const events = res.data.eventList.map(event => ({
          image: event.imageUrl,
          location: event.location,
          startdate: event.startDate,
          enddate: event.endDate,
          title: event.title,
          eventId: event.eventId,
        }));
        setCarouselItems(events);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchCarouselItems();
  }, []);

  useEffect(() => {
    const loadUserSchedules = async () => {
      try {
        const scheduleData = await fetchUserScheduleList();
        const futureSchedules = scheduleData.filter(item => item.pastScheduled === false);

        const formattedSchedules = futureSchedules.map(item => ({
          calenderDay: item.scheduleTime?.slice(0, 10),
          eventTitle: item.event.title,
          eventStartdate: item.event.startDate,
          eventEnddate: item.event.endDate,
          eventLocation: item.event.location,
          eventImageurl: item.event.imageUrl,
        }));

        setUserSchedules(formattedSchedules);
      } catch (err) {
        console.error("일정 데이터 불러오기 실패:", err);
      }
    };

    loadUserSchedules();
  }, []);

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
        {error ? <div style={{ color: "red" }}>{error}</div> : <AutoCarousel items={carouselItems} />}
      </MainPostimg>
      <Container>
        <Section>
          <Typography variant="h3">다가오는 나의 일정</Typography>
          {userSchedules.length > 0 ? (
            <SchedulePreviewCarousel items={userSchedules} />
          ) : (
            <Typography variant="body1">예정된 일정이 없습니다.</Typography>
          )}
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
