import React, { useEffect, useState } from "react";
import styled from "styled-components";
import MobileLayout from "../../components/Layout/MobileLayout";
import Typography from "../../components/Typography/Typography";
import NoBorderLandscapeCard from "../../components/NoBorderLandscapeCard/NoBorderLandscapeCard";
import EmptyListMessage from "./EmptyListMessage";
import { getUpcomingEvents } from "../../api/event/events";
import { postToggleEventLike } from "../../api/interaction/event/like";
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

const RecentReviewEventsField = [];

const ViewMorePage = () => {
  const [recentReviewedEventsField, setRecentReviewedEventsField] = useState(
    []
  );
  const [upcomingEventsField, setUpcomingEventsField] = useState([]);

  const handleUpcomingEvents = async () => {
    const payload = {
      categoryId: "2",
      offset: 0,
      limit: 3,
    };

    const res = await getUpcomingEvents(payload);
    console.log(res);
    setUpcomingEventsField(res.data.eventList);
  };

  const handleLikeToggle = async (eventId) => {
    const eventIndex = upcomingEventsField.findIndex(
      (event) => event.eventId === eventId
    );

    const res = await postToggleEventLike(eventId);

    if (res === "SUCCESS") {
      const currentEvent = upcomingEventsField[eventIndex];
      const currentLikedStatus = currentEvent.isLiked;
      const newLikedStatus = !currentLikedStatus;
      setUpcomingEventsField((prevEvents) =>
        prevEvents.map((event) =>
          event.eventId === eventId
            ? { ...event, isLiked: newLikedStatus }
            : event
        )
      );
    } else {
      console.error("Error occured during toggleLikeEvent");
    }
  };

  useEffect(() => {
    handleUpcomingEvents();
  }, []);
  return (
    <MobileLayout>
      <ViewMorePageContainer>
        <Typography variant="h3">다가오는 문화행사</Typography>
        <UpcomingEventsContainer>
          {upcomingEventsField.map((item) => (
            <NoBorderLandscapeCard
              image={item.imageUrl}
              title={item.title}
              endDate={item.endDate}
              startDate={item.startDate}
              location={item.location}
              category={item.categoryId.name}
              gu={item.gu}
              isLiked={item.isLiked}
              likeCount={item.likeCount}
              onLikeToggle={() => handleLikeToggle(item.eventId)}
            />
          ))}
        </UpcomingEventsContainer>
        <Typography variant="h3">실시간 리뷰</Typography>
        <UpcomingEventsContainer>
          {RecentReviewEventsField.length > 0 ? (
            upcomingEventsField.map((item) => (
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
