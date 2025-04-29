import { useEffect, useState } from "react";
import axios from "axios";

const EventDetail = (eventId) => {
  const [eventData, setEventData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (eventId == null) return;
    setLoading(true);
    axios
      .get(`http://localhost:8080/events/data/${eventId}`)
      .then(res => {
        setEventData(res.data.data);
      })
      .catch(e => {
        console.error("이벤트 상세 가져오기 실패", e);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [eventId]);

  return { eventData, loading };
};

export default EventDetail;