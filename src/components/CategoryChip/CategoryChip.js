import styled from "styled-components";
import Typography from "../Typography/Typography";
import { Color } from "../../styles/colorsheet";

const ChipWrapper = styled.div`
  min-width: 60px;
  height: 30px;
  border: 1px solid ${Color.MC1};
  border-radius: 9999px;
  background-color: ${Color.MC5};
  color: ${Color.MC1};
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;

  @media (min-width: 768px) {
    min-width: 65px;
    height: 35px;
  }

  @media (min-width: 1024px) {
    min-width: 85px;
    height: 40px;
  }
`;

const CategoryChip = ({ children }) => {
  return (
    <ChipWrapper>
      <Typography variant="h6" color={Color.MC1}>
        {children}
      </Typography>
    </ChipWrapper>
  );
};

export default CategoryChip;