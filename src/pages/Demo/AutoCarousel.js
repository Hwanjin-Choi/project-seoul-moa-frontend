import React, { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import { Color } from "../../styles/colorsheet";
import Typography from "../../components/Typography/Typography";
import { useNavigate } from "react-router-dom";

const CarouselWrapper = styled.div`
  overflow-x: auto;
  display: flex;
  scroll-snap-type: x mandatory;
  scroll-behavior: smooth;
  gap: 12px;
  padding: 15px;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const Slide = styled.div`
  flex: 0 0 60%;
  aspect-ratio: 3 / 4;
  border-radius: 16px;
  background-color: ${Color.BC2};
  overflow: hidden;
  position: relative;
  padding: 15px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  @media (min-width: 768px) {
    flex: 0 0 50%;
    padding: 20px;
  };
  @media (min-width: 1024px) {
    flex: 0 0 45%;
    padding: 30px;
  };
`;

const InfoBox = styled.div`
  color: ${Color.BC1};
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const DotsWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 10px;
  gap: 6px;
`;

const Dot = styled.div`
  width: 8px;
  height: 8px;
  background-color: ${({ active }) => (active ? Color.MC1 : Color.BC4)};
  border-radius: 50%;
  transition: background-color 0.3s ease;
`;

const GradientOverlay = styled.div`
  position: absolute;
  inset: 0;
  z-index: 0;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent 70%);
`;

const AutoCarousel = ({ items }) => {
  const carouselRef = useRef(null);
  const [current, setCurrent] = useState(0);
  const navigate = useNavigate();

  const handleClick = (eventId) => {
    navigate(`/view-detail-page/${eventId}`);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (!carouselRef.current) return;
      const container = carouselRef.current;
      const slideWidth = container.firstChild?.offsetWidth || 0;
      const next = (current + 1) % items.length;
      container.scrollTo({
        left: slideWidth * next,
        behavior: "smooth",
      });
      setCurrent(next);
    }, 2000);

    return () => clearInterval(interval);
  }, [current, items.length]);

  return (
    <>
      <CarouselWrapper ref={carouselRef}>
        {items.map((item, idx) => (
          <Slide key={idx} onClick={() => handleClick(item.eventId)}>
            {item.image && (
              <img
                src={item.image}
                alt={`slide-${idx}`}
                style={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  zIndex: 0,
                  borderRadius: "inherit"
                }}
              />
            )}
            <GradientOverlay />

            <InfoBox style={{ position: "relative", zIndex: 1 }}>
              <Typography variant="h6" color={Color.BC5}>{item.location}</Typography>
              <Typography variant="h6" color={Color.BC5}>
                {item.startdate} - {item.enddate}
              </Typography>
              <Typography
                variant="h3"
                style={{
                  fontWeight: 700,
                  color: "white",
                  whiteSpace: "normal",
                  wordBreak: "keep-all",
                }}
              >
                {item.title}
              </Typography>
            </InfoBox>
          </Slide>
        ))}
      </CarouselWrapper>
      <DotsWrapper>
        {items.map((_, idx) => (
          <Dot key={idx} active={idx === current} />
        ))}
      </DotsWrapper>
    </>
  );
};

export default AutoCarousel;