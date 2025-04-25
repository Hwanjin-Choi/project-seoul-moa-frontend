import { useEffect, useState } from "react";
import axios from "axios";

const EventDetail = (eventId = 59) => {
  const [eventData, setEventData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/events/data/${eventId}`);
        setEventData(res.data.data);
      } catch (e) {
        console.error("이벤트 상세 가져오기 실패", e);
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [eventId]);

  return { eventData, loading };
};

export default EventDetail;