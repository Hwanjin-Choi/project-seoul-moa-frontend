import React from "react"; // useState 제거
import styled, { css } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// faBookmark는 더 이상 기본으로 사용하지 않으므로 제거 가능 (필요시 유지)
// import { faBookmark } from "@fortawesome/free-solid-svg-icons";
import { Color } from "../../styles/colorsheet"; // Color 객체 import

// isClicked 상태에 따른 배경/전체 텍스트 색상 스타일
const getIsClickedBaseStyles = ({ isClicked }) => {
  if (isClicked) {
    return css`
      background-color: ${Color.MC1}; /* 클릭 시: 주 색상 배경 */
      color: ${Color.White || "#ffffff"}; /* 클릭 시: 흰색 텍스트 (전체) */
      border: 1px solid ${Color.MC1}; /* 클릭 시: 테두리 색상 일치 */
    `;
  }
  return css`
    background-color: ${Color.Gray1 ||
    "#f0f0f0"}; /* 미클릭 시: 밝은 회색 배경 */
    color: ${Color.Black || "#333333"}; /* 미클릭 시: 기본 텍스트 색상 */
    border: 1px solid ${Color.Gray2 || "#dcdcdc"}; /* 미클릭 시: 회색 테두리 */
  `;
};

// isClicked 상태에 따른 아이콘/텍스트 상세 색상 (필요시 사용, 위에서 통합 가능)
const getForegroundColor = ({ isClicked }) => {
  if (isClicked) {
    return Color.White || "#ffffff"; /* 클릭 시: 흰색 */
  }
  // 미클릭 시: 아이콘/텍스트에 별도 색상을 주려면 여기서 지정 (예: Color.MC1)
  // return Color.MC1; // 아이콘/텍스트만 메인 컬러로 할 경우
  return "inherit"; // 기본값은 버튼의 color 속성(위 getIsClickedBaseStyles에서 설정) 상속
};

// 버튼 기본 스타일
const StyledCategoryButton = styled.button`
  border: none; /* 기본 테두리 제거 후 아래에서 재정의 */
  border-radius: 10px;
  padding: 10px;
  margin: 5px; /* 그리드 gap으로 대체 고려 */
  cursor: pointer;
  width: 120px;
  height: 120px;
  font-size: 16px; /* 기본 텍스트 크기, 실제 텍스트는 Text 컴포넌트에서 제어 */
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  transition: all 0.2s ease; /* 부드러운 전환 효과 */

  ${getIsClickedBaseStyles} /* isClicked 상태에 따른 기본 스타일 적용 */

  /* 호버 효과 (미클릭 시에만 적용) */
  &:hover {
    ${({ isClicked }) =>
      !isClicked &&
      css`
        border-color: ${Color.MC1}; /* 호버 시 테두리 강조 */
        /* background-color: ${Color.White}; */ /* 배경색 변경 등 추가 효과 가능 */
      `}
  }
`;

// 아이콘 래퍼 스타일
const IconWrapper = styled.div`
  /* isClicked 상태에 따라 아이콘 색상 지정 */
  color: ${getForegroundColor};
  width: 28px; /* 아이콘 크기 조정 */
  height: 28px; /* 아이콘 크기 조정 */
  margin-bottom: 10px; /* 아이콘과 텍스트 사이 간격 */
`;

// 텍스트 스타일
const Text = styled.p`
  /* isClicked 상태에 따라 텍스트 색상 지정 */
  color: ${getForegroundColor};
  font-size: 14px; /* 텍스트 크기 조정 */
  font-weight: 600;
  margin-top: 0; /* 아이콘에 margin-bottom이 있으므로 제거 */
  text-align: center; /* 줄바꿈 시 중앙 정렬 */
`;

// 카테고리 버튼 컴포넌트
const CategoryButton = ({ category, icon, isClicked, onClick }) => {
  console.log(icon);
  return (
    <StyledCategoryButton onClick={onClick} isClicked={isClicked}>
      {icon && (
        <IconWrapper isClicked={isClicked}>
          <FontAwesomeIcon icon={icon} size="lg" />
        </IconWrapper>
      )}
      <Text isClicked={isClicked}>{category}</Text>
    </StyledCategoryButton>
  );
};

export default CategoryButton;
