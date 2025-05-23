import styled from "styled-components";
import Typography from "../Typography/Typography";
import ReadReviewCard from "../Card/ReadReviewCard";
import { Color } from "../../styles/colorsheet";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Icons } from "../../assets/icons";

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

const ReadReviewSection = ({
  reviewData,
  isOpen,
  setIsOpen,
  fetchMore,
  hasMore,
  loading,
  modalTitle = "전체 리뷰",
}) => {
  const hasData = Array.isArray(reviewData) && reviewData.length > 0;
  const firstReview = hasData ? reviewData[0] : null;

  const handleScroll = (e) => {
    const { scrollTop, scrollHeight, clientHeight } = e.target;
    if (
      scrollTop > 0 &&
      scrollHeight - scrollTop <= clientHeight + 5 &&
      hasMore &&
      !loading
    ) {
      fetchMore();
    }
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
          <ReadReviewCard
            calendarDay={firstReview.calendarDay}
            userNickname={firstReview.userNickname}
            reviewContent={firstReview.reviewContent}
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
        <ModalWrapper onClick={() => setIsOpen(false)}>
          <SlideModal onClick={(e) => e.stopPropagation()}>
            <ModalHeader>
              <Typography variant="h3">{modalTitle}</Typography>
              <CloseButton onClick={() => setIsOpen(false)}>닫기</CloseButton>
            </ModalHeader>
            <ModalContent onScroll={handleScroll}>
              {hasData ? (
                reviewData.map((review, idx) => (
                  <ReadReviewCard
                    key={idx}
                    calendarDay={review.calendarDay}
                    userNickname={review.userNickname}
                    reviewContent={review.reviewContent}
                    modal={true}
                  />
                ))
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
    </>
  );
};

export default ReadReviewSection;