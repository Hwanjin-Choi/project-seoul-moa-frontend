import styled from "styled-components";
import Typography from "../../components/Typography/Typography";
import { Color } from "../../styles/colorsheet";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Icons } from "../../assets/icons.js";

import MobileLayout from "../../components/Layout/MobileLayout";
import Container from "../../components/Layout/Container";
import Button from "../../components/Button/Button";
import ReviewCard from "../../components/Card/ReviewCard";
import {
    EventDetailData,
    reviewData,
    mapData,
    subwayData
} from "./data";

import { useState } from "react";
import {
    BarChart,
    Bar,
    XAxis,
    Cell,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

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
    margin: 15px 0;
`;

const Tag = styled.span`
    background-color: ${Color.MC1};
    color: white;
    padding: 2px 8px;
    border-radius: 10px;
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

const FlexDiv = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 20px;
`;

const Backdrop = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 1000;
`;

const SlideModal = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  max-height: 60vh;
  background-color: #fff;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  padding: 24px;
  z-index: 1001;
  animation: slideUp 0.3s ease-out;

  @keyframes slideUp {
    from {
      transform: translateY(100%);
    }
    to {
      transform: translateY(0%);
    }
  }
`;

const ModalContent = styled.div`
  max-height: 50vh;
  overflow-y: auto;
  padding-right: 5px;
  scrollbar-width: none;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: ${Color.MC1};
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
`;


const ViewDetail = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const currentHour = new Date().getHours();
    const subwayChartData = Object.entries(subwayData).map(([key, value]) => {
        const hour = Number(key.replace("Timedata", ""));
        return {
            time: `${hour}시`,
            hour,
            count: Number(value),
        };
    });

    const top3 = [...subwayChartData]
        .sort((a, b) => b.count - a.count)
        .slice(0, 3)
        .map((item) => item.hour);

    const subwayChartWithColor = subwayChartData.map((item) => {
        let color = Color.MC5;
        if (item.hour === currentHour) color = Color.MC1;
        else if (top3.includes(item.hour)) color = "rgba(132, 120, 255, 0.4)";

        return { ...item, fill: color };
    });


    return (
        <MobileLayout>
            <TopBar>
                <FontAwesomeIcon icon={Icons.back} />
            </TopBar>

            <ViewDetailLayout>

                <InfoBox>
                    <PosterWrapper>
                        <PosterImage src={EventDetailData.image_url} />
                    </PosterWrapper>
                    <InfoTextBox>
                        <InfoTexts>
                            <Typography variant="h3" color={Color.BC2} style={{ marginBottom: 10 }}>
                                {EventDetailData.title}
                            </Typography>

                            <Typography variant="h5" color={Color.BC3}>{EventDetailData.startDate} ~ {EventDetailData.endDate}</Typography>
                            <Typography variant="h5" color={Color.BC3}>{EventDetailData.location}</Typography>
                            <Typography variant="h5" color={Color.BC3}>{EventDetailData.user}</Typography>
                            <Typography variant="h5" color={Color.BC3}>{EventDetailData.fee}</Typography>
                        </InfoTexts>
                        <StyledHomeButton
                            onClick={() => window.open(EventDetailData.homepage, "_blank")}
                            variant="primary"
                            size="medium"
                        >
                            홈페이지
                        </StyledHomeButton>
                    </InfoTextBox>
                </InfoBox>

                <FlexDiv>
                    <Typography variant="h3">리뷰</Typography>
                    <FontAwesomeIcon
                        icon={Icons.more}
                        color={Color.BC3}
                        onClick={() => setIsModalOpen(true)}
                        style={{ cursor: "pointer" }}
                    />
                </FlexDiv>

                <ReviewCard
                    calenderDay={reviewData[0].calenderDay}
                    eventTitle={reviewData[0].eventTitle}
                    reviewContent={reviewData[0].reviewContent}
                    imageUrl={reviewData[0].eventImageurl}
                />


                <Typography variant="h3" style={{ marginTop: 20 }}>지도</Typography>
                <MapBox />

                <LocationBox>
                    <FontAwesomeIcon icon={Icons.mapPin} />
                    <Typography variant="h3" color={Color.MC1}>station</Typography>
                </LocationBox>

                <ChartBox>
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={subwayChartWithColor}>
                            <XAxis
                                dataKey="time"
                                tick={({ x, y, payload }) => (
                                    <text
                                        x={x}
                                        y={y + 10}
                                        textAnchor="middle"
                                        fontSize="12"
                                        fill={Color.BC3}
                                        fontFamily="'Noto Sans', sans-serif"
                                    >
                                        {payload.value}
                                    </text>
                                )}
                            />

                            <Tooltip />
                            <Bar dataKey="count" radius={[10, 10, 0, 0]}>
                                {subwayChartWithColor.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.fill} />
                                ))}
                            </Bar>

                        </BarChart>
                    </ResponsiveContainer>
                </ChartBox>

                <Typography variant="h5" style={{ textAlign: "center" }}>
                    {currentHour}시 의 {subwayData.subwayName} 는 <Tag>{subwayData.state}</Tag> 단계입니다
                </Typography>


                <BottomButton>예약하기</BottomButton>
            </ViewDetailLayout>
            {isModalOpen && (
                <Backdrop onClick={() => setIsModalOpen(false)}>
                    <SlideModal onClick={(e) => e.stopPropagation()}>
                        <ModalHeader>
                            <Typography variant="h3">전체 리뷰</Typography>
                            <CloseButton onClick={() => setIsModalOpen(false)}>닫기</CloseButton>
                        </ModalHeader>

                        <ModalContent>
                            {reviewData.map((review, idx) => (
                                <ReviewCard
                                    key={idx}
                                    calenderDay={review.calenderDay}
                                    eventTitle={review.eventTitle}
                                    reviewContent={review.reviewContent}
                                    imageUrl={review.eventImageurl}
                                />
                            ))}
                        </ModalContent>
                    </SlideModal>
                </Backdrop>
            )}

        </MobileLayout>
    );
};

export default ViewDetail;