// src/components/ExpandableSearchFilter.js (예시 경로)
import React, { useState } from "react";
import styled from "styled-components";
import { FiSearch, FiChevronDown, FiChevronUp } from "react-icons/fi"; // 아이콘들
import Tag from "../Tag/Tag";

const Wrapper = styled.div`
  background-color: #ffffff;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  width: 100%; /* 또는 고정 너비 설정 */
`;

const SearchBarContainer = styled.div`
  position: relative;
  margin-bottom: 15px; /* 검색창과 태그 영역 사이 간격 */
`;

const StyledInput = styled.input`
  width: 100%;
  padding: 12px 40px 12px 20px; /* 오른쪽 아이콘 공간 확보 */
  border: 1px solid #e0e0e0;
  border-radius: 25px; /* 둥근 정도 조절 */
  font-size: 1rem;
  outline: none;

  &:focus {
    border-color: #7b61ff; /* 포커스 시 테두리 색상 (예시) */
    box-shadow: 0 0 0 2px rgba(123, 97, 255, 0.2);
  }

  &::placeholder {
    color: #aaa;
  }
`;

const SearchIcon = styled(FiSearch)`
  position: absolute;
  right: 18px;
  top: 50%;
  transform: translateY(-50%);
  color: #aaa;
  font-size: 1.2rem;
`;

// 확장/축소될 태그 영역 컨테이너
const TagsContainer = styled.div`
  max-height: ${(props) => (props.isExpanded ? "500px" : "0")}; /* 확장/축소 */
  overflow: hidden;
  transition: max-height 0.4s ease-in-out; /* 부드러운 애니메이션 */
  /* visibility: ${(props) => (props.isExpanded ? "visible" : "hidden")}; */
  /* opacity: ${(props) => (props.isExpanded ? 1 : 0)}; */
  /* transition: opacity 0.4s ease-in-out, visibility 0.4s ease-in-out; */
`;

const CategoryTitle = styled.h4`
  font-size: 0.9rem;
  font-weight: bold;
  color: #333;
  margin-top: 15px;
  margin-bottom: 10px;
  &:first-child {
    margin-top: 0; /* 첫번째 제목의 상단 마진 제거 */
  }
`;

const TagListWrapper = styled.div`
  display: flex;
  flex-wrap: wrap; /* 태그가 많으면 다음 줄로 넘김 */
`;

const ToggleArea = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 15px; /* 태그 영역과의 간격 */
`;

const ToggleButton = styled.button`
  background: none;
  border: none;
  padding: 5px;
  cursor: pointer;
  color: #aaa;

  &:hover {
    color: #7b61ff;
  }

  svg {
    width: 24px;
    height: 24px;
    display: block; /* 버튼 내에서 아이콘 정렬 */
  }
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
// --- 메인 컴포넌트 ---
const ExpandableSearchFilter = () => {
  const [isExpanded, setIsExpanded] = useState(false); // 초기 상태: 축소
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [titleInput, setTitleInput] = useState("");

  // 지역 선택 버튼 클릭 핸들러
  const handleRegionClick = () => {
    console.log("BottomFilterForm: 지역 선택 버튼 클릭됨");
    // 부모 컴포넌트로부터 받은 콜백 함수 호출
  };

  // 카테고리 선택 버튼 클릭 핸들러
  const handleCategoryClick = () => {
    console.log("BottomFilterForm: 카테고리 선택 버튼 클릭됨");
    // 부모 컴포넌트로부터 받은 콜백 함수 호출
  };

  // 제목 입력 필드 변경 핸들러
  const handleTitleInputChange = (event) => {
    const newValue = event.target.value;
    setTitleInput(newValue); // 내부 상태 업데이트
    // 부모 컴포넌트로부터 받은 콜백 함수 호출하여 변경값 전달
  };

  // --- 예시 태그 데이터 ---
  // 실제로는 props로 받거나 API 호출 등을 통해 관리해야 합니다.
  const [regionTags, setRegionTags] = useState([
    { id: "r1", label: "강남구" },
    { id: "r2", label: "종로구" },
    { id: "r3", label: "마포구" },
  ]);
  const [categoryTags, setCategoryTags] = useState([
    { id: "c1", label: "클래식" },
    { id: "c2", label: "뮤지컬" },
  ]);
  // --- 예시 태그 데이터 끝 ---

  const handleToggleClick = () => {
    setIsExpanded((prev) => !prev);
  };

  // 태그 제거 핸들러 (예시)
  const handleRemoveRegionTag = (idToRemove) => {
    setRegionTags((prevTags) =>
      prevTags.filter((tag) => tag.id !== idToRemove)
    );
  };

  const handleRemoveCategoryTag = (idToRemove) => {
    setCategoryTags((prevTags) =>
      prevTags.filter((tag) => tag.id !== idToRemove)
    );
  };

  return (
    <Wrapper>
      <SearchBarContainer>
        <StyledInput
          type="text"
          placeholder="검색어를 입력하세요..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <SearchIcon />
      </SearchBarContainer>

      {/* 확장 가능한 태그 영역 */}
      <TagsContainer isExpanded={isExpanded}>
        <CategoryTitle>지역</CategoryTitle>
        <TagListWrapper>
          {regionTags.map((tag) => (
            <Tag
              key={tag.id}
              label={tag.label}
              onRemove={() => handleRemoveRegionTag(tag.id)}
            />
          ))}
        </TagListWrapper>

        <CategoryTitle>카테고리</CategoryTitle>
        <TagListWrapper>
          {categoryTags.map((tag) => (
            <Tag
              key={tag.id}
              label={tag.label}
              onRemove={() => handleRemoveCategoryTag(tag.id)}
            />
          ))}
        </TagListWrapper>
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
      </TagsContainer>

      {/* 토글 버튼 */}
      <ToggleArea>
        <ToggleButton onClick={handleToggleClick} aria-expanded={isExpanded}>
          {isExpanded ? <FiChevronUp /> : <FiChevronDown />}
        </ToggleButton>
      </ToggleArea>
    </Wrapper>
  );
};

export default ExpandableSearchFilter;
