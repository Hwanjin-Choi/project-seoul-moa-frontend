import styled from "styled-components";
import { useState } from "react";

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
import { ScheduleCarousel } from "./ScheduleCard.js";
import ReserveEditModal from "./ReserveEditModal.js";
import ReserveDeleteModal from "./ReserveDeleteModal .js";
import EditCategoryModal from "./EditCategoryModal.js";

import { userData, EventData, reviewData } from "./data";

const BannerImg = styled.img`
  width: 100%;
  height: auto;
  margin-bottom: 15px;
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
  const [eventList, setEventList] = useState(EventData);
  const { upcoming, past } = splitEventDataByDate(eventList);

  const [editItem, setEditItem] = useState(null);
  const [deleteItem, setDeleteItem] = useState(null);

  const handleEditSave = (newDate) => {
    setEventList(prev =>
      prev.map(item =>
        item === editItem ? { ...item, calenderDay: newDate } : item
      )
    );
    setEditItem(null);
  };

  const handleDelete = () => {
    setEventList(prev => prev.filter(item => item !== deleteItem));
    setDeleteItem(null);
  };

  const [selectedCategories, setSelectedCategories] = useState(userData.categoryName);
  const [isEditCategoryOpen, setIsEditCategoryOpen] = useState(false);

  const [reviewList, setReviewList] = useState(reviewData);

  const handleDeleteReview = (targetReview) => {
    setReviewList((prev) => prev.filter((r) => r.id !== targetReview.id));
  };

  return (
    <MobileLayout>
      <BannerImg src={Banner} />
      <Container>
        <Section>
          <InterestSection
            userName={userData.userName}
            categoryName={selectedCategories}
            isClicked={isEditCategoryOpen}
            onEditClick={() => setIsEditCategoryOpen(true)}
          />
        </Section>

        <EditCategoryModal
          isOpen={isEditCategoryOpen}
          onClose={() => setIsEditCategoryOpen(false)}
          selected={selectedCategories}
          setSelected={setSelectedCategories}
        />

        {upcoming.length > 0 && (
          <Section>
            <Typography variant="h3">예약 일정</Typography>
            <ScheduleCarousel
              data={upcoming}
              onEditClick={setEditItem}
              onDeleteClick={setDeleteItem}
            />

            <ReserveEditModal
              isOpen={!!editItem}
              onClose={() => setEditItem(null)}
              onSave={handleEditSave}
              item={editItem}
            />

            <ReserveDeleteModal
              isOpen={!!deleteItem}
              onClose={() => setDeleteItem(null)}
              onDelete={handleDelete}
              item={deleteItem}
            />


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
            reviewData={reviewList}
            isOpen={state.isReviewModalOpen}
            setIsOpen={state.setIsReviewModalOpen}
            onEditClick={(review) => {
              state.setSelectedReview(review);
              state.setEditedContent(review.reviewContent);
              state.setIsEditModalOpen(true);
            }}
            onDeleteClick={handleDeleteReview}
          />
        </Section>

        <EditReviewModal {...state} />
        <CreateReviewModal {...state} />
      </Container>
    </MobileLayout>
  );
};

export default Mypage;
