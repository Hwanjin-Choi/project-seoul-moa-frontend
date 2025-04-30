import styled from "styled-components";
import Typography from "../../components/Typography/Typography";
import { Color } from "../../styles/colorsheet";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt, faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";

const Card = styled.div`
  background-color: rgba(255, 255, 255, 0.7);
  border-radius: 10px;
  overflow: hidden;
  padding: 16px;
  display: flex;
  gap: 16px;
`;

const InfoBox = styled.div`
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Poster = styled.img`
  width: 35%;
  aspect-ratio: 3 / 4;
  border-radius: 10px;
  object-fit: contain;
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

const Title = styled(Typography)`
  white-space: normal;
  overflow-wrap: break-word;
`;

const SchedulePreviewCard  = ({ item }) => {
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
    </Card>
  );
};

export default SchedulePreviewCard ;