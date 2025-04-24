import styled from "styled-components";
import { useState } from "react";
import Typography from "../Typography/Typography";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Icons } from "../../assets/icons";
import { Color } from "../../styles/colorsheet";
import ReviewCard from "../Card/ReviewCard";

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

const ModalContent = styled.div`
  max-height: 50vh;
  overflow-y: auto;
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

const SwipeContainer = styled.div`
  position: relative;
  overflow: hidden;
  width: 100%;
`;

const SwipeContent = styled.div`
  display: flex;
  transition: transform 0.3s ease;
  transform: ${({ isSwiped }) => (isSwiped ? "translateX(-100px)" : "translateX(0)")};
`;

const SwipeActions = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  height: 100%;
  padding-top: 10px;
  display: flex;
  background-color: white;
  padding-right: 10px;
  align-items: center;
`;

const ActionButton = styled.button`
  background-color: ${({ bgColor }) => bgColor};
  color: ${({ iconColor }) => iconColor};
  border: none;
  width: 45px;
  height: 100%;
  display: flex;
  align-items: center;
  font-size: 15px;
  justify-content: center;
`;


const ReviewSection = ({
    userName,
    reviewData,
    isOpen,
    setIsOpen,
    showHeader = true,
    modalTitle = "전체 리뷰",
    showEdit = false,
    onEditClick,
    onDeleteClick,
}) => {
    const [swipedIndex, setSwipedIndex] = useState(null);

    return (
        <>
            {showHeader && (
                <FlexDiv>
                    <Typography variant="h3">{userName}님의 리뷰</Typography>
                    <FontAwesomeIcon
                        icon={Icons.more}
                        color={Color.BC3}
                        onClick={() => setIsOpen(true)}
                        style={{ cursor: "pointer" }}
                    />
                </FlexDiv>
            )}

            <ReviewCard
                calenderDay={reviewData[0].calenderDay}
                eventTitle={reviewData[0].eventTitle}
                userNickname={reviewData[0].userNickname}
                reviewContent={reviewData[0].reviewContent}
                imageUrl={reviewData[0].eventImageurl}
            />


            {isOpen && (
                <ModalWrapper onClick={() => setIsOpen(false)}>
                    <SlideModal onClick={(e) => e.stopPropagation()}>
                        <ModalHeader>
                            <Typography variant="h3">{modalTitle}</Typography>
                            <CloseButton onClick={() => setIsOpen(false)}>닫기</CloseButton>
                        </ModalHeader>

                        <ModalContent>
                            {reviewData.map((review, idx) => {
                                const isSwiped = swipedIndex === idx;

                                return (
                                    <SwipeContainer key={idx}>
                                        <SwipeContent
                                            isSwiped={isSwiped}
                                            onTouchStart={(e) => (e.currentTarget.startX = e.touches[0].clientX)}
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

                                        {showEdit && isSwiped && (
                                            <SwipeActions>
                                                <ActionButton
                                                    bgColor={Color.MC1}
                                                    iconColor={Color.MC5}
                                                    onClick={() => onEditClick && onEditClick(review)}
                                                >
                                                    <FontAwesomeIcon icon={Icons.pen} />
                                                </ActionButton>

                                                <ActionButton
                                                    bgColor={Color.BC2}
                                                    iconColor={Color.BC5}
                                                    onClick={() => {
                                                        if (window.confirm("정말 이 리뷰를 삭제하시겠습니까?")) {
                                                            onDeleteClick && onDeleteClick(review);
                                                        }
                                                    }}
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
        </>
    );
};

export default ReviewSection;