import React, { useState } from "react";
import styled from "styled-components";
// 필요한 아이콘들을 react-icons에서 가져옵니다.
import { FiChevronDown } from "react-icons/fi";

// --- Styled Components 정의 ---

// 필터 폼 전체를 감싸는 Wrapper
const BottomFormWrapper = styled.div`
  background-color: white;
  border-top-left-radius: 15px; /* 상단 왼쪽 모서리 둥글게 */
  border-top-right-radius: 15px; /* 상단 오른쪽 모서리 둥글게 */
  box-shadow: 0 -4px 12px rgba(0, 0, 0, 0.1); /* 위쪽 그림자 */
  /* 확장 상태에 따라 하단 패딩 조절 */
  padding-bottom: ${(props) => (props.isExpanded ? "20px" : "0")};
  transition: padding-bottom 0.3s ease-out; /* 패딩 변경 애니메이션 */
  position: relative; /* 핸들 버튼 위치 기준 */
`;

// 확장/축소 핸들을 감싸는 영역
const HandleWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 8px 0; /* 핸들 영역 상하 패딩 */
  cursor: pointer; /* 클릭 가능함을 표시 */
  /* 확장 시 하단 구분선 추가 */
  border-bottom: ${(props) => (props.isExpanded ? "1px solid #eee" : "none")};
  transition: border-bottom 0.3s ease-out;
`;

// 실제 핸들 버튼 (회색 바 형태)
const HandleButton = styled.button`
  width: 40px;
  height: 5px;
  background-color: #d0d0d0; /* 핸들 색상 */
  border: none;
  border-radius: 3px;
  cursor: pointer;
  padding: 0;
`;

// 실제 필터 폼 내용을 감싸는 영역 (애니메이션 대상)
const FilterContentWrapper = styled.div`
  /* 확장 상태에 따라 패딩 조절 */
  padding: ${(props) => (props.isExpanded ? "20px 20px 0 20px" : "0 20px")};
  /* 확장 상태에 따라 최대 높이 조절 */
  max-height: ${(props) =>
    props.isExpanded ? "500px" : "0"}; /* 충분한 높이 설정 */
  overflow: hidden; /* 내용 넘침 숨김 */
  /* 높이 및 패딩 변경 애니메이션 */
  transition:
    max-height 0.3s ease-out,
    padding 0.3s ease-out;
`;

// 폼의 각 행 (레이블 + 입력 필드)
const FormRow = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 15px; /* 행 간 간격 */
  /* 마지막 행의 하단 마진 제거 */
  &:last-child {
    margin-bottom: 0;
  }
`;

// 폼 레이블 스타일
const FormLabel = styled.label`
  width: 60px; /* 고정 너비 */
  font-weight: 500;
  color: #343a40;
  font-size: 15px;
  margin-right: 10px; /* 레이블과 입력 필드 사이 간격 */
`;

// 텍스트 입력 필드 스타일
const FormInput = styled.input`
  flex-grow: 1; /* 남은 공간 차지 */
  padding: 10px 12px;
  border: 1px solid #ced4da;
  border-radius: 6px;
  font-size: 15px;
  outline: none; /* 포커스 시 기본 외곽선 제거 */

  /* 포커스 시 스타일 */
  &:focus {
    border-color: #80bdff;
    box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
  }
`;

// 드롭다운처럼 보이는 버튼 스타일
const FakeDropdown = styled.button`
  flex-grow: 1; /* 남은 공간 차지 */
  display: flex;
  justify-content: space-between; /* 내용물 양 끝 정렬 */
  align-items: center;
  padding: 10px 12px;
  border: 1px solid #ced4da;
  border-radius: 6px;
  background-color: white;
  font-size: 15px;
  text-align: left; /* 텍스트 왼쪽 정렬 */
  cursor: pointer;
  color: #495057; /* 기본 텍스트 색상 */

  /* 호버 시 테두리 색상 변경 */
  &:hover {
    border-color: #adb5bd;
  }
`;

// 드롭다운 플레이스홀더 스타일
const DropdownPlaceholder = styled.span`
  color: #adb5bd; /* 플레이스홀더 색상 */
`;

// --- BottomFilterForm 컴포넌트 정의 ---
const BottomFilterForm = ({
  onRegionSelect, // 지역 선택 콜백 함수
  onCategorySelect, // 카테고리 선택 콜백 함수
  onTitleChange, // 제목 변경 콜백 함수
  isExpanded, // 확장/축소 상태 (prop으로 받음)
  onToggle, // 확장/축소 토글 함수 (prop으로 받음)
}) => {
  // 각 필드의 상태 관리 (선택된 값 또는 입력값)
  const [selectedRegion, setSelectedRegion] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [titleInput, setTitleInput] = useState("");

  // 지역 선택 버튼 클릭 핸들러
  const handleRegionClick = () => {
    console.log("BottomFilterForm: 지역 선택 버튼 클릭됨");
    // 부모 컴포넌트로부터 받은 콜백 함수 호출
    if (onRegionSelect) onRegionSelect();
    // 여기에 실제 드롭다운 메뉴를 표시하는 로직 추가 가능
    // 예: setSelectedRegion("강남구"); // 임시 값 설정
  };

  // 카테고리 선택 버튼 클릭 핸들러
  const handleCategoryClick = () => {
    console.log("BottomFilterForm: 카테고리 선택 버튼 클릭됨");
    // 부모 컴포넌트로부터 받은 콜백 함수 호출
    if (onCategorySelect) onCategorySelect();
    // 여기에 실제 드롭다운 메뉴를 표시하는 로직 추가 가능
    // 예: setSelectedCategory("전시"); // 임시 값 설정
  };

  // 제목 입력 필드 변경 핸들러
  const handleTitleInputChange = (event) => {
    const newValue = event.target.value;
    setTitleInput(newValue); // 내부 상태 업데이트
    // 부모 컴포넌트로부터 받은 콜백 함수 호출하여 변경값 전달
    if (onTitleChange) {
      onTitleChange(newValue);
    }
  };

  return (
    // 폼 전체 Wrapper, 확장 상태 전달
    <BottomFormWrapper isExpanded={isExpanded}>
      {/* 핸들 영역, 클릭 시 onToggle 함수 호출 */}
      <HandleWrapper onClick={onToggle} isExpanded={isExpanded}>
        <HandleButton aria-label={isExpanded ? "필터 접기" : "필터 펼치기"} />
      </HandleWrapper>

      {/* 실제 필터 내용 영역, 확장 상태 전달 */}
      <FilterContentWrapper isExpanded={isExpanded}>
        {/* 지역 선택 행 */}
        <FormRow>
          <FormLabel htmlFor="region-select">지역</FormLabel>
          <FakeDropdown id="region-select" onClick={handleRegionClick}>
            {/* 선택된 지역이 있으면 표시, 없으면 플레이스홀더 표시 */}
            {selectedRegion ? (
              <span>{selectedRegion}</span>
            ) : (
              <DropdownPlaceholder>지역 선택</DropdownPlaceholder>
            )}
            <FiChevronDown size={18} color="#adb5bd" />{" "}
            {/* 아래 화살표 아이콘 */}
          </FakeDropdown>
        </FormRow>

        <FormRow>
          <FormLabel htmlFor="category-select">카테고리</FormLabel>
          <FakeDropdown id="category-select" onClick={handleCategoryClick}>
            {/* 선택된 카테고리가 있으면 표시, 없으면 플레이스홀더 표시 */}
            {selectedCategory ? (
              <span>{selectedCategory}</span>
            ) : (
              <DropdownPlaceholder>카테고리 선택</DropdownPlaceholder>
            )}
            <FiChevronDown size={18} color="#adb5bd" />{" "}
          </FakeDropdown>
        </FormRow>
        <FormRow>
          <FormLabel htmlFor="title-input">제목</FormLabel>
          <FormInput
            id="title-input"
            type="text"
            placeholder="제목 입력"
            value={titleInput} // 입력값 상태 바인딩
            onChange={handleTitleInputChange} // 변경 시 핸들러 호출
          />
        </FormRow>
      </FilterContentWrapper>
    </BottomFormWrapper>
  );
};

// BottomFilterForm 컴포넌트를 기본으로 내보냅니다.
export default BottomFilterForm;
