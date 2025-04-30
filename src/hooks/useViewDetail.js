import { useState } from "react";
import useSubwayChartData from "./useSubwayChartData.js";
import EventDetail from "../api/EventDetail.js";

const useViewDetail = (eventId) => {
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [isReserveOpen, setIsReserveOpen] = useState(false);

  const today = new Date();
  const currentDay = `${today.getFullYear()}년 ${today.getMonth() + 1}월 ${today.getDate()}일`;

  const { eventData, loading } = EventDetail(eventId); // eventId from parameter!

  const subwayRawData = eventData?.nearestStation?.stationCrowdByHour?.filter(
    item => item.hour >= 6 && item.hour <= 22
  ).map(item => ({
    hour: item.hour,
    count: item.predictedTotal,
  })) || [];

  const {
    coloredData: subwayChartWithColor,
    currentHour,
    state,
  } = useSubwayChartData(subwayRawData);

  return {
    isReviewModalOpen,
    setIsReviewModalOpen,
    isReserveOpen,
    setIsReserveOpen,
    currentDay,
    subwayChartWithColor,
    currentHour,
    state,
    eventData,
    loading,
  };
};

export default useViewDetail;
