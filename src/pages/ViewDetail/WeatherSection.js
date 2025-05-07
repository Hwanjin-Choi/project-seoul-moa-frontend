import styled from "styled-components";
import { useEffect, useState } from "react";
import Typography from "../../components/Typography/Typography";
import {
  WiDaySunny,
  WiDayCloudy,
  WiCloudy,
  WiRain,
  WiSnow,
  WiThunderstorm,
} from "react-icons/wi";
import { Color } from "../../styles/colorsheet";
import { fetchWeatherForecast } from "../../api/weather";

const List = styled.div`
  display: flex;
  margin: 10px 0;
`;
const Item = styled.div`
  flex: 0 0 calc(100% / 6);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;
const IconWrapper = styled.div`
  font-size: 30px;
  color: ${Color.MC1};
  margin-bottom: 4px;
`;
const StatusText = styled(Typography)`
  font-size: 12px;
  color: ${Color.BC2};
  margin-bottom: 2px;
`;
const TimeText = styled(Typography)`
  font-size: 10px;
  color: ${Color.BC3};
`;

const getIconComponent = (status) => {
  switch (status) {
    case "맑음":
      return WiDaySunny;
    case "구름많음":
      return WiDayCloudy;
    case "흐림":
      return WiCloudy;
    case "낙뢰":
      return WiThunderstorm;
    case "비":
      return WiRain;
    case "눈":
      return WiSnow;
    default:
      return WiDaySunny;
  }
};

const formatHour = (dateStr, timeStr) => {
  const dt = new Date(`${dateStr}T${timeStr}`);
  return `${dt.getHours()}시`;
};

const WeatherSection = ({ gu }) => {
  const [list, setList] = useState([]);

  useEffect(() => {
    if (!gu) return;
    fetchWeatherForecast(gu)
      .then((data) => setList(data))
      .catch(() => {});
  }, [gu]);

  console.log(list, "check");

  return (
    <>
      <Typography variant="h6" style={{ textAlign: "center" }}>
        {gu}의 날씨
      </Typography>
      <List>
        {list.map((o, idx) => {
          const IconComponent = getIconComponent(o.weatherStatus);
          return (
            <Item key={idx}>
              <IconWrapper>
                <IconComponent />
              </IconWrapper>
              <StatusText variant="caption">{o.weatherStatus}</StatusText>
              <TimeText variant="caption">
                {formatHour(o.fcscDate, o.time)}
              </TimeText>
            </Item>
          );
        })}
      </List>
    </>
  );
};

export default WeatherSection;
