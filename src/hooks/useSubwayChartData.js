import { Color } from "../styles/colorsheet";

const useSubwayChartData = (subwayData) => {
    const currentHour = new Date().getHours();

    const rawData = Object.entries(subwayData)
        .filter(([key]) => key.startsWith("Timedata"))
        .map(([key, value]) => {
            const hour = Number(key.replace("Timedata", ""));
            return {
                time: `${hour}시`,
                hour,
                count: Number(value),
            };
        });

    const top3 = [...rawData]
        .sort((a, b) => b.count - a.count)
        .slice(0, 3)
        .map((item) => item.hour);

    const coloredData = rawData.map((item) => {
        let color = Color.MC5;
        if (item.hour === currentHour) color = Color.MC1;
        else if (top3.includes(item.hour)) color = "rgba(132, 120, 255, 0.4)";
        return { ...item, fill: color };
    });

    return { coloredData, currentHour };
};

export default useSubwayChartData;
