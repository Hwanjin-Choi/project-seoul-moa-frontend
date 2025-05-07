import React from "react";
import styled from "styled-components";

const Dday = styled.div`
  background-color: #7b61ff;
  color: white;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 500;

  @media (max-width: 768px) {
    font-size: 12px;
    padding: 4px 10px;
  }
`;

const getDdayLabel = (startDateStr, endDateStr) => {
  if (!startDateStr || !endDateStr) return "";

  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const startDate = new Date(startDateStr);
    startDate.setHours(0, 0, 0, 0);

    const endDate = new Date(endDateStr);
    endDate.setHours(0, 0, 0, 0);

    if (today < startDate) {
      const diffDays = Math.ceil((startDate - today) / (1000 * 60 * 60 * 24));
      return `D-${diffDays}`;
    } else if (today >= startDate && today <= endDate) {
      return "진행중";
    } else {
      return "종료";
    }
  } catch (error) {
    console.error("D-day 계산 오류:", error);
    return "";
  }
};

const DdayBadge = ({ startDate, endDate }) => {
  const label = getDdayLabel(startDate, endDate);
  if (!label) return null;

  return <Dday>{label}</Dday>;
};

export default DdayBadge;