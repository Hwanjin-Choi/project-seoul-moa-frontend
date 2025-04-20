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
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  padding: 24px;
  z-index: 1001;
`;

const ReserveModal = ({ onClose, date, data }) => {
    return (
        <ModalWrapper onClick={onClose}>
            <SlideModal onClick={(e) => e.stopPropagation()}>
                <Typography variant="h3" style={{ marginBottom: 12 }}>
                    <strong>{date}</strong>에 행사를 예약하시겠습니까?
                </Typography>

                <div style={{ display: "flex", gap: "15px", alignItems: "flex-start" }}>
                    <div style={{ flex: "0 0 150px" }}>
                        <img
                            src={data.image_url}
                            alt="poster"
                            style={{
                                width: "100%",
                                aspectRatio: "170 / 220",
                                borderRadius: "12px",
                                objectFit: "cover",
                            }}
                        />
                    </div>

                    <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "6px" }}>
                        <Typography variant="h3" color={Color.BC2}>{data.title}</Typography>
                        <Typography variant="h5" color={Color.BC3}>{data.startDate} - {data.endDate}</Typography>
                        <Typography variant="h5" color={Color.BC3}>{data.location}</Typography>
                    </div>
                </div>

                <div style={{ display: "flex", gap: "8px", marginTop: "24px" }}>
                    <Button variant="secondary" fullWidth onClick={onClose}>취소</Button>
                    <Button
                        variant="primary"
                        fullWidth
                        onClick={() => {
                            console.log(`${date}, ${data.title}`);
                            onClose();
                        }}
                    >
                        예약하기
                    </Button>
                </div>
            </SlideModal>
        </ModalWrapper>
    );
};

export default ReserveModal;