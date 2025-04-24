import React, { useState, useRef, useCallback, useEffect } from "react";
import styled from "styled-components";
import { FiChevronDown } from "react-icons/fi";

// --- Styled Components 정의 ---

// 필터 폼 전체 Wrapper: 높이를 직접 제어
const BottomFormWrapper = styled.div`
  background-color: white;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  box-shadow: 0 -4px 12px rgba(0, 0, 0, 0.1);
  position: relative; /* 핸들 위치 기준 */
  overflow: hidden; /* 내부 컨텐츠가 넘치지 않도록 */
  /* 높이는 state에 의해 동적으로 설정됨 */
  height: ${(props) => props.height}px;
  /* 높이 변경 시 부드러운 전환 효과 (선택 사항, 드래그 중에는 끊길 수 있음) */
  /* transition: height 0.1s linear; */
`;

// 핸들 영역: 드래그 이벤트 감지
const HandleWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 10px 0; /* 터치 영역 확보 */
  cursor: ns-resize; /* 위아래 크기 조절 커서 */
  touch-action: none; /* 모바일에서 스크롤 등 기본 동작 방지 */
  border-bottom: 1px solid #eee; /* 구분선 */
  position: relative; /* 내부 핸들 버튼 위치 기준 */
  user-select: none; /* 드래그 중 텍스트 선택 방지 */
`;

// 핸들 버튼 시각적 요소
const HandleButton = styled.div`
  width: 40px;
  height: 5px;
  background-color: #d0d0d0;
  border-radius: 3px;
`;

// 실제 필터 폼 내용: 높이 변화에 따라 내용 표시
const FilterContentWrapper = styled.div`
  padding: 20px;
  /* Wrapper의 높이가 충분할 때만 보이도록 */
  overflow: auto; /* 내용이 많을 경우 스크롤 */
  height: calc(100% - 41px); /* 핸들 높이(padding 포함) 제외한 나머지 영역 */
`;

// --- 기존 FormRow, FormLabel, FormInput, FakeDropdown, DropdownPlaceholder (변경 없음) ---
const FormRow = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  &:last-child {
    margin-bottom: 0;
  }
`;
const FormLabel = styled.label`
  width: 60px;
  font-weight: 500;
  color: #343a40;
  font-size: 15px;
  margin-right: 10px;
`;
const FormInput = styled.input`
  flex-grow: 1;
  padding: 10px 12px;
  border: 1px solid #ced4da;
  border-radius: 6px;
  font-size: 15px;
  outline: none;
  &:focus {
    border-color: #80bdff;
    box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
  }
`;
const FakeDropdown = styled.button`
  flex-grow: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 12px;
  border: 1px solid #ced4da;
  border-radius: 6px;
  background-color: white;
  font-size: 15px;
  text-align: left;
  cursor: pointer;
  color: #495057;
  &:hover {
    border-color: #adb5bd;
  }
`;
const DropdownPlaceholder = styled.span`
  color: #adb5bd;
`;

// --- BottomFilterForm 컴포넌트 정의 (드래그 로직 추가) ---
const BottomFilterForm = ({
  onRegionSelect,
  onCategorySelect,
  onTitleChange,
  // isExpanded, onToggle props 제거
  initialHeight = 250, // 초기 높이 설정 (px)
  minHeight = 60, // 최소 높이 (핸들 포함)
  maxHeight = 500, // 최대 높이
}) => {
  // 상태: 현재 높이, 드래그 중 여부
  const [height, setHeight] = useState(initialHeight);
  const [isDragging, setIsDragging] = useState(false);
  // 드래그 시작 시점의 Y 좌표와 초기 높이 저장
  const dragStartRef = useRef({ y: 0, initialHeight: 0 });
  // 컴포넌트 Wrapper 참조
  const wrapperRef = useRef(null);

  // 드래그 중 이동 처리 함수 (마우스 & 터치 공용)
  const handleDragMove = useCallback(
    (clientY) => {
      if (!isDragging) return;

      const startY = dragStartRef.current.y;
      const startHeight = dragStartRef.current.initialHeight;
      // Y 좌표 변화량 계산 (위로 드래그하면 음수, 아래로 드래그하면 양수)
      const deltaY = clientY - startY;
      // 새 높이 계산 (위로 드래그하면 높이 증가)
      let newHeight = startHeight - deltaY;

      // 최소/최대 높이 제한 적용
      newHeight = Math.max(minHeight, Math.min(newHeight, maxHeight));

      setHeight(newHeight);
    },
    [isDragging, minHeight, maxHeight]
  ); // isDragging 상태가 변경될 때만 함수 재생성

  // 마우스 이동 이벤트 핸들러
  const handleMouseMove = useCallback(
    (event) => {
      handleDragMove(event.clientY);
    },
    [handleDragMove]
  ); // handleDragMove가 변경될 때만 재생성

  // 터치 이동 이벤트 핸들러
  const handleTouchMove = useCallback(
    (event) => {
      // 여러 터치 포인트 중 첫 번째 사용
      if (event.touches.length > 0) {
        handleDragMove(event.touches[0].clientY);
      }
    },
    [handleDragMove]
  ); // handleDragMove가 변경될 때만 재생성

  // 드래그 종료 처리 함수 (마우스 & 터치 공용)
  const handleDragEnd = useCallback(() => {
    if (!isDragging) return;
    setIsDragging(false);
    // 드래그 종료 시 전역 이벤트 리스너 제거
    window.removeEventListener("mousemove", handleMouseMove);
    window.removeEventListener("mouseup", handleDragEnd);
    window.removeEventListener("touchmove", handleTouchMove);
    window.removeEventListener("touchend", handleDragEnd);
    // 드래그 종료 시 body 스타일 복원 (선택 사항)
    document.body.style.cursor = "default";
    document.body.style.userSelect = "auto";
  }, [isDragging, handleMouseMove, handleTouchMove]); // isDragging 상태가 변경될 때만 재생성

  // 드래그 시작 처리 함수 (마우스 & 터치 공용)
  const handleDragStart = useCallback(
    (clientY) => {
      setIsDragging(true);
      dragStartRef.current = { y: clientY, initialHeight: height };
      // 드래그 시작 시 전역 이벤트 리스너 등록
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleDragEnd);
      window.addEventListener("touchmove", handleTouchMove, { passive: false }); // passive: false 중요
      window.addEventListener("touchend", handleDragEnd);
      // 드래그 중 커서 및 텍스트 선택 방지 스타일 적용 (선택 사항)
      document.body.style.cursor = "ns-resize";
      document.body.style.userSelect = "none";
    },
    [height, handleMouseMove, handleDragEnd, handleTouchMove]
  ); // height 상태가 변경될 때만 재생성

  // 마우스 다운 이벤트 핸들러
  const handleMouseDown = useCallback(
    (event) => {
      // 기본 동작(텍스트 선택 등) 방지
      event.preventDefault();
      handleDragStart(event.clientY);
    },
    [handleDragStart]
  ); // handleDragStart가 변경될 때만 재생성

  // 터치 시작 이벤트 핸들러
  const handleTouchStart = useCallback(
    (event) => {
      // 기본 동작(스크롤 등) 방지. passive: false 필요
      event.preventDefault();
      if (event.touches.length > 0) {
        handleDragStart(event.touches[0].clientY);
      }
    },
    [handleDragStart]
  ); // handleDragStart가 변경될 때만 재생성

  // 컴포넌트 언마운트 시 이벤트 리스너 정리 (메모리 누수 방지)
  useEffect(() => {
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleDragEnd);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleDragEnd);
    };
  }, [handleMouseMove, handleDragEnd, handleTouchMove]); // 핸들러 함수들이 변경될 때마다 effect 재실행 (보통은 불필요)

  // --- 기존 상태 및 핸들러 (변경 없음) ---
  const [selectedRegion, setSelectedRegion] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [titleInput, setTitleInput] = useState("");
  const handleRegionClick = () => {
    console.log("BottomFilterForm: 지역 선택 버튼 클릭됨");
    if (onRegionSelect) onRegionSelect();
  };
  const handleCategoryClick = () => {
    console.log("BottomFilterForm: 카테고리 선택 버튼 클릭됨");
    if (onCategorySelect) onCategorySelect();
  };
  const handleTitleInputChange = (event) => {
    const newValue = event.target.value;
    setTitleInput(newValue);
    if (onTitleChange) onTitleChange(newValue);
  };
  // --- 기존 상태 및 핸들러 끝 ---

  return (
    // Wrapper에 ref와 동적 height 적용
    <BottomFormWrapper ref={wrapperRef} height={height}>
      {/* 핸들 영역에 마우스/터치 시작 이벤트 리스너 연결 */}
      <HandleWrapper
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
      >
        <HandleButton />
      </HandleWrapper>

      {/* 실제 필터 내용 */}
      <FilterContentWrapper>
        {/* 지역 선택 행 */}
        <FormRow>
          <FormLabel htmlFor="region-select">지역</FormLabel>
          <FakeDropdown id="region-select" onClick={handleRegionClick}>
            {selectedRegion ? (
              <span>{selectedRegion}</span>
            ) : (
              <DropdownPlaceholder>지역 선택</DropdownPlaceholder>
            )}
            <FiChevronDown size={18} color="#adb5bd" />
          </FakeDropdown>
        </FormRow>
        {/* 카테고리 선택 행 */}
        <FormRow>
          <FormLabel htmlFor="category-select">카테고리</FormLabel>
          <FakeDropdown id="category-select" onClick={handleCategoryClick}>
            {selectedCategory ? (
              <span>{selectedCategory}</span>
            ) : (
              <DropdownPlaceholder>카테고리 선택</DropdownPlaceholder>
            )}
            <FiChevronDown size={18} color="#adb5bd" />
          </FakeDropdown>
        </FormRow>
        {/* 제목 입력 행 */}
        <FormRow>
          <FormLabel htmlFor="title-input">제목</FormLabel>
          <FormInput
            id="title-input"
            type="text"
            placeholder="제목 입력"
            value={titleInput}
            onChange={handleTitleInputChange}
          />
        </FormRow>
      </FilterContentWrapper>
    </BottomFormWrapper>
  );
};

// 기본 prop 값 설정 (선택 사항)
BottomFilterForm.defaultProps = {
  initialHeight: 250,
  minHeight: 60,
  maxHeight: 500,
};

export default BottomFilterForm;
