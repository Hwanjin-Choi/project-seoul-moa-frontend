import styled from "styled-components";
import { useState } from "react";

import Typography from "../../components/Typography/Typography";
import Button from "../../components/Button/Button";
import { Color } from "../../styles/colorsheet";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarAlt,
  faMapMarkerAlt,
  faUser,
  faWonSign,
  faBookmark,
} from "@fortawesome/free-solid-svg-icons";
import CategoryChip from "../../components/CategoryChip/CategoryChip";
import { postToggleEventLike } from "../../api/interaction/event/like";

const InfoBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;

  @media (min-width: 768px) {
    flex-direction: row;
    gap: 32px;
  }
`;

const PosterWrapper = styled.div`
  position: relative;
  flex-basis: 55%;
  margin-top: 8px;
`;

const StyledIcon = styled(FontAwesomeIcon)`
  width: 14px;
  height: 14px;
  color: ${Color.MC1};
  flex-shrink: 0;
`;

const CloseTextButton = styled.button`
  position: absolute;
  top: 20px;
  right: 25px;
  background: none;
  border: none;
  color: ${Color.BC2};
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;
  z-index: 10;
`;

const PosterImage = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 10px;
  //object-fit: contain;
  background-color: rgba(255, 255, 255, 0.7);

  @media (min-width: 768px) {
    aspect-ratio: 3 / 4;
  }
`;

const BookmarkIcon = styled(FontAwesomeIcon)`
  position: absolute;
  font-size: 40px;
  top: -5px;
  right: 15px;
  cursor: pointer;
  z-index: 10;
  color: ${({ isliked }) => (isliked ? Color.MC1 : Color.BC3)};
`;

const InfoContent = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-width: 0;
`;

const Title = styled(Typography)`
  font-size: 16px;
  font-weight: 700;
  margin-bottom: 10px;
  text-align: center;
  white-space: normal;
  word-break: keep-all;
`;

const ChipWrapper = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  justify-content: center;
  margin-bottom: 10px;
`;

const InfoCard = styled.div`
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;

  @media (min-width: 768px) {
    padding: 30px 0 30px;
    margin: 0 auto;
  }
`;

const InfoRow = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;

const ValueText = styled(Typography).attrs({
  variant: "h6",
  color: Color.BC3,
})`
  word-break: keep-all;
  flex: 1;
`;

const StyledHomeButton = styled(Button)`
  width: 100%;
  margin-top: 10px;

  @media (max-width: 768px) {
    margin-top: 16px;
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  position: relative;
  background: white;
  width: 100%;
  max-width: 480px;
  border-radius: 10px;
  padding-top: 40px;
`;

const ModalImage = styled.img`
  padding: 20px;
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 10px;
`;

const DetailHeader = ({ data }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLiked, setIsLiked] = useState(data.isLiked);
  const [likeCount, setLikeCount] = useState(data.likeCount || 0);

  const handleBookmarkClick = async () => {
    const prevLiked = isLiked;
    const newLiked = !prevLiked;
    const newCount = newLiked ? likeCount + 1 : Math.max(0, likeCount - 1);

    setIsLiked(newLiked);
    setLikeCount(newCount);

    try {
      const result = await postToggleEventLike(data.eventId);
      if (result !== "SUCCESS") {
        setIsLiked(prevLiked);
        setLikeCount(likeCount);
      }
    } catch (err) {
      console.error("북마크 토글 실패, 롤백", err);
      setIsLiked(prevLiked);
      setLikeCount(likeCount);
    }
  };

  return (
    <>
      <InfoBox>
        <PosterWrapper>
          <div style={{ height: "45vh" }}>
            <PosterImage
              src={data.imageUrl}
              alt={data.title}
              onClick={() => setIsModalOpen(true)}
              style={{ cursor: "pointer" }}
            />
            <BookmarkIcon
              icon={faBookmark}
              isliked={isLiked}
              onClick={handleBookmarkClick}
            />
          </div>
        </PosterWrapper>

        <InfoContent>
          <div>
            <Title>{data.title}</Title>

            <ChipWrapper>
              <CategoryChip>{data.categoryName}</CategoryChip>
              <CategoryChip>{data.gu}</CategoryChip>
            </ChipWrapper>

            <InfoCard>
              <InfoRow>
                <StyledIcon icon={faCalendarAlt} />
                <ValueText>{`${data.startDate.slice(0, 10)} ~ ${data.endDate.slice(0, 10)}`}</ValueText>
              </InfoRow>

              <InfoRow>
                <StyledIcon icon={faMapMarkerAlt} />
                <ValueText>{data.location}</ValueText>
              </InfoRow>

              <InfoRow>
                <StyledIcon icon={faUser} />
                <ValueText>{data.targetUser}</ValueText>
              </InfoRow>

              <InfoRow>
                <StyledIcon icon={faWonSign} />
                <ValueText>{data.isFree ? "무료" : data.fee || "정보 없음"}</ValueText>
              </InfoRow>
            </InfoCard>
          </div>

          <StyledHomeButton
            variant="primary"
            size="medium"
            onClick={() => window.open(data.detailUrl, "_blank")}
          >
            홈페이지
          </StyledHomeButton>
        </InfoContent>
      </InfoBox>

      {isModalOpen && (
        <ModalOverlay onClick={() => setIsModalOpen(false)}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <CloseTextButton onClick={() => setIsModalOpen(false)}>닫기</CloseTextButton>
            <ModalImage src={data.imageUrl} />
          </ModalContent>
        </ModalOverlay>
      )}
    </>
  );
};

export default DetailHeader;
