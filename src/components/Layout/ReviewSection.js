import styled from "styled-components";
import { useState, useEffect } from "react";
import Typography from "../Typography/Typography";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Icons } from "../../assets/icons";
import { Color } from "../../styles/colorsheet";
import ReviewCard from "../Card/ReviewCard";
import EditReviewModal from "../../pages/Mypage/EditReviewModal";
import { deleteUserReview } from "../../api/userReviewDelete";
import { useNavigate } from "react-router-dom";

const FlexDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
`;

const ModalWrapper = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 1000;
`;

const SlideModal = styled.div`
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: 100%;
  padding: 20px;
  background-color: white;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  z-index: 1001;

  @media (min-width: 768px) and (max-width: 1023px) {
    max-width: 720px;
    padding: 24px 40px;
  }

  @media (min-width: 1024px) {
    max-width: 960px;
    padding: 24px 70px;
  }
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: ${Color.MC1};
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
`;

const ModalContent = styled.div`
  max-height: 50vh;
  overflow-y: auto;
`;

const SwipeContainer = styled.div`
  position: relative;
  overflow: hidden;
  width: 100%;
`;

const SwipeContent = styled.div`
  display: flex;
  transition: transform 0.3s ease;
  transform: ${({ isSwiped }) =>
    isSwiped ? "translateX(-90px)" : "translateX(0)"};
`;

const SwipeActions = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  height: 100%;
  padding-top: 10px;
  display: flex;
`;

const ActionButton = styled.button`
  background-color: ${({ bgColor }) => bgColor};
  color: ${({ iconColor }) => iconColor};
  border: none;
  width: 45px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ReviewSection = ({
  reviewData,
  isOpen,
  setIsOpen,
  modalTitle = "전체 리뷰",
  fetchMore,
  hasMore,
  loading,
  refetchReviews,
}) => {
  const navigate = useNavigate();
  const hasData = Array.isArray(reviewData) && reviewData.length > 0;
  const firstReview = hasData ? reviewData[0] : null;
  const [reviews, setReviews] = useState([]);
  const [swipedIndex, setSwipedIndex] = useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [currentReview, setCurrentReview] = useState(null);
  const [editContent, setEditContent] = useState("");

  useEffect(() => {
    if (reviewData?.length > 0) {
      setReviews(reviewData);
    }
  }, [reviewData]);

  const handleDelete = async (idx) => {
    const review = reviews[idx];
    if (!review?.reviewId) return;

    try {
      await deleteUserReview(review.reviewId);
      setReviews((prev) => prev.filter((_, i) => i !== idx));
      setSwipedIndex(null);
    } catch (err) {
      alert(err.message || "리뷰 삭제 중 오류가 발생했습니다.");
    }
  };

  const handleEdit = (review, idx) => {
    setCurrentReview({ ...review, idx });
    setEditContent(review.reviewContent);
    setEditModalOpen(true);
  };

  const handleScroll = (e) => {
    const { scrollTop, scrollHeight, clientHeight } = e.target;
    const nearBottom = scrollHeight - scrollTop <= clientHeight + 5;
    if (nearBottom && hasMore && !loading) {
      fetchMore();
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    refetchReviews?.();
  };

  return (
    <>
      <FlexDiv>
        <Typography variant="h3">리뷰</Typography>
        <FontAwesomeIcon
          icon={Icons.more}
          color={Color.BC3}
          onClick={() => setIsOpen(true)}
          style={{ cursor: "pointer" }}
        />
      </FlexDiv>

      <div onClick={() => setIsOpen(true)} style={{ cursor: "pointer" }}>
        {firstReview ? (
          <ReviewCard
            calendarDay={firstReview.calendarDay}
            eventTitle={firstReview.eventTitle}
            userNickname={firstReview.userNickname}
            reviewContent={firstReview.reviewContent}
            imageUrl={firstReview.eventImageurl}
          />
        ) : (
          <Typography
            variant="body2"
            color={Color.BC3}
            style={{ marginTop: "10px" }}
          >
            작성된 리뷰가 없습니다.
          </Typography>
        )}
      </div>

      {isOpen && (
        <ModalWrapper onClick={handleClose}>
          <SlideModal onClick={(e) => e.stopPropagation()}>
            <ModalHeader>
              <Typography variant="h3">{modalTitle}</Typography>
              <CloseButton onClick={handleClose}>닫기</CloseButton>
            </ModalHeader>

            <ModalContent onScroll={handleScroll}>
              {reviews.length > 0 ? (
                reviews.map((review, idx) => {
                  const isSwiped = swipedIndex === idx;
                  return (
                    <SwipeContainer key={idx}>
                      <SwipeContent
                        isSwiped={isSwiped}
                        onTouchStart={(e) =>
                          (e.currentTarget.startX = e.touches[0].clientX)
                        }
                        onTouchEnd={(e) => {
                          const delta =
                            e.changedTouches[0].clientX -
                            e.currentTarget.startX;
                          if (delta < -50) setSwipedIndex(idx);
                          else setSwipedIndex(null);
                        }}
                        onClick={() => {
                          if (review?.eventId) {
                            navigate(`/view-detail-page/${review.eventId}`);
                          } else {
                            console.warn("❗ eventId가 없습니다:", review);
                          }
                        }}
                      >
                        <ReviewCard
                          modal={true}
                          calendarDay={review.calendarDay}
                          eventTitle={review.eventTitle}
                          userNickname={review.userNickname}
                          reviewContent={review.reviewContent}
                          imageUrl={review.eventImageurl}
                        />
                      </SwipeContent>

                      {isSwiped && (
                        <SwipeActions>
                          <ActionButton
                            bgColor={Color.MC1}
                            iconColor={Color.MC5}
                            onClick={() => handleEdit(review, idx)}
                          >
                            <FontAwesomeIcon icon={Icons.pen} />
                          </ActionButton>
                          <ActionButton
                            bgColor={Color.BC2}
                            iconColor={Color.BC5}
                            onClick={() => handleDelete(idx)}
                            style={{
                              borderTopRightRadius: 10,
                              borderBottomRightRadius: 10,
                            }}
                          >
                            <FontAwesomeIcon icon={Icons.trash} />
                          </ActionButton>
                        </SwipeActions>
                      )}
                    </SwipeContainer>
                  );
                })
              ) : (
                <Typography variant="body2" color={Color.BC3}>
                  작성된 리뷰가 없습니다.
                </Typography>
              )}
              {loading && (
                <Typography
                  variant="body2"
                  style={{ textAlign: "center", marginTop: "10px" }}
                >
                  로딩 중...
                </Typography>
              )}
            </ModalContent>
          </SlideModal>
        </ModalWrapper>
      )}

      {editModalOpen && (
        <EditReviewModal
          isEditModalOpen={editModalOpen}
          selectedReview={currentReview}
          editedContent={editContent}
          setEditedContent={setEditContent}
          setIsEditModalOpen={setEditModalOpen}
          onSuccess={(updatedContent) => {
            const updated = [...reviews];
            updated[currentReview.idx].reviewContent = updatedContent;
            setReviews(updated);
            setSwipedIndex(null);
          }}
        />
      )}
    </>
  );
};

export default ReviewSection;
