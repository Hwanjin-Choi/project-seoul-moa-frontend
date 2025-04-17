import styled from "styled-components";
import { useState } from "react";

import Typography from "../../components/Typography/Typography";
import { Color } from "../../styles/colorsheet";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Icons } from "../../assets/icons.js";
import Banner from "../../assets/img/Mypage_View1.png";

import MobileLayout from "../../components/Layout/MobileLayout";
import Container from "../../components/Layout/Container";
import Button from "../../components/Button/Button";
import ReviewCard from "../../components/Card/ReviewCard";

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
  color: ${({ color }) => color || Color.BC4};
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
  display: flex;
  flex-direction: row;
  overflow-x: auto;
  overflow-y: hidden;
  scroll-snap-type: x mandatory;
  gap: 15px;
  padding: 10px 0;
  -ms-overflow-style: none;
`;

const CarouselItem = styled.div`
  flex: 0 0 100%;
  scroll-snap-align: start;
  border-radius: 10px;
  background-color: ${Color.MC5};
  padding: 15px;
  display: flex;
`;

const Section = styled.div`
  margin-bottom: 20px;
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
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: 960px;
  padding: 24px;
  background-color: #fff;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  z-index: 1001;
  animation: slideUp 0.3s ease-out;

  @keyframes slideUp {
    from {
      transform: translate(-50%, 100%);
    }
    to {
      transform: translate(-50%, 0%);
    }
  }

  @media (min-width: 768px) {
    padding: 24px 55px;
  }

  @media (min-width: 1024px) {
    padding: 24px 70px;
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

const Mypage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isClicked, setIsClicked] = useState(false);
    const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedReview, setSelectedReview] = useState(null);
    const [editedContent, setEditedContent] = useState("");


    return (
        <MobileLayout>
            <BannerImg src={Banner} />

            <Container>
                <Section>
                    <Header>
                        <Typography variant="h3">{userData.userName}님의 관심사</Typography>
                        <Iconstyle
                            icon={Icons.pen}
                            onClick={() => {
                                setIsModalOpen(true);
                                setIsClicked(true);
                            }}
                            color={isClicked ? Color.MC1 : Color.BC4}
                        />
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
                        <Iconstyle
                            icon={Icons.more}
                            style={{ cursor: "pointer" }}
                            onClick={() => setIsReviewModalOpen(true)}
                        />
                    </Header>

                    <ReviewCard
                        calenderDay={reviewData[0].calenderDay}
                        eventTitle={reviewData[0].eventTitle}
                        reviewContent={reviewData[0].reviewContent}
                        imageUrl={reviewData[0].eventImageurl}
                    />
                </Section>
            </Container>

            {isModalOpen && (
                <Backdrop onClick={() => setIsModalOpen(false)}>
                    <SlideModal onClick={(e) => e.stopPropagation()}>
                        <ModalContent>
                            <Typography variant="h4">관심사 수정</Typography>

                            <Button
                                variant="primary"
                                fullWidth={true}
                                onClick={() => {
                                    setIsModalOpen(false);
                                    setIsClicked(false);
                                }}
                            >
                                완료
                            </Button>
                        </ModalContent>
                    </SlideModal>
                </Backdrop>
            )}

            {isReviewModalOpen && (
                <Backdrop onClick={() => setIsReviewModalOpen(false)}>
                    <SlideModal onClick={(e) => e.stopPropagation()}>
                        <ModalHeader>
                            <Typography variant="h3">전체 리뷰</Typography>
                            <CloseButton onClick={() => setIsReviewModalOpen(false)}>닫기</CloseButton>
                        </ModalHeader>

                        <ModalContent>
                            {reviewData.map((review, idx) => (
                                <div key={idx} style={{ position: "relative" }}>
                                    <ReviewCard
                                        calenderDay={review.calenderDay}
                                        eventTitle={review.eventTitle}
                                        reviewContent={review.reviewContent}
                                        imageUrl={review.eventImageurl}
                                    />
                                    <FontAwesomeIcon
                                        icon={Icons.pen}
                                        style={{
                                            position: "absolute",
                                            top: 12,
                                            right: 12,
                                            cursor: "pointer",
                                            color: Color.BC4,
                                        }}
                                        onClick={() => {
                                            setSelectedReview(review);
                                            setEditedContent(review.reviewContent);
                                            setIsEditModalOpen(true);
                                        }}
                                    />
                                </div>
                            ))}
                        </ModalContent>
                    </SlideModal>
                </Backdrop>
            )}

            {isEditModalOpen && selectedReview && (
                <Backdrop onClick={() => setIsEditModalOpen(false)}>
                    <SlideModal onClick={(e) => e.stopPropagation()}>
                        <ModalHeader>
                            <Typography variant="h3">리뷰 수정</Typography>
                            <CloseButton onClick={() => setIsEditModalOpen(false)}>닫기</CloseButton>
                        </ModalHeader>

                        <ModalContent>
                            <div style={{ display: "flex", gap: "12px", marginBottom: "16px" }}>
                                <img
                                    src={selectedReview.eventImageurl}
                                    alt="리뷰 이미지"
                                    style={{
                                        width: "60px",
                                        height: "60px",
                                        objectFit: "cover",
                                        borderRadius: "8px",
                                    }}
                                />
                                <div>
                                    <Typography variant="h5" color={Color.MC1}>
                                        {selectedReview.calenderDay}
                                    </Typography>
                                    <Typography variant="h4">{selectedReview.eventTitle}</Typography>
                                </div>
                            </div>

                            <textarea
                                value={editedContent}
                                onChange={(e) => setEditedContent(e.target.value)}
                                placeholder="내용을 입력하세요"
                                style={{
                                    width: "100%",
                                    height: "100px",
                                    padding: "12px",
                                    border: `1px solid ${Color.BC4}`,
                                    borderRadius: "12px",
                                    resize: "none",
                                    fontFamily: "inherit",
                                }}
                            />

                            <div style={{ display: "flex", gap: "8px", marginTop: "20px" }}>
                                <Button variant="secondary" fullWidth onClick={() => setIsEditModalOpen(false)}>
                                    취소
                                </Button>
                                <Button
                                    variant="primary"
                                    fullWidth
                                    onClick={() => {
                                        console.log("날짜:", selectedReview.calenderDay);
                                        console.log("제목:", selectedReview.eventTitle);
                                        console.log("내용:", editedContent);
                                        setIsEditModalOpen(false);
                                    }}
                                >
                                    수정하기
                                </Button>
                            </div>
                        </ModalContent>
                    </SlideModal>
                </Backdrop>
            )}

        </MobileLayout>
    );
};

export default Mypage;