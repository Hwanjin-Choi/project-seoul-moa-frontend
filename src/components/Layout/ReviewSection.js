import styled from "styled-components";
import { useState, useEffect } from "react";
import Typography from "../Typography/Typography"; // Assuming path is correct
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Icons } from "../../assets/icons"; // Assuming Icons.emptyComments, Icons.more, Icons.pen, Icons.trash are defined
import { Color } from "../../styles/colorsheet";
import ReviewCard from "../Card/ReviewCard"; // Assuming path is correct
import EditReviewModal from "../../pages/Mypage/EditReviewModal"; // Assuming path is correct
import { deleteUserReview } from "../../api/userReviewDelete";
import { useNavigate } from "react-router-dom";

// --- Existing styled-components ---
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
  z-index: 1000; // Ensure modal is on top
`;

const SlideModal = styled.div`
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: 100%; // Default for mobile
  padding: 20px;
  background-color: white;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  z-index: 1001; // Ensure modal content is on top of wrapper

  // Tablet view
  @media (min-width: 768px) and (max-width: 1023px) {
    max-width: 720px;
    padding: 24px 40px;
  }

  // Desktop view
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
  color: ${Color.MC1 || "#007bff"}; // Fallback color
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
`;

const ModalContent = styled.div`
  max-height: 70vh; // Increased max-height for better desktop viewing
  overflow-y: auto;
`;

const SwipeContainer = styled.div`
  position: relative;
  overflow: hidden;
  width: 100%;
  margin-bottom: 10px; // Add some space between review items
`;

const SwipeContent = styled.div`
  display: flex;
  transition: transform 0.3s ease;
  transform: ${({ isSwiped }) =>
    isSwiped ? "translateX(-90px)" : "translateX(0)"};
  cursor: pointer; // Indicate it's clickable
`;

const SwipeActions = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  height: 100%;
  padding-top: 10px; // Align with ReviewCard's internal padding if any
  display: flex;
  align-items: center; // Vertically center buttons
`;

const ActionButton = styled.button`
  background-color: ${({ bgColor }) => bgColor};
  color: ${({ iconColor }) => iconColor};
  border: none;
  width: 45px;
  height: calc(100% - 10px); // Adjust height to match ReviewCard content area
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  &:first-of-type {
    // For edit button if it's the first
  }
  &:last-of-type {
    // For delete button if it's the last
    border-top-right-radius: 8px; // Match ReviewCard's border-radius if any
    border-bottom-right-radius: 8px; // Match ReviewCard's border-radius if any
  }
`;

const EmptyDataContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem 1rem;
  margin-top: 10px;
  border: 1px dashed ${Color.Grey3 || "#e0e0e0"};
  border-radius: 8px;
  background-color: ${Color.Grey1 || "#f9f9f9"};
  text-align: center;
  min-height: 120px;

  .empty-icon {
    font-size: 2.5rem;
    color: ${Color.Grey4 || "#bdbdbd"};
    margin-bottom: 0.75rem;
  }
`;

const ReviewItemContainer = styled.div`
  display: flex;
  align-items: stretch; // Make items stretch to the same height
  position: relative;
  background-color: ${Color.MC || "#ffffff"}; // Card background
  border-radius: 8px; // Rounded corners for the whole item
  overflow: hidden; // Ensures child elements conform to border radius
`;

const DesktopActionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center; // Center buttons vertically
  gap: 0px; // No gap, buttons will be full width of this container part
  flex-shrink: 0; // Prevent shrinking
  // width: 90px; // Fixed width for the actions area

  @media (max-width: 1023px) {
    // Hide on non-desktop screens
    display: none;
  }
`;

const DesktopActionButton = styled.button`
  background-color: transparent; // Transparent background
  border: none;
  // border-left: 1px solid ${Color.Grey2 || "#f0f0f0"}; // Separator line
  color: ${({ actionColor }) => actionColor || Color.BC3 || "#555"};
  padding: 12px 10px; // Increased padding for a better touch target and visual balance
  cursor: pointer;
  display: flex;
  flex-direction: column; // Icon above text
  align-items: center;
  justify-content: center;
  gap: 4px; // Space between icon and text
  font-size: 0.8rem; // Slightly smaller font for a cleaner look
  font-weight: 500;
  transition: background-color 0.2s ease;
  width: 100%; // Make button take full width of its container part
  height: 50%; // Each button takes half the height

  svg {
    // Targeting FontAwesomeIcon
    font-size: 1.1rem; // Icon size
    margin-bottom: 2px;
  }

  &:hover {
    background-color: ${Color.Grey1 || "#f9f9f9"};
  }

  &.edit {
    color: ${Color.MC1 || "#007bff"};
    &:hover {
      // background-color: ${Color.MC1Alpha || "rgba(0, 123, 255, 0.05)"};
    }
  }

  &.delete {
    color: ${Color.Point2 || "#dc3545"}; // Using Point2 for delete action
    &:hover {
      // background-color: ${Color.Point2Alpha || "rgba(220, 53, 69, 0.05)"};
    }
  }
`;
const DesktopReviewItem = styled.div``;
// --- End of updated styled-components ---

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
  const [reviews, setReviews] = useState([]);
  const [swipedIndex, setSwipedIndex] = useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [currentReview, setCurrentReview] = useState(null);
  const [editContent, setEditContent] = useState("");
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    setReviews(Array.isArray(reviewData) ? reviewData : []);
  }, [reviewData]);

  const firstReview = reviews.length > 0 ? reviews[0] : null;

  const handleDelete = async (reviewId, idx) => {
    if (!reviewId) {
      console.error("Review ID is missing, cannot delete.");
      alert("리뷰 ID가 없어 삭제할 수 없습니다.");
      return;
    }
    const confirmDelete = window.confirm("정말로 이 리뷰를 삭제하시겠습니까?");
    if (!confirmDelete) return;

    try {
      await deleteUserReview(reviewId);
      setReviews((prev) =>
        prev.filter((review) => review.reviewId !== reviewId)
      );
      if (swipedIndex === idx) {
        setSwipedIndex(null);
      }
      if (typeof refetchReviews === "function") {
        refetchReviews();
      }
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
    const nearBottom = scrollHeight - scrollTop <= clientHeight + 50;
    if (nearBottom && hasMore && !loading) {
      fetchMore();
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    if (typeof refetchReviews === "function") {
      refetchReviews();
    }
  };

  return (
    <>
      <FlexDiv>
        <Typography variant="h3">리뷰</Typography>
        {reviews.length > 0 && (
          <FontAwesomeIcon
            icon={Icons.more || "fas fa-ellipsis-h"}
            color={Color.BC3}
            onClick={() => setIsOpen(true)}
            style={{ cursor: "pointer" }}
          />
        )}
      </FlexDiv>

      <div
        onClick={() => reviews.length > 0 && setIsOpen(true)}
        style={{ cursor: reviews.length > 0 ? "pointer" : "default" }}
      >
        {firstReview ? (
          <ReviewCard
            calendarDay={firstReview.calendarDay}
            eventTitle={firstReview.eventTitle}
            userNickname={firstReview.userNickname}
            reviewContent={firstReview.reviewContent}
            imageUrl={firstReview.eventImageurl}
          />
        ) : (
          <EmptyDataContainer>
            <FontAwesomeIcon
              icon={
                Icons.emptyComments ||
                Icons.commentSlash ||
                "far fa-comment-dots"
              }
              className="empty-icon"
            />
            <Typography variant="body1" color={Color.BC3}>
              작성된 리뷰가 없습니다.
            </Typography>
            <Typography
              variant="caption"
              color={Color.Grey5 || "#888"}
              style={{ marginTop: "4px" }}
            >
              일정을 추가하고 리뷰를 남겨보세요!
            </Typography>
          </EmptyDataContainer>
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
                    // ReviewItemContainer now wraps the entire item for desktop, including buttons
                    <ReviewItemContainer key={review.reviewId || idx}>
                      {isDesktop ? (
                        <>
                          <div
                            style={{
                              flexGrow: 1,
                              padding: "12px",
                              cursor: "pointer",
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
                              // Removed modal prop, assuming ReviewCard styles itself or doesn't need it
                              modal={true}
                              calendarDay={review.calendarDay}
                              eventTitle={review.eventTitle}
                              userNickname={review.userNickname}
                              reviewContent={review.reviewContent}
                              imageUrl={review.eventImageurl}
                              // Pass a prop to ReviewCard to indicate it's in a list context if needed for styling
                              isListItem={true}
                            />
                          </div>
                          <DesktopActionsContainer>
                            <DesktopActionButton
                              className="edit"
                              actionColor={Color.MC1 || "#007bff"}
                              onClick={(e) => {
                                e.stopPropagation();
                                handleEdit(review, idx);
                              }}
                            >
                              <FontAwesomeIcon
                                icon={Icons.pen || "fas fa-pen"}
                              />
                              <span>수정</span>
                            </DesktopActionButton>
                            <DesktopActionButton
                              className="delete"
                              actionColor={Color.Point2 || "#dc3545"}
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDelete(review.reviewId, idx);
                              }}
                            >
                              <FontAwesomeIcon
                                icon={Icons.trash || "fas fa-trash"}
                              />
                              <span>삭제</span>
                            </DesktopActionButton>
                          </DesktopActionsContainer>
                        </>
                      ) : (
                        // Mobile view: Swipe functionality remains in its own container
                        <SwipeContainer>
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
                              else if (delta > 50) setSwipedIndex(null);
                              else setSwipedIndex(null);
                            }}
                            onClick={() => {
                              if (isSwiped) {
                                setSwipedIndex(null);
                                return;
                              }
                              if (review?.eventId) {
                                navigate(`/view-detail-page/${review.eventId}`);
                              } else {
                                console.warn("❗ eventId가 없습니다:", review);
                              }
                            }}
                          >
                            <ReviewCard
                              modal={true} // Keep modal prop for mobile swipe view if it affects styling
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
                                bgColor={Color.MC1 || "#007bff"}
                                iconColor={Color.MC5 || "#fff"}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleEdit(review, idx);
                                }}
                              >
                                <FontAwesomeIcon
                                  icon={Icons.pen || "fas fa-pen"}
                                />
                              </ActionButton>
                              <ActionButton
                                bgColor={Color.BC2 || "#dc3545"}
                                iconColor={Color.BC5 || "#fff"}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleDelete(review.reviewId, idx);
                                }}
                                style={{
                                  borderTopRightRadius: "8px",
                                  borderBottomRightRadius: "8px",
                                }}
                              >
                                <FontAwesomeIcon
                                  icon={Icons.trash || "fas fa-trash"}
                                />
                              </ActionButton>
                            </SwipeActions>
                          )}
                        </SwipeContainer>
                      )}
                    </ReviewItemContainer>
                  );
                })
              ) : (
                <EmptyDataContainer style={{ minHeight: "30vh" }}>
                  <FontAwesomeIcon
                    icon={
                      Icons.emptyComments ||
                      Icons.commentSlash ||
                      "far fa-comment-dots"
                    }
                    className="empty-icon"
                  />
                  <Typography variant="body1" color={Color.BC3}>
                    작성된 리뷰가 없습니다.
                  </Typography>
                </EmptyDataContainer>
              )}
              {loading && (
                <Typography
                  variant="body2"
                  style={{
                    textAlign: "center",
                    marginTop: "20px",
                    paddingBottom: "20px",
                  }}
                >
                  로딩 중...
                </Typography>
              )}
              {!hasMore && reviews.length == 0 && !loading && (
                <Typography
                  variant="caption"
                  color={Color.Grey5 || "#888"}
                  style={{
                    textAlign: "center",
                    display: "block",
                    marginTop: "20px",
                    paddingBottom: "10px",
                  }}
                >
                  더 이상 리뷰가 없습니다.
                </Typography>
              )}
            </ModalContent>
          </SlideModal>
        </ModalWrapper>
      )}

      {editModalOpen && currentReview && (
        <EditReviewModal
          isEditModalOpen={editModalOpen}
          selectedReview={currentReview}
          editedContent={editContent}
          setEditedContent={setEditContent}
          setIsEditModalOpen={setEditModalOpen}
          onSuccess={(updatedReviewData) => {
            setReviews((prevReviews) =>
              prevReviews.map((r) =>
                r.reviewId === updatedReviewData.reviewId
                  ? { ...r, reviewContent: updatedReviewData.reviewContent }
                  : r
              )
            );
            setEditModalOpen(false);
            setSwipedIndex(null);
            if (typeof refetchReviews === "function") {
              refetchReviews();
            }
          }}
        />
      )}
    </>
  );
};

export default ReviewSection;
