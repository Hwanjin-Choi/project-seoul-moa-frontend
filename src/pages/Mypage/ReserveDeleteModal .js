import styled from "styled-components";
import Typography from "../../components/Typography/Typography";
import Button from "../../components/Button/Button";
import { Color } from "../../styles/colorsheet";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt, faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";

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
  border-radius: 10px;
  object-fit: cover;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  align-items: flex-start;
`;

const PosterWrapper = styled.div`
  flex: 0 0 150px;
`;

const InfoWrapper = styled.div`
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 6px;
  word-break: break-word;
`;

const InfoRow = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;

const StyledIcon = styled(FontAwesomeIcon)`
  width: 12px;
  height: 12px;
  color: ${Color.MC1};
  flex-shrink: 0;
`;

const ReserveDeleteModal = ({ isOpen, onClose, onDelete, item }) => {
  if (!isOpen || !item) return null;

  return (
    <ModalWrapper onClick={onClose}>
      <SlideModal onClick={(e) => e.stopPropagation()}>
        <Typography
          variant="h3"
          style={{ marginBottom: "24px", textAlign: "center", color: Color.MC1 }}
        >
          예약을 정말 <strong>삭제</strong>하시겠습니까?
        </Typography>

        <ContentWrapper>
          <PosterWrapper>
            <Poster src={item.eventImageurl} alt="poster" />
          </PosterWrapper>

          <InfoWrapper>
            <Typography
              variant="h3"
              color={Color.BC2}
              style={{ whiteSpace: "normal", wordBreak: "keep-all", marginBottom: 10 }}
            >
              {item.eventTitle}
            </Typography>

            <InfoRow>
              <StyledIcon icon={faCalendarAlt} />
              <Typography variant="h6" color={Color.BC3}>
                예약일: {item.calenderDay}
              </Typography>
            </InfoRow>

            <InfoRow>
              <StyledIcon icon={faMapMarkerAlt} />
              <Typography variant="h6" color={Color.BC3}>
                {item.eventLocation}
              </Typography>
            </InfoRow>
          </InfoWrapper>
        </ContentWrapper>

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