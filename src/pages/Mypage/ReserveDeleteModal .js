import styled from "styled-components";
import Typography from "../../components/Typography/Typography";
import Button from "../../components/Button/Button";
import { Color } from "../../styles/colorsheet";

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
  background-color: white;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  padding: 24px;
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
  border-radius: 10px;
  object-fit: cover;
`;

const ReserveDeleteModal = ({ isOpen, onClose, onDelete, item }) => {
  if (!isOpen || !item) return null;

  return (
    <ModalWrapper onClick={onClose}>
      <SlideModal onClick={(e) => e.stopPropagation()}>
        <Typography
          variant="h2"
          style={{ marginBottom: 16, textAlign: "center", color: Color.MC1 }}
        >
          예약을 정말 <strong>삭제</strong>하시겠습니까?
        </Typography>

        <div style={{ display: "flex", gap: "15px", alignItems: "flex-start" }}>
          <div style={{ flex: "0 0 150px" }}>
            <Poster src={item.eventImageurl} alt="poster" />
          </div>

          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "6px" }}>
            <Typography variant="h3" color={Color.BC2}>{item.eventTitle}</Typography>
            <Typography variant="h5" color={Color.BC3}>
              예약일: {item.calenderDay}
            </Typography>
            <Typography variant="h5" color={Color.BC3}>{item.eventLocation}</Typography>
          </div>
        </div>

        <div style={{ display: "flex", gap: "8px", marginTop: "24px" }}>
          <Button variant="secondary" fullWidth onClick={onClose}>
            아니요, 유지할래요
          </Button>
          <Button
            variant="primary"
            fullWidth
            onClick={() => {
              onDelete();
              onClose();
            }}
          >
            네, 삭제할게요
          </Button>
        </div>
      </SlideModal>
    </ModalWrapper>
  );
};

export default ReserveDeleteModal;