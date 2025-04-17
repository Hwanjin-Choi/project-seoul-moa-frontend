import styled from "styled-components";
import Typography from "../../components/Typography/Typography.js";
import { Color } from "../../styles/colorsheet.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Icons } from "../../assets/icons.js";

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
  margin-top: 10px;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
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
                <CategoryChip key={idx}>
                    <Typography variant="h6" color={Color.MC1}>
                        {cat}
                    </Typography>
                </CategoryChip>
            ))}
        </CategoryChipWrapper>
    </div>
);

export default InterestSection;