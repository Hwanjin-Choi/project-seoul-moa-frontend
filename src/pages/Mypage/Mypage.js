import styled from "styled-components";
import Banner from "../../assets/img/Mypage_View1.png";
import MobileLayout from "../../components/Layout/MobileLayout";
import Container from "../../components/Layout/Container";
import Typography from "../../components/Typography/Typography";

import useMypage from "../../hooks/useMypage.js";
import InterestSection from "./InterestSection.js";
import CreateReviewModal from "./CreateReviewModal.js";
import EditReviewModal from "./EditReviewModal.js";
import ReviewCarousel from "./ReviewCarousel.js";
import ReviewModal from "./ReviewModal.js";
import Navigation from "../../components/Navigation/Navigation.js";

import { userData, reviewCreateData, reviewData } from "./data";

const BannerImg = styled.img`
  width: 100%;
  height: auto;
  margin-bottom: 15px;
`;

const Section = styled.div`
  margin-bottom: 20px;
`;

const Mypage = () => {
  const state = useMypage();

  return (
    <MobileLayout>
      <BannerImg src={Banner} />
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

      <Section>
        <Typography variant="h3">리뷰 작성하기</Typography>
        <ReviewCarousel
          reviewCreateData={reviewCreateData}
          onReviewClick={(item) => {
            state.setSelectedCreateItem(item);
            state.setCreateContent("");
            state.setIsCreateModalOpen(true);
          }}
        />
      </Section>

      <Section>
        <ReviewModal
          reviewData={reviewData}
          isOpen={state.isReviewModalOpen}
          setIsOpen={state.setIsReviewModalOpen}
          modalTitle={`${userData.userName}님의 전체 리뷰`}
          onEditClick={(review) => {
            state.setSelectedReview(review);
            state.setEditedContent(review.reviewContent);
            state.setIsEditModalOpen(true);
          }}
        />
      </Section>

      <EditReviewModal {...state} />
      <CreateReviewModal {...state} />
      <Navigation />
    </MobileLayout>
  );
};

export default Mypage;