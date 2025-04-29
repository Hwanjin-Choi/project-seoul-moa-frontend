import styled from "styled-components";
import Typography from "../../components/Typography/Typography.js";
import Button from "../../components/Button/Button.js";
import { Color } from "../../styles/colorsheet.js";

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

const Poster = styled.img`
  width: 100%;
  aspect-ratio: 170 / 220;
  max-height: 180px;
  object-fit: cover;
  border-radius: 10px;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  align-items: flex-start;
`;

const PosterWrapper = styled.div`
  flex: 0 0 60px;
`;

const InfoWrapper = styled.div`
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 6px;
  word-break: break-word;
`;

const DateText = styled(Typography)`
  color: ${Color.MC1};
  font-weight: bold;
`;

const TitleText = styled(Typography)`
  color: ${Color.BC2};
  word-break: break-word;
  white-space: normal;
`;

const Textarea = styled.textarea`
  width: 100%;
  height: 100px;
  padding: 12px;
  border: 1px solid ${Color.BC4};
  border-radius: 12px;
  resize: none;
  font-family: inherit;
  margin-top: 20px;
`;

const EditReviewModal = ({
  isEditModalOpen,
  selectedReview,
  editedContent,
  setEditedContent,
  setIsEditModalOpen,
}) => {
  if (!isEditModalOpen || !selectedReview) return null;

  return (
    <ModalWrapper onClick={() => setIsEditModalOpen(false)}>
      <SlideModal onClick={(e) => e.stopPropagation()}>
        <Typography variant="h3" style={{ textAlign: "center", marginBottom: "24px" }}>
          리뷰 수정
        </Typography>

        <ContentWrapper>
          <PosterWrapper>
            <Poster src={selectedReview.eventImageurl} alt="poster" />
          </PosterWrapper>

          <InfoWrapper>
            <DateText variant="h4">
              {selectedReview.calenderDay}
            </DateText>

            <TitleText variant="h3">
              {selectedReview.eventTitle}
            </TitleText>
          </InfoWrapper>
        </ContentWrapper>

        <Textarea
          value={editedContent}
          onChange={(e) => setEditedContent(e.target.value)}
          placeholder="리뷰 내용을 입력하세요"
        />

        <div style={{ display: "flex", gap: "8px", marginTop: "24px" }}>
          <Button
            variant="secondary"
            fullWidth
            onClick={() => setIsEditModalOpen(false)}
          >
            취소
          </Button>
          <Button
            variant="primary"
            fullWidth
            onClick={() => {
              setIsEditModalOpen(false);
            }}
          >
            수정하기
          </Button>
        </div>
      </SlideModal>
    </ModalWrapper>
  );
};

export default EditReviewModal;
