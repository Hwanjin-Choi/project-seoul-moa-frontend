import React, { useEffect, useState, useCallback } from "react";
import styled from "styled-components";
import MobileLayout from "../../components/Layout/MobileLayout";
import Typography from "../../components/Typography/Typography";
import NoBorderLandscapeCard from "../../components/NoBorderLandscapeCard/NoBorderLandscapeCard";
import EmptyListMessage from "./EmptyListMessage";
import { getUpcomingEvents } from "../../api/event/events";
import { postToggleEventLike } from "../../api/interaction/event/like";
import UpcomingEventsSection from "./UpcomingEventsSection";
import RecentlyReviewedEventsSection from "./RecentlyReviewedEventsSection";
const ViewMorePageContainer = styled.div`
  /* display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center; */
  padding: 20px 20px;
  @media (max-width: 768px) {
    padding: 5px 10px;
  }
`;

const UpcomingEventsContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  background-color: white;
  border-radius: 10px;
`;

const TitleContainer = styled.div`
  margin: 10px 0px;
`;

const RecentReviewEventsField = [];

const ViewMorePage = () => {
  const [recentReviewedEventsField, setRecentReviewedEventsField] = useState(
    []
  );
  const [upcomingEventsField, setUpcomingEventsField] = useState([]);

  return (
    <MobileLayout>
      <ViewMorePageContainer>
        <TitleContainer>
          <Typography variant="h3">다가오는 문화행사</Typography>
        </TitleContainer>

        <UpcomingEventsSection />
        <TitleContainer>
          <Typography variant="h3">실시간 리뷰</Typography>
        </TitleContainer>

        <RecentlyReviewedEventsSection />
      </ViewMorePageContainer>
    </MobileLayout>
  );
};

export default ViewMorePage;
