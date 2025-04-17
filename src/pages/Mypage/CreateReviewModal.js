import styled from "styled-components";
import Typography from "../../components/Typography/Typography.js";
import Button from "../../components/Button/Button.js";
import { Color } from "../../styles/colorsheet.js";

const Backdrop = styled.div`
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

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
`;

const ModalContent = styled.div`
  max-height: 50vh;
  overflow-y: auto;
`;

const CreateReviewModal = ({ isCreateModalOpen, selectedCreateItem, createContent, setCreateContent, setIsCreateModalOpen }) => (
  isCreateModalOpen && selectedCreateItem && (
    <Backdrop onClick={() => setIsCreateModalOpen(false)}>
      <SlideModal onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <Typography variant="h3">리뷰 작성</Typography>
        </ModalHeader>
        <ModalContent>
          <div style={{ display: "flex", gap: "12px", marginBottom: "16px" }}>
            <img
              src={selectedCreateItem.eventImageurl}
              alt="리뷰 이미지"
              style={{ width: "60px", height: "60px", objectFit: "cover", borderRadius: "8px" }}
            />
            <div>
              <Typography variant="h5" color={Color.MC1}>{selectedCreateItem.calenderDay}</Typography>
              <Typography variant="h4">{selectedCreateItem.eventTitle}</Typography>
            </div>
          </div>
          <textarea
            value={createContent}
            onChange={(e) => setCreateContent(e.target.value)}
            placeholder="내용을 입력하세요"
            style={{ width: "100%", height: "100px", padding: "12px", border: `1px solid ${Color.BC4}`,
              borderRadius: "12px", resize: "none", fontFamily: "inherit" }}
          />
          <div style={{ display: "flex", gap: "8px", marginTop: "20px" }}>
            <Button variant="secondary" fullWidth onClick={() => setIsCreateModalOpen(false)}>취소</Button>
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
          </div>
        </ModalContent>
      </SlideModal>
    </Backdrop>
  )
);

export default CreateReviewModal;