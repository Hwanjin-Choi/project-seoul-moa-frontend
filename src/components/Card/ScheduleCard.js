import styled from "styled-components";
import Typography from "../../components/Typography/Typography";
import { Color } from "../../styles/colorsheet";

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
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  background-color: rgba(255, 255, 255, 0.7);
  border-radius: 10px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
`;

const InfoBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex: 1;
`;

const DateRow = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;

const DdayTag = styled.span`
  background-color: ${Color.MC1};
  color: white;
  padding: 2px 10px;
  font-size: 12px;
  border-radius: 9999px;
  font-weight: 600;
`;

const Poster = styled.img`
  width: 80px;
  height: 100px;
  border-radius: 10px;
  object-fit: cover;
  flex-shrink: 0;
`;

const AddressText = styled(Typography).attrs({ color: Color.BC3 })`
  font-size: 12px;
`;

const ScheduleCard = ({ item }) => {
  if (!item) return null;

  const today = new Date();
  const targetDate = new Date(item.calenderDay);
  const dday = Math.ceil((targetDate - today) / (1000 * 60 * 60 * 24));

  return (
    <Card>
      <InfoBox>
        <DateRow>
          <Typography variant="h4" color={Color.MC1} style={{ fontWeight: "bold" }}>
            {item.calenderDay}
          </Typography>
          <DdayTag>D-{dday}</DdayTag>
        </DateRow>
        <Typography variant="h4" style={{ fontWeight: 700 }}>{item.eventTitle}</Typography>
        <Typography variant="h6" color={Color.BC2}>
          {item.eventStartdate} - {item.eventEnddate}
        </Typography>
        <AddressText variant="h6">{item.eventLocation}</AddressText>
      </InfoBox>

      <Poster src={item.eventImageurl} alt={item.eventTitle} />
    </Card>
  );
};

export const ScheduleCarousel = ({ data }) => (
  <CarouselWrapper>
    {data.filter(Boolean).map((item, idx) => (
      <ScheduleCard key={idx} item={item} />
    ))}
  </CarouselWrapper>
);

export default ScheduleCard;