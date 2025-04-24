import styled from "styled-components";
import Typography from "../Typography/Typography";
import { Color } from "../../styles/colorsheet";

const ReviewListBox = styled.div`
  background-color: ${({ modal }) => (modal ? Color.MC5 : "rgba(255, 255, 255, 0.7)")};
  border-radius: 10px;
  padding: 15px;
  margin-top: 10px;
  display: flex;
  align-items: flex-start;
  width: 100%;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
`;

const ReviewText = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
  word-break: keep-all;
  min-width: 0;
`;

const ReviewImage = styled.img`
  width: 60px;
  height: 80px;
  border-radius: 10px;
  object-fit: cover;
`;

const ReviewCard = ({ calenderDay, eventTitle, userNickname, reviewContent, imageUrl, modal = false }) => {
  return (
    <ReviewListBox modal={modal}>
      <ReviewText>
        <Typography variant="h4" color={Color.MC1}>
          {calenderDay}
        </Typography>
        <Typography variant="h4" style={{ fontWeight: "600", color: Color.BC2 }}>
          {eventTitle} - {userNickname}
        </Typography>
        <Typography variant="h6" color={Color.BC3} style={{ lineHeight: 1.4 }}>
          {reviewContent}
        </Typography>
      </ReviewText>
      <ReviewImage src={imageUrl} alt={eventTitle} />
    </ReviewListBox>
  );
};

export default ReviewCard;
