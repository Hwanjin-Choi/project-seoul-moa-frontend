import styled from "styled-components";
import Typography from "../../components/Typography/Typography";
import Button from "../../components/Button/Button";
import { Color } from "../../styles/colorsheet";

const InfoBox = styled.div`
  display: flex;
  gap: 16px;
  margin-top: 16px;
  align-items: stretch;
  width: 100%;
`;

const PosterWrapper = styled.div`
  flex-basis: 55%;
  border-radius: 10px;
  overflow: hidden;

  @media (max-width: 768px) {
    flex-basis: 50%;
  }
`;

const PosterImage = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 10px;

  @media (max-width: 768px) {
    aspect-ratio: 4 / 4;
  }
`;

const InfoTextBox = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const InfoTexts = styled.div`
  display: flex;
  flex-direction: column;
  gap: 7px;
`;

const Row = styled.div`
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1px;
  }
`;
const Label = styled(Typography).attrs({
  variant: "h6",
  color: Color.BC2,
})`
  min-width: 60px;
  flex-shrink: 0;
`;

const Value = styled(Typography).attrs({
  variant: "h6",
  color: Color.BC3,
})`
  flex: 1;
  word-break: keep-all;
`;

const StyledHomeButton = styled(Button)`
  width: 100%;
  margin-top: 10px;
`;

const DetailHeader = ({ data }) => {
  return (
    <InfoBox>
      <PosterWrapper>
        <PosterImage src={data.image_url} />
      </PosterWrapper>
      
      <InfoTextBox>
        <InfoTexts>
          <Typography variant="h3" color={Color.BC2} style={{ marginBottom: 10 }}>
            {data.title}
          </Typography>

          <Row>
            <Label>날짜</Label>
            <Value>{data.startDate} ~ {data.endDate}</Value>
          </Row>
          <Row>
            <Label>주소</Label>
            <Value>{data.location}</Value>
          </Row>
          <Row>
            <Label>이용대상</Label>
            <Value>{data.user}</Value>
          </Row>
          <Row>
            <Label>이용요금</Label>
            <Value>{data.fee}</Value>
          </Row>
        </InfoTexts>

        <StyledHomeButton
          variant="primary"
          size="medium"
          onClick={() => window.open(data.homepage, "_blank")}
        >
          홈페이지
        </StyledHomeButton>
      </InfoTextBox>
    </InfoBox>
  );
};

export default DetailHeader;
