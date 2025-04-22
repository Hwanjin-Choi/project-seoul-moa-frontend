import styled from "styled-components";
import { useState } from "react";
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

const DateInput = styled.input`
  width: 100%;
  height: 40px;
  padding: 0 10px;
  margin: 12px 0 20px;
  border: 1px solid ${Color.BC4};
  border-radius: 10px;
  font-size: 16px;
  color: ${Color.BC2};
`;

const Poster = styled.img`
  width: 100%;
  aspect-ratio: 170 / 220;
  border-radius: 12px;
  object-fit: cover;
`;

const ReserveModal = ({ onClose, data }) => {
  const today = new Date().toISOString().split("T")[0];
  const minDate = data.startDate > today ? data.startDate : today;
  const maxDate = data.endDate;
  const [selectedDate, setSelectedDate] = useState(minDate);

//   const handleReserve = async () => {
//     const payload = {
//       userId: 1,
//       eventId: 2,
//       selectedDate,
//     };

//     try {
//       const response = await fetch("", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(payload),
//       });
//       if (!response.ok) throw new Error("예약 실패");
//       onClose();
//     } catch (error) {
//       alert("예약에 실패했습니다. 다시 시도해주세요.");
//     }
//   };

  return (
    <ModalWrapper onClick={onClose}>
      <SlideModal onClick={(e) => e.stopPropagation()}>
        <Typography variant="h2" style={{ marginBottom: 12, textAlign: "center" }}>
          <strong>{selectedDate}</strong>에 행사를 예약하시겠습니까?
        </Typography>

        <DateInput
          type="date"
          value={selectedDate}
          min={minDate}
          max={maxDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        />

        <div style={{ display: "flex", gap: "15px", alignItems: "flex-start" }}>
          <div style={{ flex: "0 0 150px" }}>
            <Poster src={data.image_url} alt="poster" />
          </div>

          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "6px" }}>
            <Typography variant="h3" color={Color.BC2}>{data.title}</Typography>
            <Typography variant="h5" color={Color.BC3}>
              {data.startDate} - {data.endDate}
            </Typography>
            <Typography variant="h5" color={Color.BC3}>{data.location}</Typography>
          </div>
        </div>

        <div style={{ display: "flex", gap: "8px", marginTop: "24px" }}>
          <Button variant="secondary" fullWidth onClick={onClose}>
            취소
          </Button>
          <Button variant="primary" fullWidth>
            예약하기
          </Button>
        </div>
      </SlideModal>
    </ModalWrapper>
  );
};

export default ReserveModal;