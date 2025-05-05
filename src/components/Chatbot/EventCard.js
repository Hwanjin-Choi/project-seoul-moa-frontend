import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMapMarkerAlt,
  faCalendarAlt,
} from "@fortawesome/free-solid-svg-icons";
import { StyledEventCard, EventTitle, EventInfo } from "./styles"; // Import styles

const EventCard = ({ event }) => {
  if (!event) return null;
  return (
    <StyledEventCard>
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
