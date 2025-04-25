import styled from "styled-components";
import Typography from "../../components/Typography/Typography.js";
import { Color } from "../../styles/colorsheet.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Icons } from "../../assets/icons.js";
import CategoryChip from "../../components/CategoryChip/CategoryChip";

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

const CategoryChipWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 10px;
  gap: 5px;
  @media (min-width: 768px) {
    gap: 10px;
    margin-top: 15px;
  }

  @media (min-width: 1024px) {
    gap: 15px;
    margin-top: 20px;
  }
`;

const InterestSection = ({ userName, categoryName, onEditClick, isClicked }) => (
  <div>
    <Header>
      <Typography variant="h3">{userName}님의 관심사</Typography>
      <Iconstyle
        icon={Icons.pen}
        onClick={onEditClick}
        color={isClicked ? Color.MC1 : Color.BC4}
      />
    </Header>

    <CategoryChipWrapper>
      {categoryName.map((cat, idx) => (
        <CategoryChip key={idx}>{cat}</CategoryChip>
      ))}
    </CategoryChipWrapper>
  </div>
);

export default InterestSection;