import { Color } from "../styles/colorsheet";

const useSubwayChartData = (subwayData) => {
  const currentHour = new Date().getHours();

  const rawData = subwayData.map(({ hour, count }) => ({
    time: `${hour}시`,
    hour,
    count,
  }));

  const sorted = [...rawData].sort((a, b) => b.count - a.count);
  const total = sorted.length;

  const topEnd = Math.floor(total * 0.33);
  const midEnd = Math.floor(total * 0.66);

  const highCongestion = sorted.slice(0, topEnd).map((d) => d.hour);
  const midCongestion = sorted.slice(topEnd, midEnd).map((d) => d.hour);
  const lowCongestion = sorted.slice(midEnd).map((d) => d.hour);

  const coloredData = rawData.map((item) => {
    let color = Color.MC5;

    if (item.hour === currentHour) color = Color.MC1;
    else if (highCongestion.includes(item.hour)) color = "rgba(132, 120, 255, 0.4)";
    else if (midCongestion.includes(item.hour)) color = "rgba(132, 120, 255, 0.1)";
    else if (lowCongestion.includes(item.hour)) color = "rgba(132, 120, 255, 0.1)";

    return { ...item, fill: color };
  });

  const currentItem = rawData.find((d) => d.hour === currentHour);
  let state = "정보 없음";
  if (currentItem) {
    if (highCongestion.includes(currentHour)) state = "혼잡";
    else if (midCongestion.includes(currentHour)) state = "보통";
    else if (lowCongestion.includes(currentHour)) state = "여유";
  }

  return { coloredData, currentHour, state };
};

export default useSubwayChartData;
