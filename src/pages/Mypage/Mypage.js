import styled from "styled-components";
import Banner from "../../assets/img/Mypage_View1.png";
import MobileLayout from "../../components/Layout/MobileLayout";
import Typography from "../../components/Typography/Typography";
import Container from "../../components/Layout/Container.js";

import useMypage from "../../hooks/useMypage.js";
import InterestSection from "./InterestSection.js";
import CreateReviewModal from "./CreateReviewModal.js";
import EditReviewModal from "./EditReviewModal.js";
import ReviewCarousel from "./ReviewCarousel.js";
import ReviewModal from "./ReviewModal.js";
import { ScheduleCarousel } from "../../components/Card/ScheduleCard.js";

import { userData, EventData, reviewData } from "./data";

const BannerImg = styled.img`
  width: 100%;
  height: auto;
  margin-bottom: 15px;
`;

const Section = styled.div`
  margin-bottom: 20px;
`;

const splitEventDataByDate = (data) => {
  const today = new Date();
  const upcoming = [];
  const past = [];

  data.forEach((item) => {
    const eventDate = new Date(item.calenderDay);
    if (isNaN(eventDate)) return;

    if (eventDate > today) {
      upcoming.push(item);
    } else {
      past.push(item);
    }
  });

  return { upcoming, past };
};

const Mypage = () => {
  const state = useMypage();
  const { upcoming, past } = splitEventDataByDate(EventData);

  return (
    <MobileLayout>
      <BannerImg src={Banner} />
      <Container>
        <Section>
          <InterestSection
            userName={userData.userName}
            categoryName={userData.categoryName}
            isClicked={state.isClicked}
            onEditClick={() => {
              state.setIsModalOpen(true);
              state.setIsClicked(true);
            }}
          />
        </Section>

        {upcoming.length > 0 && (
          <Section>
            <Typography variant="h3">예약 일정</Typography>
            <ScheduleCarousel data={upcoming} />
          </Section>
        )}

        {past.length > 0 && (
          <Section>
            <Typography variant="h3">리뷰 작성하기</Typography>
            <ReviewCarousel
              reviewCreateData={past}
              onReviewClick={(item) => {
                state.setSelectedCreateItem(item);
                state.setCreateContent("");
                state.setIsCreateModalOpen(true);
              }}
            />
          </Section>
        )}

        <Section>
          <ReviewModal
            userName={userData.userName}
            reviewData={reviewData}
            isOpen={state.isReviewModalOpen}
            setIsOpen={state.setIsReviewModalOpen}
            onEditClick={(review) => {
              state.setSelectedReview(review);
              state.setEditedContent(review.reviewContent);
              state.setIsEditModalOpen(true);
            }}
          />
        </Section>

        <EditReviewModal {...state} />
        <CreateReviewModal {...state} />
      </Container>
    </MobileLayout>
  );
};

export default Mypage;
