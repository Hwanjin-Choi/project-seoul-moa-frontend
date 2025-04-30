import { useEffect, useState } from "react";
import apiClient from "./index";

const useUserFetch = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await apiClient.get("/members/detail/me");
        if (res.data.status === "SUCCESS") {
          const data = res.data.data;
          setUser({
            nickname: data.nickname,
            age: data.age,
            gender: data.gender,
            categories: Array.isArray(data.memberCategories)
              ? data.memberCategories.map(cat => cat.categoryName)
              : [],
          });
        }
      } catch (err) {
        console.error("유저 정보를 불러오는 데 실패했습니다:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  return { user, loading };
};

export default useUserFetch;