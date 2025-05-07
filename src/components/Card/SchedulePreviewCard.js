import styled from "styled-components";
import Typography from "../../components/Typography/Typography";
import { Color } from "../../styles/colorsheet";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt, faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import DdayBadge from "../Badge/DdayBadge";
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

const Card = styled.div`
  flex: 0 0 100%;
  scroll-snap-align: start;
  background-color: rgba(255, 255, 255, 0.7);
  border-radius: 10px;
  overflow: hidden;
  cursor: pointer;
`;

const InfoSection = styled.div`
  display: flex;
  padding: 16px;
  align-items: flex-start;
  gap: 16px;
`;

const InfoBox = styled.div`
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
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

const Poster = styled.img`
  width: 32%;
  aspect-ratio: 3 / 4;
  border-radius: 10px;

  @media (min-width: 768px) {
    width: 28%;
    aspect-ratio: 3 / 4;
  }

  @media (min-width: 1024px) {
    width: 25%;
  }
`;

const DateRow = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const InfoRow = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;

const StyledIcon = styled(FontAwesomeIcon)`
  width: 12px;
  height: 12px;
  color: ${Color.MC1};
  flex-shrink: 0;
`;

const SchedulePreviewCard  = ({ item }) => {
  const navigate = useNavigate();
  if (!item) return null;
  const handleCardClick = () => {
    navigate("/my-page");
  };


  return (
    <Card onClick={handleCardClick} style={{ cursor: "pointer" }}>
      <InfoSection>
      <InfoBox>
        <DateRow>
          <Typography variant="h3" color={Color.MC1} style={{ fontWeight: "bold" }}>
            {item.calenderDay}
          </Typography>
          <DdayBadge startDate={item.eventStartdate} endDate={item.eventEnddate} />
        </DateRow>
        <Title variant="h3" style={{ fontWeight: 700 }}>
          {item.eventTitle}
        </Title>
        <InfoRow>
          <StyledIcon icon={faCalendarAlt} />
          <Typography variant="h6" color={Color.BC3}>
            {item.eventStartdate} ~ {item.eventEnddate}
          </Typography>
        </InfoRow>
        <InfoRow>
          <StyledIcon icon={faMapMarkerAlt} />
          <Typography variant="h6" color={Color.BC3}>
            {item.eventLocation}
          </Typography>
        </InfoRow>
      </InfoBox>
        <Poster src={item.eventImageurl} alt={item.eventTitle} />
      </InfoSection>
    </Card>
  );
};

export const SchedulePreviewCarousel = ({ items = [] }) => (
  <CarouselWrapper>
    {items.filter(Boolean).map((item, idx) => (
      <SchedulePreviewCard key={idx} item={item} />
    ))}
  </CarouselWrapper>
);

export default SchedulePreviewCarousel;