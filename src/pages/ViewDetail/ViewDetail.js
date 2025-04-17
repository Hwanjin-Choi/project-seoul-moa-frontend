import styled from "styled-components";
import Typography from "../../components/Typography/Typography";
import { Color } from "../../styles/colorsheet";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Icons } from "../../assets/icons.js";

import MobileLayout from "../../components/Layout/MobileLayout";
import Container from "../../components/Layout/Container";
import Button from "../../components/Button/Button";
import ReviewCard from "../../components/Card/ReviewCard";

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

const PosterImage = styled.div`
    width: 100%;
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

const VDTGH2 = styled(Typography)`
    margin-top: 20px;
`;

const StyledHomeButton = styled(Button)`
    width: 100%;
    margin-top: 10px;
`;

const MapBox = styled.div`
    width: 100%;
    height: 150px;
    background-color: ${Color.BC3};
    border-radius: 12px;
    margin-top: 12px;
`;

const LocationBox = styled.div`
    display: flex;
    align-items: center;
    margin-top: 8px;
    gap: 4px;
    color: ${Color.MC1};
`;

const ChartBox = styled.div`
    width: 100%;
    height: 100px;
    background-color: ${Color.BC3};
    border-radius: 12px;
    margin: 16px 0;
`;

const Tag = styled.span`
    background-color: ${Color.MC1};
    color: white;
    padding: 2px 8px;
    border-radius: 12px;
    font-size: 12px;
    margin-left: 4px;
`;

const BottomButton = styled(Button)`
    width: 100%;
    margin-top: 16px;
    background-color: ${Color.MC1};
    color: white;
`;

const ViewDetailLayout = styled(Container)`
    background: linear-gradient(to top, ${Color.MC3}, ${Color.MC5});
    padding-bottom: 5vw;
    padding-top: 1.5vw;
`;

const TopBar = styled.div`
    position: sticky;
    top: 0;
    left: 0;
    width: 100%;
    padding: 0 25px;
    background-color: white;
    @media (min-width: 768px) {
        max-width: 720px;
        padding: 0 55px;
    }

    @media (min-width: 1024px) {
        max-width: 960px;
        padding: 0 70px;
    }
    z-index: 10;
    display: flex;
    align-items: center;
    height: 50px;
`;

const ViewDetail = () => {
    return (
        <MobileLayout>
            <TopBar>
                <FontAwesomeIcon icon={Icons.back} />
            </TopBar>

            <ViewDetailLayout>

                <InfoBox>
                    <PosterWrapper>
                        <PosterImage />
                    </PosterWrapper>
                    <InfoTextBox>
                        <InfoTexts>
                            <Typography variant="h2" color={Color.BC2} style={{ marginBottom: 10 }}>
                                Title
                            </Typography>

                            <Typography variant="h5" color={Color.BC3}>startday - endday</Typography>
                            <Typography variant="h5" color={Color.BC3}>address</Typography>
                            <Typography variant="h5" color={Color.BC3}>time</Typography>
                            <Typography variant="h5" color={Color.BC3}>user</Typography>
                            <Typography variant="h5" color={Color.BC3}>cost</Typography>
                        </InfoTexts>
                        <StyledHomeButton variant="primary" size="medium">
                            홈페이지
                        </StyledHomeButton>
                    </InfoTextBox>
                </InfoBox>

                <VDTGH2 variant="h2">리뷰</VDTGH2>
                <ReviewCard
                    calenderDay="visit day"
                    eventTitle="Title"
                    reviewContent="content"
                    imageUrl="리뷰 이미지 경로"
                />

                <VDTGH2 variant="h2">지도</VDTGH2>
                <MapBox />

                <LocationBox>
                    <FontAwesomeIcon icon={Icons.mapPin} />
                    <Typography variant="h3" color={Color.MC1}>station</Typography>
                </LocationBox>

                <ChartBox />

                <Typography variant="h5" style={{ textAlign: "center" }}>
                    currentTime 의 station2 는 <Tag>state</Tag> 단계입니다
                </Typography>

                <BottomButton>예약하기</BottomButton>
            </ViewDetailLayout>
        </MobileLayout>
    );
};

export default ViewDetail;