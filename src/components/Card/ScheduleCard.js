import styled from "styled-components";
import Typography from "../../components/Typography/Typography";
import { Color } from "../../styles/colorsheet";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt, faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import Button from "../Button/Button";

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
  border-radius: 20px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
  overflow: hidden;
`;

const InfoSection = styled.div`
  display: flex;
  padding: 16px;
  align-items: flex-start;
  gap: 16px;
`;

const InfoBox = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Poster = styled.img`
  width: 100px;
  height: 130px;
  border-radius: 20px;
  object-fit: cover;
  flex-shrink: 0;
`;

const DateRow = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const DdayTag = styled.span`
  background-color: ${Color.MC1};
  color: white;
  padding: 2px 10px;
  font-size: 12px;
  border-radius: 9999px;
  font-weight: 600;
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

const ButtonSection = styled.div`
  display: flex;
  gap: 8px;
  padding: 12px 16px 16px;
`;

const StyledButton = styled(Button)`
  flex: 1;
`;

const ScheduleCard = ({ item, onEditClick, onDeleteClick }) => {
  if (!item) return null;

  const today = new Date();
  const targetDate = new Date(item.calenderDay);
  const dday = Math.ceil((targetDate - today) / (1000 * 60 * 60 * 24));

  return (
    <Card>
      <InfoSection>
        <InfoBox>
          <DateRow>
            <Typography variant="h4" color={Color.MC1} style={{ fontWeight: "bold" }}>
              {item.calenderDay}
            </Typography>
            <DdayTag>D-{dday}</DdayTag>
          </DateRow>
          <Typography variant="h3" style={{ fontWeight: 700 }}>{item.eventTitle}</Typography>
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

      <ButtonSection>
        <StyledButton variant="primary" onClick={() => onEditClick?.(item)}>
          예약 수정
        </StyledButton>
        <StyledButton variant="secondary" onClick={() => onDeleteClick?.(item)}>
          예약 취소
        </StyledButton>
      </ButtonSection>
    </Card>
  );
};

export const ScheduleCarousel = ({ data, onEditClick, onDeleteClick }) => (
  <CarouselWrapper>
    {data.filter(Boolean).map((item, idx) => (
      <ScheduleCard key={idx} item={item} onEditClick={onEditClick} onDeleteClick={onDeleteClick} />
    ))}
  </CarouselWrapper>
);

export default ScheduleCard;