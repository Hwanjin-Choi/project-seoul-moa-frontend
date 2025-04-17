import styled from "styled-components";
import Typography from "../../components/Typography/Typography";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Icons } from "../../assets/icons";
import { Color } from "../../styles/colorsheet";
import ReviewCard from "../../components/Card/ReviewCard";

const FlexDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
`;

const ModalWrapper = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 1000;
`;

const SlideModal = styled.div`
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: 960px;
  padding: 24px;
  background-color: #fff;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  z-index: 1001;
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

const ReviewSection = ({ reviewData, isOpen, setIsOpen }) => {
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
                calenderDay={reviewData[0].calenderDay}
                eventTitle={reviewData[0].eventTitle}
                reviewContent={reviewData[0].reviewContent}
                imageUrl={reviewData[0].eventImageurl}
            />

            {isOpen && (
                <ModalWrapper onClick={() => setIsOpen(false)}>
                    <SlideModal onClick={(e) => e.stopPropagation()}>
                        <ModalHeader>
                            <Typography variant="h3">전체 리뷰</Typography>
                            <CloseButton onClick={() => setIsOpen(false)}>닫기</CloseButton>
                        </ModalHeader>
                        <ModalContent>
                            {reviewData.map((review, idx) => (
                                <ReviewCard
                                    key={idx}
                                    calenderDay={review.calenderDay}
                                    eventTitle={review.eventTitle}
                                    reviewContent={review.reviewContent}
                                    imageUrl={review.eventImageurl}
                                />
                            ))}
                        </ModalContent>
                    </SlideModal>
                </ModalWrapper>
            )}
        </>
    );
};

export default ReviewSection;