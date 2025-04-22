import { useState } from "react";
import useSubwayChartData from "./useSubwayChartData.js";
import { subwayData } from "../pages/ViewDetail/data.js";

const useViewDetail = () => {
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [isReserveOpen, setIsReserveOpen] = useState(false);

  const today = new Date();
  const currentDay = `${today.getFullYear()}년 ${today.getMonth() + 1}월 ${today.getDate()}일`;

  const {
    coloredData: subwayChartWithColor,
    currentHour,
    state,
  } = useSubwayChartData(subwayData);

  return {
    isReviewModalOpen,
    setIsReviewModalOpen,
    isReserveOpen,
    setIsReserveOpen,
    currentDay,
    subwayChartWithColor,
    currentHour,
    state,
  };
};

export default useViewDetail;
