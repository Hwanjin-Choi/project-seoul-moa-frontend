import styled from "styled-components";
import { useState } from "react";
import Typography from "../../components/Typography/Typography";
import Button from "../../components/Button/Button";
import { Color } from "../../styles/colorsheet";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt, faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { scheduleEvent } from "../../api/schedule";

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

const HeaderText = styled(Typography)`
  text-align: center;
  padding: 10px;
  white-space: normal;
  word-break: keep-all;
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

const ReserveModal = ({ onClose, data, date, eventId }) => {
  const today = new Date().toISOString().split("T")[0];
  const eventStart = data.startDate.split("T")[0];
  const eventEnd = data.endDate.split("T")[0];
  const minDate = eventStart > today ? eventStart : today;
  const maxDate = eventEnd;
  const [selectedDate, setSelectedDate] = useState(date || "");

  const formatDate = (dateStr) => {
    if (!dateStr || !/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
      return `--년 --월 --일`;
    }
    const [y, m, d] = dateStr.split("-");
    return `${y}년 ${parseInt(m, 10)}월 ${parseInt(d, 10)}일`;
  };

  const formatDateRange = (start, end) => {
    const format = (dateStr) => dateStr.split("T")[0];
    return `${format(start)} ~ ${format(end)}`;
  };

  const handleAddSchedule = async () => {
    if (!selectedDate) return;
    const payload = {
      eventId: Number(eventId),
      scheduleTime: new Date(selectedDate).toISOString(),
    };
    console.log("scheduleEvent payload:", payload);
    try {
      await scheduleEvent(payload);
      onClose();
    } catch (error) {
      console.error("일정 추가 실패:", error);
    }
  };

  return (
    <ModalWrapper onClick={onClose}>
      <SlideModal onClick={(e) => e.stopPropagation()}>
        <HeaderText variant="h3">
          <strong>{formatDate(selectedDate)}</strong>에 일정을 추가하시겠습니까?
        </HeaderText>

        <DateInput
          type="date"
          value={selectedDate}
          min={minDate}
          max={maxDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        />

        <ContentWrapper>
          <PosterWrapper>
            <Poster src={data.imageUrl} alt="poster" />
          </PosterWrapper>

          <InfoWrapper>
            <Typography
              variant="h3"
              color={Color.BC2}
              style={{ whiteSpace: "normal", wordBreak: "keep-all", marginBottom: 10 }}
            >
              {data.title}
            </Typography>
            <InfoRow>
              <StyledIcon icon={faCalendarAlt} />
              <Typography variant="h6" color={Color.BC3}>
                {formatDateRange(data.startDate, data.endDate)}
              </Typography>
            </InfoRow>

            <InfoRow>
              <StyledIcon icon={faMapMarkerAlt} />
              <Typography variant="h6" color={Color.BC3}>
                {data.location}
              </Typography>
            </InfoRow>
          </InfoWrapper>
        </ContentWrapper>

        <div style={{ display: "flex", gap: "8px", marginTop: "24px" }}>
          <Button variant="secondary" fullWidth onClick={onClose}>
            취소
          </Button>
          <Button variant="primary" fullWidth onClick={handleAddSchedule}>
            일정 추가
          </Button>
        </div>
      </SlideModal>
    </ModalWrapper>
  );
};

export default ReserveModal;