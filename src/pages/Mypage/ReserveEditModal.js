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

const DateInput = styled.input`
  width: 100%;
  height: 40px;
  padding: 0 10px;
  margin: 12px 0 20px;
  border: 1px solid ${Color.BC4};
  border-radius: 10px;
  font-size: 15px;
  font-family: 'Pretendard';
  color: ${Color.BC2};
`;

const Poster = styled.img`
  width: 100%;
  aspect-ratio: 170 / 220;
  border-radius: 10px;
  object-fit: cover;
`;

const ReserveEditModal = ({ isOpen, onClose, onSave, item }) => {
  const [selectedDate, setSelectedDate] = useState(item?.calenderDay || "");
  if (!isOpen || !item) return null;

  const today = new Date().toISOString().split("T")[0];
  const minDate = item.eventStartdate > today ? item.eventStartdate : today;
  const maxDate = item.eventEnddate;

  return (
    <ModalWrapper onClick={onClose}>
      <SlideModal onClick={(e) => e.stopPropagation()}>
        <Typography variant="h2" style={{ marginBottom: 12, textAlign: "center" }}>
          <strong>{selectedDate}</strong> 로 수정하시겠습니까?
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
            <Poster src={item.eventImageurl} alt="poster" />
          </div>

          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "6px" }}>
            <Typography variant="h3" color={Color.BC2}>{item.eventTitle}</Typography>
            <Typography variant="h5" color={Color.BC3}>
              {item.eventStartdate} - {item.eventEnddate}
            </Typography>
            <Typography variant="h5" color={Color.BC3}>{item.eventLocation}</Typography>
          </div>
        </div>

        <div style={{ display: "flex", gap: "8px", marginTop: "24px" }}>
          <Button variant="secondary" fullWidth onClick={onClose}>취소</Button>
          <Button
            variant="primary"
            fullWidth
            onClick={() => {
              onSave(selectedDate);
              onClose();
            }}
          >
            저장
          </Button>
        </div>
      </SlideModal>
    </ModalWrapper>
  );
};

export default ReserveEditModal;