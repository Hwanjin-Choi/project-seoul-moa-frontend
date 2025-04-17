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
`;

const PosterImage = styled.img`
  width: 100%;
  height: 100%;
  aspect-ratio: 170 / 220;
  background-color: ${Color.BC3};
  border-radius: 10px;
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
  gap: 4px;
`;

const StyledHomeButton = styled(Button)`
  width: 100%;
  margin-top: 10px;
`;

const GrayText = styled(Typography).attrs({
    color: Color.BC3,
})``;

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
                    <GrayText variant="h5" >{data.startDate} ~ {data.endDate}</GrayText>
                    <GrayText variant="h5" >{data.location}</GrayText>
                    <GrayText variant="h5" >{data.user}</GrayText>
                    <GrayText variant="h5" >{data.fee}</GrayText>
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