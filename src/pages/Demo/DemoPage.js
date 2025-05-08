import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import Container from "../../components/Layout/Container";
import MobileLayout from "../../components/Layout/MobileLayout";
import Typography from "../../components/Typography/Typography";
import { Color } from "../../styles/colorsheet";
import SchedulePreviewCarousel from "../../components/Card/SchedulePreviewCard";
import AutoCarousel from "./AutoCarousel";
import HotEventCard from "../../components/Card/HotEventCard";
import { useFetchUpcomingEvents } from "../../hooks/useFetchUpcomingEvents";
import { useFetchUserSchedules } from "../../hooks/useFetchUserSchedules";
import { useFetchHotEvents } from "../../hooks/useFetchHotEvents";

const DemoPage = () => {
  const navigate = useNavigate();
  const isLoggedIn =
    localStorage.getItem("isLoggedIn") === "true" ? true : false;

  const { carouselItems, error } = useFetchUpcomingEvents();
  const { userSchedules: fetchedSchedules } = useFetchUserSchedules();

  const userSchedules = isLoggedIn ? fetchedSchedules : [];
  const { hotEvents } = useFetchHotEvents();

  const handleMoreClick = () => {
    navigate("/my-page");
  };

  return (
    <MobileLayout>
      <MainPostimg>
        {error ? (
          <div style={{ color: "red" }}>{error}</div>
        ) : (
          <AutoCarousel items={carouselItems} />
        )}
      </MainPostimg>
      <Container>
        {isLoggedIn && (
          <Section>
            <TitleRow>
              <Typography variant="h3">다가오는 나의 일정</Typography>
              <MoreLink onClick={handleMoreClick}>더보기</MoreLink>
            </TitleRow>

            {userSchedules.length > 0 ? (
              <SchedulePreviewCarousel items={userSchedules} />
            ) : (
              <Typography variant="body1">예정된 일정이 없습니다.</Typography>
            )}
          </Section>
        )}

        <Section>
          <Typography variant="h3">Hot 문화행사</Typography>
          <CardGrid>
            {hotEvents.map((item) => (
              <HotEventCard key={item.eventId} item={item} />
            ))}
          </CardGrid>
        </Section>
      </Container>
    </MobileLayout>
  );
};

export default DemoPage;

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

const TitleRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const MoreLink = styled.span`
  color: ${Color.MC1};
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;
