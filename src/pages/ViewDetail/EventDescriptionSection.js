import { useState } from "react";
import styled from "styled-components";
import Typography from "../../components/Typography/Typography";
import { Color } from "../../styles/colorsheet";

const Wrapper = styled.div`
  margin-top: 20px;
`;

const OuterBox = styled.div`
  background-color: rgba(255, 255, 255, 0.7);
  border-radius: 10px;
  padding: 10px;
  margin-top: 10px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
  transition: max-height 0.3s ease;
  max-height: ${({ expanded }) => (expanded ? "35vh" : "8em")};
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

const ScrollBox = styled.div`
  padding: 5px;
  border-radius: 16px;
  flex: 1;
  overflow-y: auto;
`;

const ReadMoreButton = styled.button`
  margin-top: 10px;
  align-self: center;
  background: none;
  border: none;
  color: ${Color.MC1};
  font-weight: 600;
  font-size: 10px;
  cursor: pointer;
`;

const EventDescriptionSection = ({ description = "" }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <Wrapper>
      <Typography variant="h3">AI 요약 설명</Typography>
      <OuterBox expanded={expanded}>
        <ScrollBox>
          <Typography
            variant="h6"
            style={{
              whiteSpace: "pre-wrap",
              wordBreak: "break-word",
            }}
          >
            {description}
          </Typography>
        </ScrollBox>
        <ReadMoreButton onClick={() => setExpanded(!expanded)}>
          {expanded ? "접기" : "더보기"}
        </ReadMoreButton>
      </OuterBox>
    </Wrapper>
  );
};

export default EventDescriptionSection;