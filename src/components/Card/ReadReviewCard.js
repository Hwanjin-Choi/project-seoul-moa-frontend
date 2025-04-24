import styled from "styled-components";
import Typography from "../Typography/Typography";
import { Color } from "../../styles/colorsheet";

const CardBox = styled.div`
  background-color: ${Color.MC5};
  border-radius: 10px;
  padding: 15px;
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  word-break: keep-all;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
`;

const ReadReviewCard = ({ calenderDay, eventTitle, userNickname, reviewContent }) => {
    return (
      <CardBox>
        <Typography variant="h4" color={Color.MC1}>
          {calenderDay}
        </Typography>
        <Typography variant="h4" style={{ fontWeight: "600", color: Color.BC2 }}>
          {eventTitle} - {userNickname}
        </Typography>
        <Typography variant="h6" color={Color.BC3} style={{ lineHeight: 1.4 }}>
          {reviewContent}
        </Typography>
      </CardBox>
    );
  };
  
  export default ReadReviewCard;