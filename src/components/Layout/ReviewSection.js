import styled from "styled-components";
import { useState } from "react";
import Typography from "../Typography/Typography";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Icons } from "../../assets/icons";
import { Color } from "../../styles/colorsheet";
import ReviewCard from "../Card/ReviewCard";
import Button from "../Button/Button";

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

const TextArea = styled.textarea`
  width: 100%;
  height: 100px;
  padding: 12px;
  border: 1px solid ${Color.BC4};
  border-radius: 12px;
  resize: none;
  font-family: inherit;
  font-size: 14px;
  line-height: 1.5;
`;

const EditHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 16px;
  margin-top: 20px;
`;
const EditImage = styled.img`
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 8px;
  margin-right: 12px;
`;
const EditInfo = styled.div``;

const BottomArea = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 12px;
`;

const ReviewSection = ({ reviewData, isOpen, setIsOpen, modalTitle = "전체 리뷰" }) => {
    const [reviews, setReviews] = useState(reviewData);
    const [swipedIndex, setSwipedIndex] = useState(null);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [currentReview, setCurrentReview] = useState(null);
    const [editContent, setEditContent] = useState("");

    const handleDelete = (idx) => {
        setReviews((prev) => prev.filter((_, i) => i !== idx));
        setSwipedIndex(null);
    };

    const handleEdit = (review, idx) => {
        setCurrentReview({ ...review, idx });
        setEditContent(review.reviewContent);
        setEditModalOpen(true);
    };

    const submitEdit = () => {
        setReviews((prev) =>
            prev.map((r, i) =>
                i === currentReview.idx ? { ...r, reviewContent: editContent } : r
            )
        );
        setEditModalOpen(false);
        setSwipedIndex(null);
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

            <ReviewCard
                calenderDay={reviews[0].calenderDay}
                eventTitle={reviews[0].eventTitle}
                userNickname={reviews[0].userNickname}
                reviewContent={reviews[0].reviewContent}
                imageUrl={reviews[0].eventImageurl}
            />

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
                                                calenderDay={review.calenderDay}
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
                <ModalWrapper onClick={() => setEditModalOpen(false)}>
                    <SlideModal onClick={e => e.stopPropagation()}>

                        <Typography variant="h3">리뷰 수정</Typography>
                        <EditHeader>
                            <EditImage src={currentReview.eventImageurl} alt="poster" />
                            <EditInfo>
                                <Typography variant="h4" color={Color.MC1}>{currentReview.calenderDay}</Typography>
                                <Typography variant="h3">{currentReview.eventTitle}</Typography>
                            </EditInfo>
                        </EditHeader>

                        <ModalContent>
                            <TextArea
                                placeholder="content"
                                value={editContent}
                                onChange={e => setEditContent(e.target.value)}
                            />
                            <BottomArea>
                                <Button
                                    onClick={() => setEditModalOpen(false)}
                                    style={{ flex: 1, backgroundColor: "#f2f2f2", color: "#888" }}
                                >
                                    취소
                                </Button>
                                <Button
                                    onClick={submitEdit}
                                    style={{ flex: 1, backgroundColor: Color.MC1, color: "white" }}
                                >
                                    수정하기
                                </Button>
                            </BottomArea>
                        </ModalContent>

                    </SlideModal>
                </ModalWrapper>
            )}
        </>
    );
};

export default ReviewSection;