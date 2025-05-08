import { useEffect, useState } from "react";
import { getUpcomingEvents } from "../api/event/events";

export const useFetchUpcomingEvents = () => {
  const [carouselItems, setCarouselItems] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCarouselItems = async () => {
      const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
      const rawCategoryId = localStorage.getItem("categoryId");

      let categoryId = [];
      try {
        categoryId = JSON.parse(rawCategoryId || "[]");
      } catch (err) {
        console.error("categoryId 파싱 실패:", err);
      }

      const payload = isLoggedIn
        ? { categoryId, isOpen: true, offset: 0, limit: 5 }
        : { isOpen: true, offset: 0, limit: 5 };

      try {
        const res = await getUpcomingEvents(payload);
        const events = res.data.eventList.map(event => ({
          image: event.imageUrl,
          location: event.location,
          startdate: event.startDate?.split("T")[0],
          enddate: event.endDate?.split("T")[0],
          title: event.title,
          eventId: event.eventId,
          categoryName: event.categoryName,
          gu: event.gu,
        }));
        setCarouselItems(events);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchCarouselItems();
  }, []);

  return { carouselItems, error };
};