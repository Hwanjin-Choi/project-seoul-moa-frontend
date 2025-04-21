import styled from "styled-components";
import Typography from "../Typography/Typography";
import { Color } from "../../styles/colorsheet";

const ReviewListBox = styled.div`
  background-color: ${Color.MC5};
  border-radius: 12px;
  padding: 15px;
  margin-top: 12px;
  display: flex;
  width: 100%;
  height: auto;
  align-items: flex-start;
`;

const ReviewText = styled.div`
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const ReviewImage = styled.img`
  width: 70px;
  height: 90px;
  border-radius: 12px;
  object-fit: cover;
  margin-left: 12px;
  flex-shrink: 0;
`;

const ReviewCard = ({ calenderDay, eventTitle, userNickname, reviewContent, imageUrl }) => {
    return (
        <ReviewListBox>
            <ReviewText>
                <Typography variant="h5" color={Color.MC1}>{calenderDay}</Typography>
                <Typography variant="h5" style={{ fontWeight: "bold" }}>{eventTitle} - {userNickname}</Typography>
                <Typography variant="h6" color={Color.BC3}>{reviewContent}</Typography>
            </ReviewText>
            <ReviewImage src={imageUrl} alt={eventTitle} />
        </ReviewListBox>
    );
};

export default ReviewCard;