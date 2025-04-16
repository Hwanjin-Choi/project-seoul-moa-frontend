import styled from "styled-components";
import Typography from "../../components/Typography/Typography";
import { Color } from "../../styles/colorsheet";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Icons } from "../../assets/icons.js";

import MobileLayout from "../../components/Layout/MobileLayout";
import Container from "../../components/Layout/Container";

import Banner from "../../assets/img/Mypage_View1.png";

import { userData, reviewCreateData, reviewData } from "./data.js";

const BannerImg = styled.img`
  width: 100%;
  height: auto;
  margin-bottom: 15px;
`;

const CategoryChip = styled.div`
  min-width: 55px;
  height: 25px;
  border: 1px solid ${Color.MC1};
  border-radius: 9999px;
  background-color: ${Color.MC5};
  color: ${Color.MC1};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 12px;
  box-sizing: border-box;
`;

const CategoryChipWrapper = styled.div`
  margin-top: 10px;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Iconstyle = styled(FontAwesomeIcon)`
  color: ${Color.BC4};
  width: 14px;
  height: 14px;
`;

const Thumb = styled.img`
  width: 55%;
  height: 100%;
  border-radius: 10px;
  object-fit: cover;
`;

const ReviewInfoBox = styled.div`
  margin-left: 15px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 1;
`;

const ReviewButton = styled.button`
  background-color: ${Color.MC1};
  color: #fff;
  border-radius: 10px;
  padding: 10px 20px;
  width: 100%;
`;


const CarouselWrapper = styled.div`
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  display: flex;
  gap: 15px;
  padding: 10px 0;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none; 
`;

const CarouselItem = styled.div`
  flex: 0 0 100%;
  scroll-snap-align: start;
  border-radius: 10px;
  background-color: ${Color.MC5};
  padding: 15px;
  display: flex;
`;

const ReviewListBox = styled.div`
  background-color: ${Color.MC5};
  border-radius: 12px;
  padding: 15px;
  margin-top: 12px;
  display: flex;
  width: 100%;
  height: 100%;
`;

const ReviewText = styled.div`
  flex: 1;
`;

const ReviewImage = styled.img`
  width: 70px;
  height: 90px;
  border-radius: 12px;
  object-fit: cover;
  margin-left: 12px;
`;

const Section = styled.div`
  margin-bottom: 20px;
`;


const Mypage = () => {
    return (
        <MobileLayout>
            <BannerImg src={Banner} />

            <Container>
                <Section>
                    <Header>
                        <Typography variant="h3">{userData.userName}님의 관심사</Typography>
                        <Iconstyle icon={Icons.pen} />
                    </Header>

                    <CategoryChipWrapper>
                        {userData.categoryName.map((cat, idx) => (
                            <CategoryChip key={idx}>
                                <Typography variant="h6" color={Color.MC1}>
                                    {cat}
                                </Typography>
                            </CategoryChip>
                        ))}
                    </CategoryChipWrapper>
                </Section>

                <Section>
                    <Typography variant="h3">리뷰 작성하기</Typography>
                    <CarouselWrapper>
                        {reviewCreateData.map((event, idx) => (
                            <CarouselItem key={idx}>
                                <Thumb src={event.eventImageurl} />

                                <ReviewInfoBox>
                                    <div>
                                        <Typography variant="h3" color={Color.MC1}>
                                            {event.calenderDay}
                                        </Typography>
                                        <Typography variant="h3">{event.eventTitle}</Typography>
                                        <Typography variant="h5" color={Color.BC3}>
                                            {event.eventStartdate} ~ {event.eventEnddate}
                                        </Typography>
                                        <Typography variant="h5" color={Color.BC3}>
                                            {event.eventLocation}
                                        </Typography>
                                    </div>
                                    <ReviewButton>리뷰작성</ReviewButton>
                                </ReviewInfoBox>
                            </CarouselItem>
                        ))}
                    </CarouselWrapper>
                </Section>

                <Section>
                    <Header>
                        <Typography variant="h3">{userData.userName}님의 리뷰</Typography>
                        <Iconstyle icon={Icons.more} />
                    </Header>

                    {reviewData.map((review, idx) => (
                        <ReviewListBox key={idx}>
                            <ReviewText>
                                <Typography variant="h5" color={Color.MC1}>{review.calenderDay}</Typography>
                                <Typography variant="h3">{review.eventTitle}</Typography>
                                <Typography variant="h6" color={Color.BC3}>{review.reviewContent}</Typography>
                            </ReviewText>
                            <ReviewImage src={review.eventImageurl} alt={review.eventTitle} />
                        </ReviewListBox>
                    ))}
                </Section>
            </Container>
        </MobileLayout>
    );
};

export default Mypage;