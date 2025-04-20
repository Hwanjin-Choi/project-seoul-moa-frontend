import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark } from "@fortawesome/free-solid-svg-icons"; // Import the specific icon

const StyleRibbonContainer = styled.button`
  text-align: center;
  height: 40px;
  width: 40px;
  border-radius: 20px;
  border: none; /* 버튼 기본 테두리 제거 (선택 사항) */

  cursor: pointer;
  transition: box-shadow 0.2s ease-in-out;

  &:hover {
    /* 호버 시 약간 더 뚜렷한 그림자 */
    box-shadow: 0 4px 8px #7b61ff;
  }

  &:active {
    /* 클릭 시 안쪽으로 들어가는 듯한 그림자 효과 */
    box-shadow: inset 0 2px 5px #7b61ff;
  }
`;

const Icon = styled(FontAwesomeIcon)`
  color: #7b61ff; // Set the color
  width: 25px; // Set the desired width
  height: 30px; // Set the desired height
`;

const StyledRibbon = styled.div`
  width: 32px;
  height: 30px;
  background-color: #7b61ff;
  color: white;
  font-size: 13px;
  z-index: 1;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
`;
const StyleRibbonBottom = styled.div`
  width: 0;
  height: 0;
  border-left: 16px solid #7b61ff;
  border-right: 16px solid #7b61ff;
  border-bottom: 12px solid transparent;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
`;

const Text = styled.div`
  font-size: 11px;
  font-weight: 600;
`;
const Ribbon = ({ ...props }) => {
  const { text } = props;

  return (
    <StyleRibbonContainer>
      <Icon icon={faBookmark}>{1000}</Icon>
      <Icon />
    </StyleRibbonContainer>
  );
};

export default Ribbon;
