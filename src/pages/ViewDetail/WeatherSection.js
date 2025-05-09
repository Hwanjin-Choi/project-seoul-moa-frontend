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
  margin-top: 15px;
  overflow-x: scroll;
  overflow-y: hidden;
`;
const Item = styled.div`
  flex: 0 0 calc(100% / 6);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 8px 0;
  transition: transform 0.2s ease;
  cursor: default;
  opacity: 0.8;

  &.active {
    transform: translateY(-2px) scale(1.1);
    opacity: 1;
  }
`;

const IconWrapper = styled.div`
  font-size: 30px;
  color: ${Color.MC1};
  margin-bottom: 4px;
  transition: transform 0.2s ease;

  .active & {
    transform: scale(1.2);
  }
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

const getCurrentHourStr = () => {
  const now = new Date();
  return `${now.getHours()}시`;
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
          const currentHour = getCurrentHourStr();
          const hourStr = formatHour(o.fcscDate, o.time);
          const isNow = hourStr === currentHour;

          return (
            <Item key={idx} className={isNow ? "active" : ""}>
              <IconWrapper>
                <IconComponent />
              </IconWrapper>
              <Typography
                variant="h6"
                color={Color.BC3}
                style={{ marginBottom: 5 }}
              >
                {hourStr}
              </Typography>
              <Typography variant="h6" color={Color.BC2}>
                {o.weatherStatus}
              </Typography>
              <Typography variant="h6" color={Color.BC2}>
                {o.temperture}°
              </Typography>
            </Item>
          );
        })}
      </List>
    </>
  );
};

export default WeatherSection;
