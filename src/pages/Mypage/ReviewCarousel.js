import styled from "styled-components";
import Typography from "../../components/Typography/Typography.js";
import { Color } from "../../styles/colorsheet.js";
import Button from "../../components/Button/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt, faMapMarkerAlt, faUser, faWonSign } from "@fortawesome/free-solid-svg-icons";

const CarouselWrapper = styled.div`
  display: flex;
  flex-direction: row;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  gap: 15px;
  padding: 10px 0;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    height: 6px;
  }

  &::-webkit-scrollbar-thumb {
    background: ${Color.BC4};
    border-radius: 3px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }
`;

const CarouselItem = styled.div`
  flex: 0 0 100%;
  scroll-snap-align: start;
  border-radius: 10px;
  background-color: rgba(255, 255, 255, 0.7);
  padding: 15px;
  display: flex;
`;

const Thumb = styled.img`
  width: 50%;
  height: 100%;
  border-radius: 10px;
  object-fit: cover;
`;

const ReviewInfoBox = styled.div`
  margin-left: 15px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 1;
`;

const InfoRow = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  margin-top: 4px;
`;

const StyledIcon = styled(FontAwesomeIcon)`
  width: 12px;
  height: 12px;
  color: ${Color.MC1};
  flex-shrink: 0;
`;

const ReviewCarousel = ({ reviewCreateData, onReviewClick }) => (
  <CarouselWrapper>
    {reviewCreateData.map((event, idx) => (
      <CarouselItem key={idx}>
        <Thumb src={event.eventImageurl} />
        <ReviewInfoBox>
          <div>
            <Typography variant="h3" color={Color.MC1}>
              {event.calenderDay}
            </Typography>
            <Typography variant="h3">{event.eventTitle}</Typography>

            <InfoRow>
              <StyledIcon icon={faCalendarAlt} />
              <Typography variant="h6" color={Color.BC3}>
                {event.eventStartdate} ~ {event.eventEnddate}
              </Typography>
            </InfoRow>

            <InfoRow>
              <StyledIcon icon={faMapMarkerAlt} />
              <Typography variant="h6" color={Color.BC3}>
                {event.eventLocation}
              </Typography>
            </InfoRow>
          </div>

          <Button
            variant="primary"
            fullWidth
            onClick={() => onReviewClick(event)}
          >
            리뷰작성
          </Button>
        </ReviewInfoBox>

      </CarouselItem>
    ))}
  </CarouselWrapper>
);

export default ReviewCarousel;