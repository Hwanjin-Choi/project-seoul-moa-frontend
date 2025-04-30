import styled from "styled-components";
import { useState, useEffect } from "react";
import Typography from "../Typography/Typography";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Icons } from "../../assets/icons";
import { Color } from "../../styles/colorsheet";
import ReviewCard from "../Card/ReviewCard";
import EditReviewModal from "../../pages/Mypage/EditReviewModal";

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
  transform: ${({ isSwiped }) => (isSwiped ? "translateX(-90px)" : "translateX(0)")};
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


const ReviewSection = ({ reviewData, isOpen, setIsOpen, modalTitle = "전체 리뷰" }) => {
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

    const handleDelete = (idx) => {
        setReviews((prev) => prev.filter((_, i) => i !== idx));
        setSwipedIndex(null);
    };

    const handleEdit = (review, idx) => {
        setCurrentReview({ ...review, idx });
        setEditContent(review.reviewContent);
        setEditModalOpen(true);
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

            {reviews.length > 0 && (
                <ReviewCard
                    calendarDay={reviews[0].calendarDay}
                    eventTitle={reviews[0].eventTitle}
                    userNickname={reviews[0].userNickname}
                    reviewContent={reviews[0].reviewContent}
                    imageUrl={reviews[0].eventImageurl}
                />
            )}

            {isOpen && (
                <ModalWrapper onClick={() => setIsOpen(false)}>
                    <SlideModal onClick={(e) => e.stopPropagation()}>
                        <ModalHeader>
                            <Typography variant="h3">{modalTitle}</Typography>
                            <CloseButton onClick={() => setIsOpen(false)}>닫기</CloseButton>
                        </ModalHeader>

                        <ModalContent>
                            {reviews.map((review, idx) => {
                                const isSwiped = swipedIndex === idx;
                                return (
                                    <SwipeContainer key={idx}>
                                        <SwipeContent
                                            isSwiped={isSwiped}
                                            onTouchStart={(e) =>
                                                (e.currentTarget.startX = e.touches[0].clientX)
                                            }
                                            onTouchEnd={(e) => {
                                                const delta = e.changedTouches[0].clientX - e.currentTarget.startX;
                                                if (delta < -50) setSwipedIndex(idx);
                                                else setSwipedIndex(null);
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
                                                    style={{ borderTopRightRadius: 10, borderBottomRightRadius: 10 }}
                                                >
                                                    <FontAwesomeIcon icon={Icons.trash} />
                                                </ActionButton>
                                            </SwipeActions>
                                        )}
                                    </SwipeContainer>
                                );
                            })}
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
                />
            )}
        </>
    );
};

export default ReviewSection;