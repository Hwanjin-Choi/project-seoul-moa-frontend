import styled from "styled-components";
import Typography from "../../components/Typography/Typography.js";
import Button from "../../components/Button/Button.js";
import { Color } from "../../styles/colorsheet.js";

const Backdrop = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: flex-end;
`;

const SlideModal = styled.div`
  width: 100%;
  max-width: 960px;
  background-color: #fff;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  padding: 24px;
  z-index: 1001;
  animation: slideUp 0.3s ease-out;

  @media (min-width: 768px) and (max-width: 1023px) {
    max-width: 720px;
    padding: 24px 40px;
  }

  @media (min-width: 1024px) {
    max-width: 960px;
    padding: 24px 70px;
  }

  @keyframes slideUp {
    from {
      transform: translateY(100%);
    }
    to {
      transform: translateY(0);
    }
  }
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

const ModalContent = styled.div`
  max-height: 50vh;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const InfoRow = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
`;

const InfoImage = styled.img`
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 8px;
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

const ButtonRow = styled.div`
  display: flex;
  gap: 8px;
`;

const CreateReviewModal = ({
  isCreateModalOpen,
  selectedCreateItem,
  createContent,
  setCreateContent,
  setIsCreateModalOpen,
}) => (
  isCreateModalOpen && selectedCreateItem && (
    <Backdrop onClick={() => setIsCreateModalOpen(false)}>
      <SlideModal onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <Typography variant="h3">리뷰 작성</Typography>
        </ModalHeader>

        <ModalContent>
          <InfoRow>
            <InfoImage
              src={selectedCreateItem.eventImageurl}
              alt="리뷰 이미지"
            />
            <div>
              <Typography variant="h5" color={Color.MC1}>{selectedCreateItem.calenderDay}</Typography>
              <Typography variant="h4">{selectedCreateItem.eventTitle}</Typography>
            </div>
          </InfoRow>

          <TextArea
            value={createContent}
            onChange={(e) => setCreateContent(e.target.value)}
            placeholder="내용을 입력하세요"
          />

          <ButtonRow>
            <Button
              variant="secondary"
              fullWidth
              onClick={() => setIsCreateModalOpen(false)}
            >
              취소
            </Button>
            <Button
              variant="primary"
              fullWidth
              onClick={() => {
                console.log("날짜:", selectedCreateItem.calenderDay);
                console.log("제목:", selectedCreateItem.eventTitle);
                console.log("내용:", createContent);
                setIsCreateModalOpen(false);
              }}
            >
              작성하기
            </Button>
          </ButtonRow>
        </ModalContent>
      </SlideModal>
    </Backdrop>
  )
);

export default CreateReviewModal;