import styled from "styled-components";
import Typography from "../../components/Typography/Typography.js";
import { Color } from "../../styles/colorsheet.js";

const CarouselWrapper = styled.div`
  display: flex;
  flex-direction: row;
  overflow-x: auto;
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

const ReviewCarousel = ({ reviewCreateData, onReviewClick }) => (
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
                    <ReviewButton onClick={() => onReviewClick(event)}>리뷰작성</ReviewButton>
                </ReviewInfoBox>
            </CarouselItem>
        ))}
    </CarouselWrapper>
);

export default ReviewCarousel;