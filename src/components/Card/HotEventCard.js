import React, { useState } from "react";
import styled from "styled-components";
import Typography from "../Typography/Typography";
import { Color } from "../../styles/colorsheet";
import CategoryChip from "../CategoryChip/CategoryChip";
import DdayBadge from "../Badge/DdayBadge";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark } from "@fortawesome/free-solid-svg-icons";
import { postToggleEventLike } from "../../api/interaction/event/like";
import { faCalendarAlt, faMapMarkerAlt, faBookmark as faBookmarkSolid } from "@fortawesome/free-solid-svg-icons";


const CardWrapper = styled.div`
  width: 48%;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  position: relative;
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: scale(1.03);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
`
const Image = styled.div`
  width: 100%;
  height: 20vh;
  background-image: url(${props => props.src});
  background-size: cover;
  background-position: center;
  position: relative;
  margin-top: 5px;

  @media (min-width: 768px) {
    height: 25vh;
  }

  @media (min-width: 1024px) {
    height: 30vh;
  }
`;

const InfoWrapper = styled.div`
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 140px;
  @media (min-width: 768px) {
    height: 180px;
    padding: 14px;
  }
  @media (min-width: 1024px) {
    height: 200px;
    padding: 16px;
  }
`;

const TextInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const ChipRow = styled.div`
  display: flex;
  gap: 6px;
  margin-top: 10px;
  flex-wrap: wrap;
  @media (min-width: 768px) {
    gap: 8px;
    margin-top: 12px;
  }
`;

const DdayWrapper = styled.div`
  position: absolute;
  top: 8px;
  left: 8px;
`;

const Title = styled(Typography)`
  white-space: normal;
  overflow-wrap: break-word;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const BookmarkWrapper = styled.div`
  position: absolute;
  top: -3px;
  right: 8px;
  width: 30px;
  height: 30px;

  @media (min-width: 768px) {
    width: 35px;
    height: 35px;
  }

  @media (min-width: 1024px) {
    width: 40px;
    height: 40px;
  }
`;

const BookmarkIcon = styled(FontAwesomeIcon)`
  color: ${({ isliked }) => (isliked ? Color.MC1 : Color.BC4)};
  width: 100%;
  height: 100%;
`;

const InfoRow = styled.div`
  display: flex;
  align-items: center;
  gap: 3px;
  margin-top: 4px;
  color: ${Color.BC3};
  font-size: 13px;

  svg {
    color: ${Color.MC1};
    width: 10px;
    height: 10px;
  }

  @media (min-width: 768px) {
    font-size: 14px;
    svg {
      width: 16px;
      height: 16px;
    }
  }
`;

const formatDate = (dateStr) => {
  if (!dateStr) return "";
  const [year, month, day] = dateStr.split("T")[0].split("-");
  return `${month}.${day}`;
};

const HotEventCard = ({ item }) => {
  const navigate = useNavigate();
  const [isLiked, setIsLiked] = useState(item.likeYn === "Y");
  const [likeCount, setLikeCount] = useState(item.likeCount || 0);

  const handleClick = () => {
    navigate(`/view-detail-page/${item.eventId}`);
  };

  const handleLikeClick = async (e) => {
    e.stopPropagation();

    const prevLiked = isLiked;
    const newLiked = !prevLiked;
    const newCount = newLiked ? likeCount + 1 : Math.max(0, likeCount - 1);

    setIsLiked(newLiked);
    setLikeCount(newCount);

    try {
      const result = await postToggleEventLike(item.eventId);
      if (result !== "SUCCESS") {
        setIsLiked(prevLiked);
        setLikeCount(likeCount);
      }
    } catch (err) {
      console.error("북마크 실패:", err);
      setIsLiked(prevLiked);
      setLikeCount(likeCount);
    }
  };

  const formatLikeCount = (count) => {
    if (count >= 1_000_000) return `${(count / 1_000_000).toFixed(1)}M`;
    if (count >= 1_000) return `${(count / 1_000).toFixed(1)}K`;
    return `${count}`;
  }

  return (
    <CardWrapper onClick={handleClick}>
      <Image src={item.imageUrl}>
        <DdayWrapper>
          <DdayBadge startDate={item.startDate} endDate={item.endDate} />
        </DdayWrapper>
        <BookmarkWrapper onClick={handleLikeClick}>
          <BookmarkIcon icon={faBookmark} isliked={isLiked} />
        </BookmarkWrapper>
      </Image>

      <InfoWrapper>
        <TextInfo>
          <Title variant="h5" color={Color.BC2}>{item.eventTitle}</Title>

          <InfoRow>
            <FontAwesomeIcon icon={faCalendarAlt} />
            <Typography variant="h6" color={Color.BC3}>{formatDate(item.startDate)} ~ {formatDate(item.endDate)}</Typography>
          </InfoRow>

          <InfoRow>
            <FontAwesomeIcon icon={faMapMarkerAlt} />
            <Typography variant="h6" color={Color.BC3}>{item.location}</Typography>
          </InfoRow>

          <InfoRow>
            <FontAwesomeIcon icon={faBookmarkSolid} />
            <Typography variant="h6" color={Color.BC3}>{formatLikeCount(likeCount)}명이 관심 있어 합니다</Typography>
          </InfoRow>
        </TextInfo>

        <ChipRow>
          <CategoryChip>{item.categoryName}</CategoryChip>
          <CategoryChip>{item.gu}</CategoryChip>
        </ChipRow>
      </InfoWrapper>
    </CardWrapper>
  );
};

export default HotEventCard;
