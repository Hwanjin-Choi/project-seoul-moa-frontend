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

// 수정된 부분: 아이콘을 감싸는 버튼 스타일 추가
const EditButton = styled.button`
  background-color: transparent;
  border: none;
  padding: 8px; // 클릭 영역 확보 및 버튼 느낌을 위한 패딩
  border-radius: 50%; // 원형 버튼 모양
  cursor: pointer;
  display: inline-flex; // 아이콘 중앙 정렬을 위함
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s ease-in-out; // 부드러운 배경색 변경 효과

  &:hover {
    background-color: ${Color.Grey1 ||
    "#f0f0f0"}; // 호버 시 배경색 (colorsheet에 Grey1이 없다면 기본값)
  }

  &:active {
    background-color: ${Color.Grey2 ||
    "#e0e0e0"}; // 클릭 시 배경색 (colorsheet에 Grey2가 없다면 기본값)
  }
`;

const Iconstyle = styled(FontAwesomeIcon)`
  color: ${Color.MC1};
  width: 20px;
  height: 20px;
  display: block; // 버튼 내에서 아이콘 레이아웃 안정화
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

const InterestSection = ({
  userName,
  categoryName,
  onEditClick,
  isClicked,
}) => (
  <div>
    <Header>
      <Typography variant="h3">{userName}님의 관심사</Typography>
      {/* 수정된 부분: Iconstyle을 EditButton으로 감싸고, onClick을 EditButton으로 이동 */}
      <EditButton onClick={onEditClick} aria-label="관심사 수정">
        {" "}
        {/* 접근성을 위한 aria-label 추가 */}
        <Iconstyle icon={Icons.pen} color={isClicked ? Color.MC1 : Color.BC4} />
      </EditButton>
    </Header>

    <CategoryChipWrapper>
      {categoryName.map((cat, idx) => (
        <CategoryChip key={idx}>{cat}</CategoryChip>
      ))}
    </CategoryChipWrapper>
  </div>
);

export default InterestSection;
