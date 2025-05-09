import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import Container from "../../components/Layout/Container";
import MobileLayout from "../../components/Layout/MobileLayout";
import Typography from "../../components/Typography/Typography";
import { Color } from "../../styles/colorsheet";
import AutoCarousel from "./AutoCarousel";
import HotEventCard from "../../components/Card/HotEventCard";
import { useFetchUpcomingEvents } from "../../hooks/useFetchUpcomingEvents";
import { useFetchHotEvents } from "../../hooks/useFetchHotEvents";
import UserScheduleSection from "./UserScheduleSection";

const DemoPage = () => {
  const { carouselItems, error } = useFetchUpcomingEvents();

  const { hotEvents } = useFetchHotEvents();

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
        <UserScheduleSection />
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
