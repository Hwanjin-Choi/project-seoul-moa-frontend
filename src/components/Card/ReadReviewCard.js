import styled from "styled-components";
import Typography from "../Typography/Typography";
import { Color } from "../../styles/colorsheet";

const CardBox = styled.div`
  background-color: ${({ modal }) => (modal ? Color.MC5 : "rgba(255, 255, 255, 0.7)")};
  border-radius: 10px;
  padding: 15px;
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  word-break: keep-all;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
`;

const ReadReviewCard = ({ calenderDay, eventTitle, userNickname, reviewContent, modal = false }) => {
  return (
    <CardBox modal={modal}>
      <Typography variant="h4" color={Color.MC1}>
        {calenderDay}
      </Typography>
      <Typography
          variant="h6"
          color={Color.BC2}
          style={{
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-word',
            display: '-webkit-box',
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {reviewContent}
        </Typography>
        <Typography variant="h6" style={{ color: Color.BC3 }}>
        {userNickname}
      </Typography>
    </CardBox>
  );
};

export default ReadReviewCard;