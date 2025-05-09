import { fetchUserScheduleList } from "../api/userScheduleList";

export const fetchUserSchedules = async () => {
  try {
    const scheduleData = await fetchUserScheduleList();
    const futureSchedules = scheduleData.filter((item) => !item.pastScheduled);
    console.log("🎯 scheduleData:", scheduleData);

    const formatted = futureSchedules.map((item) => ({
      calenderDay: item.scheduleTime?.slice(0, 10),
      eventId: item.event.eventId,
      eventTitle: item.event.title,
      eventStartdate: item.event.startDate?.split("T")[0],
      eventEnddate: item.event.endDate?.split("T")[0],
      eventLocation: item.event.location,
      eventImageurl: item.event.imageUrl,
    }));

    return formatted; // 데이터를 반환합니다.
  } catch (err) {
    console.error("일정 데이터 불러오기 실패:", err);
    throw err; // 에러를 다시 던져서 호출한 쪽에서 처리할 수 있도록 합니다.
  }
};
