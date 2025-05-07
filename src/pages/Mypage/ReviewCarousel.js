import styled from "styled-components";
import Typography from "../../components/Typography/Typography.js";
import { Color } from "../../styles/colorsheet.js";
import Button from "../../components/Button/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt, faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const CarouselWrapper = styled.div`
  display: flex;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  gap: 15px;
  padding: 10px 0;
  -ms-overflow-style: auto;
  scrollbar-width: auto;

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
  background-color: rgba(255, 255, 255, 0.7);
  border-radius: 10px;
  display: flex;
  padding: 15px;
  gap: 10px;
  box-sizing: border-box;
  height: 180px;
`;

const Thumb = styled.img`
  width: 40%;
  aspect-ratio: 3 / 4;
  border-radius: 10px;
  object-fit: contain;
  flex-shrink: 0;
`;

const InfoBox = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
  padding-right: 10px;
  box-sizing: border-box;
  overflow: hidden;
`;

const Title = styled(Typography)`
  white-space: normal;
  overflow-wrap: break-word;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const InfoRow = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 3px;
`;

const StyledIcon = styled(FontAwesomeIcon)`
  width: 12px;
  height: 12px;
  color: ${Color.MC1};
  flex-shrink: 0;
`;

const ReviewCarousel = ({ reviewCreateData, onReviewClick }) => {
  const navigate = useNavigate();

  return (
    <CarouselWrapper>
      {reviewCreateData.map((event, idx) => (
        <CarouselItem
          key={idx}
          
        >
          <Thumb src={event.eventImageurl} onClick={() => navigate(`/view-detail-page/${event.eventId}`)}
          style={{ cursor: "pointer" }} />
          <InfoBox>
            <div>
              <Typography
                variant="h4"
                color={Color.MC1}
                style={{ margin: 5 }}
              >
                {event.calenderDay}
              </Typography>
              <Title variant="h3" style={{ margin: 5 }}>
                {event.eventTitle}
              </Title>

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
          </InfoBox>

        </CarouselItem>
      ))}
    </CarouselWrapper>
  )
};

export default ReviewCarousel;