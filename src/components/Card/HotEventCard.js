import React from "react";
import styled from "styled-components";
import Typography from "../Typography/Typography";
import { Color } from "../../styles/colorsheet";
import CategoryChip from "../CategoryChip/CategoryChip";

const CardWrapper = styled.div`
  width: 47%;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 2px 6px rgba(0,0,0,0.1);
`;

const Image = styled.div`
  width: 100%;
  height: 25vh;
  background-image: url(${props => props.src});
  background-size: cover;
  position: relative;
`;

const InfoWrapper = styled.div`
  padding: 10px;
`;

const ChipRow = styled.div`
  display: flex;
  gap: 6px;
  margin-top: 10px;
`;

const DdayTag = styled.div`
  background-color: ${Color.MC1};
  padding: 3px 8px;
  border-radius: 9999px;
  position: absolute;
  top: 8px;
  left: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const HotEventCard = ({ item }) => {
    const dDay = Math.ceil(
        (new Date(item.startDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
    );

    return (
        <CardWrapper>
            <Image src={item.imageUrl}>
                <DdayTag>
                    <Typography variant="h6" color="white">
                        {dDay === 0 ? 'D-Day' : `D-${dDay}`}
                    </Typography>
                </DdayTag>
            </Image>

            <InfoWrapper>
                <Typography variant="h5" color={Color.BC2}>{item.eventTitle}</Typography>
                <Typography variant="h6" color={Color.BC3}>
                    {item.startDate} ~ {item.endDate}
                </Typography>
                <Typography variant="h6" color={Color.BC3}>
                    {item.location}
                </Typography>
                <ChipRow>
                    <CategoryChip>{item.categoryName}</CategoryChip>
                    <CategoryChip>{item.gu}</CategoryChip>
                </ChipRow>
            </InfoWrapper>
        </CardWrapper>
    );
};

export default HotEventCard;