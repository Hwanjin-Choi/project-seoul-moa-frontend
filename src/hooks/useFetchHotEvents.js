import { useEffect, useState } from "react";
import { fetchMostLikedEvents } from "../api/mostLikedEvents";

export const useFetchHotEvents = () => {
  const [hotEvents, setHotEvents] = useState([]);

  useEffect(() => {
    const loadMostLikedEvents = async () => {
      try {
        const result = await fetchMostLikedEvents({ offset: 0, limit: 4 });
        setHotEvents(result);
      } catch (err) {
        console.error("🔥 인기 행사 불러오기 실패:", err.message);
      }
    };

    loadMostLikedEvents();
  }, []);

  return { hotEvents };
};