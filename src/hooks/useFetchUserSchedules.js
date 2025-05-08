import { useEffect, useState } from "react";
import { fetchUserScheduleList } from "../api/userScheduleList";

export const useFetchUserSchedules = () => {
  const [userSchedules, setUserSchedules] = useState([]);

  useEffect(() => {
    const loadUserSchedules = async () => {
      try {
        const scheduleData = await fetchUserScheduleList();
        const futureSchedules = scheduleData.filter(item => !item.pastScheduled);
        console.log("🎯 scheduleData:", scheduleData);

        const formatted = futureSchedules.map(item => ({
          calenderDay: item.scheduleTime?.slice(0, 10),
          eventId: item.event.eventId,
          eventTitle: item.event.title,
          eventStartdate: item.event.startDate?.split("T")[0],
          eventEnddate: item.event.endDate?.split("T")[0],
          eventLocation: item.event.location,
          eventImageurl: item.event.imageUrl,
        }));

        setUserSchedules(formatted);
      } catch (err) {
        console.error("일정 데이터 불러오기 실패:", err);
      }
    };

    loadUserSchedules();
  }, []);

  return { userSchedules };
};