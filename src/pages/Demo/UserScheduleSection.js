import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { fetchUserSchedules } from "../../hooks/useFetchUserSchedules"; // 가정한 경로
import { useNavigate } from "react-router-dom";
import { Color } from "../../styles/colorsheet";
import SchedulePreviewCarousel from "../../components/Card/SchedulePreviewCard"; // 가정한 경로
import Typography from "../../components/Typography/Typography"; // 가정한 경로

const MainPostimg = styled.div`
  padding-bottom: 5px;
`;

const Section = styled.div`
  margin-bottom: 25px;
  @media (min-width: 768px) {
    margin-bottom: 35px;
  }
  @media (min-width: 1024px) {
    margin-bottom: 40px;
  }
`;

// CardGrid는 현재 UserScheduleSection에서 직접 사용되지 않으므로 그대로 두었습니다.
const CardGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  background-color: rgba(255, 255, 255, 0.7);
  padding: 10px;
  justify-content: center;
  margin-top: 10px;
  border-radius: 10px;

  @media (min-width: 768px) {
    gap: 15px;
  }

  @media (min-width: 1024px) {
    gap: 20px;
  }
`;

const TitleRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem; /* 일관성을 위해 TitleRow에도 margin-bottom 추가 */
`;

const MoreLink = styled.span`
  color: ${Color.MC1};
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

// 새로 추가된 styled-component: 비어있는 일정 컨테이너
const EmptyScheduleContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem 1rem;
  margin-top: 1rem; /* TitleRow와의 간격 */
  border: 1px dashed ${Color.Grey3 || "#e0e0e0"}; /* colorsheet에 Grey3가 없다면 기본값 사용 */
  border-radius: 8px;
  background-color: ${Color.Grey1 ||
  "#f9f9f9"}; /* colorsheet에 Grey1이 없다면 기본값 사용 */
  text-align: center;
  min-height: 150px;

  .icon-placeholder {
    font-size: 2.5rem;
    color: ${Color.Grey4 ||
    "#bdbdbd"}; /* colorsheet에 Grey4가 없다면 기본값 사용 */
    margin-bottom: 0.75rem;
  }
`;

const UserScheduleSection = () => {
  const navigate = useNavigate();
  const isLoggedIn =
    localStorage.getItem("isLoggedIn") === "true" ? true : false;
  const [userSchedules, setUserSchedules] = useState([]);

  const handleMoreClick = () => {
    navigate("/my-page");
  };
  useEffect(() => {
    const loadSchedules = async () => {
      if (isLoggedIn) {
        try {
          const res = await fetchUserSchedules();
          setUserSchedules(res || []);
        } catch (error) {
          console.error("Failed to fetch user schedules:", error);
          setUserSchedules([]);
        }
      }
    };
    loadSchedules();
  }, [isLoggedIn]);

  return (
    <Section>
      <TitleRow>
        <Typography variant="h3">다가오는 나의 일정</Typography>
        {isLoggedIn && (
          <MoreLink onClick={handleMoreClick}>더보기</MoreLink>
        )}{" "}
      </TitleRow>
      {!isLoggedIn ? (
        <EmptyScheduleContainer>
          <Typography
            variant="body1"
            style={{ color: Color.Grey5 || "#757575" }}
          >
            로그인 후 일정을 확인해보세요.
          </Typography>
        </EmptyScheduleContainer>
      ) : userSchedules.length > 0 ? (
        <SchedulePreviewCarousel items={userSchedules} />
      ) : (
        <EmptyScheduleContainer>
          <div className="icon-placeholder">🗓️</div>
          <Typography
            variant="h6"
            component="p"
            style={{ marginBottom: "0.5rem", color: Color.Black || "#333" }}
          >
            예정된 일정이 없습니다.
          </Typography>
          <Typography
            variant="body2"
            style={{ color: Color.Grey5 || "#757575" }}
          >
            새로운 일정을 추가하여 하루를 계획해보세요!
          </Typography>
        </EmptyScheduleContainer>
      )}
    </Section>
  );
};

export default UserScheduleSection;
