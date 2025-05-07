import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMapMarkerAlt,
  faCalendarAlt,
} from "@fortawesome/free-solid-svg-icons";
import { StyledEventCard, EventTitle, EventInfo } from "./styles"; // Import styles

const EventCard = ({ event }) => {
  if (!event) return null;
  const handleCardClick = () => {
    const eventUrl = `/view-detail-page/${event.event_id}`;
    if (eventUrl && eventUrl !== "#") {
      window.open(eventUrl, "_blank", "noopener,noreferrer");
    } else {
      console.warn("Event URL is not defined or invalid.");
    }
  };
  return (
    <StyledEventCard onClick={handleCardClick}>
      <EventTitle>{event.title}</EventTitle>
      <EventInfo>
        <FontAwesomeIcon icon={faMapMarkerAlt} />
        <span>
          {event.location?.name} ({event.location?.gu})
        </span>
      </EventInfo>
      <EventInfo>
        <FontAwesomeIcon icon={faCalendarAlt} />
        <span>
          {event.start_date} ~ {event.end_date}
        </span>
      </EventInfo>
    </StyledEventCard>
  );
};

export default EventCard;
