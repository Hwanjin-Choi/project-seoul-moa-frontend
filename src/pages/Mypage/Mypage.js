import styled from "styled-components";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Banner from "../../assets/img/Mypage_View1.png";
import MobileLayout from "../../components/Layout/MobileLayout";
import Typography from "../../components/Typography/Typography";
import Container from "../../components/Layout/Container.js";

import useMypage from "../../hooks/useMypage.js";
import InterestSection from "./InterestSection.js";
import CreateReviewModal from "./CreateReviewModal.js";
import EditReviewModal from "./EditReviewModal.js";
import ReviewCarousel from "./ReviewCarousel.js";
import ReviewSection from "../../components/Layout/ReviewSection.js";
import { ScheduleCarousel } from "./ScheduleCard.js";
import ReserveEditModal from "./ReserveEditModal.js";
import ReserveDeleteModal from "./ReserveDeleteModal .js";
import EditCategoryModal from "./EditCategoryModal.js";
import useUserFetch from "../../api/UserFetch";
import useMyReviewFetch from "../../hooks/useMyReviewFetch";
import { fetchUserScheduleList } from "../../api/userScheduleList";
import { updateUserSchedule, deleteUserSchedule } from "../../api/userScheduleUpdate";

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

const Mypage = () => {
  const state = useMypage();
  const [scheduleList, setScheduleList] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [past, setPast] = useState([]);
  const [editItem, setEditItem] = useState(null);
  const [deleteItem, setDeleteItem] = useState(null);
  const { user, loading } = useUserFetch();
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [isEditCategoryOpen, setIsEditCategoryOpen] = useState(false);

  const {
    reviews: reviewList,
    refetchReviews,
    fetchMoreReviews,
    hasMore,
    loading: reviewLoading,
    deleteReview,
  } = useMyReviewFetch();

  const loadSchedules = async () => {
    try {
      const result = await fetchUserScheduleList();
      setScheduleList(result);
      setUpcoming(result.filter(s => !s.pastScheduled));
      setPast(result.filter(s => s.pastScheduled));
    } catch (e) {
      console.error("일정 불러오기 실패:", e);
    }
  };

  useEffect(() => {
    loadSchedules();
  }, []);

  useEffect(() => {
    if (user) {
      setSelectedCategories(user.categories);
    }
  }, [user]);

  const handleEditSave = async (newDate) => {
    try {
      const newDateISO = new Date(newDate).toISOString();
      await updateUserSchedule({
        scheduleId: editItem.scheduleId,
        scheduleTime: newDateISO,
      });

      setScheduleList((prev) =>
        prev.map((item) =>
          item.scheduleId === editItem.scheduleId
            ? { ...item, scheduleTime: newDateISO }
            : item
        )
      );
      setEditItem(null);
      await loadSchedules();
    } catch (err) {
      alert("예약 수정 실패");
      console.error(err);
    }
  }

  const handleDelete = async () => {
    try {
      await deleteUserSchedule(deleteItem.scheduleId);
      setScheduleList((prev) =>
        prev.filter((item) => item.scheduleId !== deleteItem.scheduleId)
      );
      setDeleteItem(null);
      await loadSchedules();
    } catch (err) {
      alert("예약 삭제 실패");
      console.error(err);
    }
  };

  const handleDeleteReview = (targetReview) => {
    deleteReview(targetReview.reviewId);
  };

  if (loading) return <div>로딩 중...</div>;

  return (
    <MobileLayout>
      <BannerImg src={Banner} />
      <Container>
        <Section>
          <InterestSection
            userName={user?.nickname || "회원"}
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
          userInfo={user}
        />

        {upcoming.length > 0 && (
          <Section>
            <Typography variant="h3">다가오는 일정</Typography>
            <ScheduleCarousel
              data={upcoming.map(s => ({
                ...s,
                calenderDay: s.scheduleTime?.slice(0, 10),
                eventId: s.event.eventId,
                eventTitle: s.event.title,
                eventStartdate: s.event.startDate?.slice(0, 10),
                eventEnddate: s.event.endDate?.slice(0, 10),
                eventLocation: s.event.location,
                eventImageurl: s.event.imageUrl,
              }))}
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

        {past.filter(s => !s.event.hasReview).length > 0 && (
          <Section>
            <Typography variant="h3">리뷰 작성하기</Typography>
            <ReviewCarousel
              reviewCreateData={past
                .filter(s => !s.event.hasReview)
                .map(s => ({
                  ...s,
                  eventId: s.event.eventId,
                  calenderDay: s.scheduleTime?.slice(0, 10),
                  eventTitle: s.event.title,
                  eventImageurl: s.event.imageUrl,
                  eventStartdate: s.event.startDate?.slice(0, 10),
                  eventEnddate: s.event.endDate?.slice(0, 10),
                  eventLocation: s.event.location,
                }))
              }
              onReviewClick={(item) => {
                state.setSelectedCreateItem(item);
                state.setCreateContent("");
                state.setIsCreateModalOpen(true);
              }}
            />
          </Section>
        )}

        <Section>
          <ReviewSection
            userName={user?.nickname || "회원"}
            reviewData={reviewList}
            isOpen={state.isReviewModalOpen}
            setIsOpen={(value) => {
              state.setIsReviewModalOpen(value);
              if (!value) {
                refetchReviews();
                loadSchedules();
              }
            }}
            modalTitle="나의 리뷰 모아보기"
            showHeader={true}
            showEdit={true}
            onEditClick={(review) => {
              state.setSelectedReview(review);
              state.setEditedContent(review.reviewContent);
              state.setIsEditModalOpen(true);
            }}
            onDeleteClick={handleDeleteReview}
            fetchMore={fetchMoreReviews}
            hasMore={hasMore}
            loading={reviewLoading}
          />
        </Section>

        <EditReviewModal {...state} />
        <CreateReviewModal
          {...state}
          onReviewCreated={() => {
            state.setSelectedCreateItem(null);
            state.setCreateContent("");
            refetchReviews();
            loadSchedules();
          }}
        />
      </Container>
    </MobileLayout>
  );
};

export default Mypage;