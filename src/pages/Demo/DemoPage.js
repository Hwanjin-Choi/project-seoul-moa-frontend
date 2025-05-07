import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Container from "../../components/Layout/Container";
import MobileLayout from "../../components/Layout/MobileLayout";
import Typography from "../../components/Typography/Typography";

import SchedulePreviewCarousel from "../../components/Card/SchedulePreviewCard";
import AutoCarousel from "./AutoCarousel";
import HotEventCard from "../../components/Card/HotEventCard";
import { getUpcomingEvents } from "../../api/event/events";
import { fetchUserScheduleList } from "../../api/userScheduleList";
import { fetchMostLikedEvents } from "../../api/mostLikedEvents";

const MainPostimg = styled.div`
  padding-bottom: 5px;
`;

const Section = styled.div`
  margin-bottom: 25px;
  @media (min-width: 768px) {
    margin-bottom: 35px;
  }
  @media (min-width: 1024px) {
    margin-bottom: 40px;
  }
`;

const CardGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  background-color: rgba(255, 255, 255, 0.7);
  padding: 10px;
  justify-content: center;
  margin-top: 10px;
  border-radius: 10px;
  
  @media (min-width: 768px) {
    gap: 15px;
  }

  @media (min-width: 1024px) {
    gap: 20px;
  }
`;

const DemoPage = () => {
  const [carouselItems, setCarouselItems] = useState([]);
  const [error, setError] = useState("");
  const [userSchedules, setUserSchedules] = useState([]);
  const [hotEvents, setHotEvents] = useState([]);

  useEffect(() => {
    const fetchCarouselItems = async () => {
      const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
      const rawCategoryId = localStorage.getItem("categoryId");

      let categoryId = [];
      try {
        categoryId = JSON.parse(rawCategoryId || "[]");
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
          startdate: event.startDate?.split("T")[0],
          enddate: event.endDate?.split("T")[0],
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
          eventStartdate: item.event.startDate?.split("T")[0],
          eventEnddate: item.event.endDate?.split("T")[0],
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

  useEffect(() => {
    const loadMostLikedEvents = async () => {
      try {
        const result = await fetchMostLikedEvents({ offset: 0, limit: 4 });
        setHotEvents(result);
      } catch (err) {
        console.error("🔥 인기 행사 불러오기 실패:", err.message);
      }
    };

    loadMostLikedEvents();
  }, []);

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
            {hotEvents.map(item => (
              <HotEventCard key={item.eventId} item={item} />
            ))}
          </CardGrid>
        </Section>

      </Container>
    </MobileLayout>
  );
};

export default DemoPage;
