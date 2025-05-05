// src/components/ExpandableSearchFilter.js (예시 경로)
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { FiSearch, FiChevronDown, FiChevronUp } from "react-icons/fi"; // 아이콘들
import { fetchCategories } from "../../api/category";
import DynamicDropdown from "../DynamicDropdown.js/DynamicDropdown";
import { getUpcomingEvents } from "../../api/event/events";
const Wrapper = styled.div`
  background-color: #ffffff;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  width: 100%;
  @media (max-width: 768px) {
    padding: 5px 15px;
  }
`;

const SearchBarContainer = styled.div`
  display: flex; /* Input과 Button을 가로로 배치 */
  align-items: center; /* 세로 중앙 정렬 */
  position: relative;
  border: 1px solid #ced4da; /* 전체 검색 바 테두리 */
  border-radius: 20px; /* 둥근 모서리 예시 */
  padding: 0; /* 내부 요소의 padding으로 조절 */
  width: 100%; /* 또는 고정 너비 */
  margin-bottom: 10px;
`;

const StyledInput = styled.input`
  flex-grow: 1; /* 남는 공간 모두 차지 */
  border: none; /* 테두리는 컨테이너에 있음 */
  outline: none; /* 포커스 시 외곽선 제거 */
  padding: 10px 15px; /* 내부 여백 */
  font-size: 1rem;
  background-color: transparent; /* 컨테이너 배경색 사용 */
  min-width: 0; /* 내용이 길어져도 줄어들 수 있도록 */
`;

const SearchIcon = styled(FiSearch)`
  /* position: absolute; */ /* 제거 */
  /* right: 18px; */ /* 제거 */
  /* top: 50%; */ /* 제거 */
  /* transform: translateY(-50%); */ /* 제거 */
  color: #aaa; /* 아이콘 기본 색상 유지 */
  font-size: 1.2rem; /* 아이콘 크기 유지 */
  /* display: block; */ /* 아이콘 자체의 정렬을 위해 필요할 수 있음 */
`;

// 확장/축소될 태그 영역 컨테이너
const ExpandContainer = styled.div`
  max-height: ${(props) => (props.isExpanded ? "700px" : "0")}; /* 확장/축소 */
  transition: max-height 0.4s ease-in-out; /* 부드러운 애니메이션 */
  /* visibility: ${(props) => (props.isExpanded ? "visible" : "hidden")}; */
  opacity: ${(props) => (props.isExpanded ? 1 : 0)};
  transition:
    opacity 0.4s ease-in-out,
    visibility 0.4s ease-in-out;
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

const ToggleArea = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 15px; /* 태그 영역과의 간격 */
  @media (max-width: 768px) {
    margin-top: 5px;
  }
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

const IconWrapper = styled.span`
  display: inline-flex; /* 내부 아이콘 정렬 */
  align-items: center;
  justify-content: center;
  width: 32px; /* 아이콘을 감쌀 원의 크기 (아이콘 크기보다 약간 크게) */
  height: 32px; /* 아이콘을 감쌀 원의 크기 */
  border-radius: 50%; /* 원형으로 만들기 */
  transition: background-color 0.2s ease-in-out; /* 부드러운 배경색 전환 */
  /* box-shadow 효과를 원하시면 transition에 box-shadow 추가 */
  /* transition: background-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out; */
`;

const SearchButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  padding: 0 5px;
  margin: 0;
  cursor: pointer;
  color: #868e96;
  align-self: stretch;

  &:hover ${IconWrapper} {
    background-color: #f1f3f5;
    box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.1);
  }

  &:focus {
    outline: none;
  }

  &:focus-visible ${IconWrapper} {
    background-color: #e9ecef;
    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
  }
`;

const seoulGus = [
  "강남구",
  "강동구",
  "강북구",
  "강서구",
  "관악구",
  "광진구",
  "구로구",
  "금천구",
  "노원구",
  "도봉구",
  "동대문구",
  "동작구",
  "마포구",
  "서대문구",
  "서초구",
  "성동구",
  "성북구",
  "송파구",
  "양천구",
  "영등포구",
  "용산구",
  "은평구",
  "종로구",
  "중구",
  "중랑구",
];

// --- 메인 컴포넌트 ---
const ExpandableSearchFilter = ({
  handleSearchResult,
  handleResultExpand,
  handleSearchParams,
  searchParams,
  handleTotalCount,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  //카테고리 api
  const [categories, setCategories] = useState([]);
  const [isCategoryLoading, setIsCategoryLoading] = useState(false);
  const [categoryError, setCategoryError] = useState(null);
  //지역구 api
  const [gus, setGus] = useState(seoulGus);
  const [isGuLoading, setIsGuLoading] = useState(false);
  const [guError, setGuError] = useState(null);
  useEffect(() => {
    const loadCategories = async () => {
      setIsCategoryLoading(true);
      setCategoryError(null);
      try {
        const data = await fetchCategories();
        setCategories(data);
      } catch (err) {
        setCategoryError(err.message);
        setCategories([]);
      } finally {
        setIsCategoryLoading(false);
      }
    };
    loadCategories();
  }, []);

  const handleCategorySelect = (selectedId) => {
    handleSearchParams((prevState) => {
      const prevSelectedIds = prevState.categoryId || [];

      let newCategoryIdArray;
      if (prevSelectedIds.includes(selectedId)) {
        newCategoryIdArray = prevSelectedIds.filter((id) => id !== selectedId);
      } else {
        newCategoryIdArray = [...prevSelectedIds, selectedId];
      }

      return {
        ...prevState,
        categoryId: newCategoryIdArray,
      };
    });
  };

  const handleGuSelect = (selectedGu) => {
    handleSearchParams((prevState) => {
      const prevSelectedGus = prevState.gu || [];

      let newGuArray;
      if (prevSelectedGus.includes(selectedGu)) {
        newGuArray = prevSelectedGus.filter((gu) => gu !== selectedGu);
      } else {
        newGuArray = [...prevSelectedGus, selectedGu];
      }

      return {
        ...prevState,
        gu: newGuArray,
      };
    });
  };

  const handleToggleClick = () => {
    setIsExpanded((prev) => !prev);
  };
  const handleAlwaysToggle = () => {
    setIsExpanded(true);
  };
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };
  const handleSearch = async () => {
    const newOffset = 0;
    handleSearchParams((prevState) => ({
      ...prevState,
      offset: newOffset, // 미리 계산한 값으로 업데이트 예약
      // limit: prevState.limit, // limit은 변경되지 않으므로 생략해도 무방할 수 있습니다.
    }));
    const payload = {
      categoryId: searchParams.categoryId,
      gu: searchParams.gu,
      title: searchParams.title,
      offset: newOffset,
      limit: 1,
      isOpen: true,
    };
    try {
      console.log("API 요청 페이로드:", payload);
      const res = await getUpcomingEvents(payload);
      console.log("API 응답:", res);

      if (res && res.data && Array.isArray(res.data.eventList)) {
        const newEvents = res.data.eventList;
        handleSearchResult(newEvents);
        handleTotalCount(res.data.totalCount);
        handleResultExpand();
      } else {
        console.error("API 응답 형식이 올바르지 않습니다:", res);
      }
    } catch (error) {
      console.error("이벤트 조회 중 오류 발생:", error);
    } finally {
    }
  };

  return (
    <Wrapper>
      <SearchBarContainer>
        <StyledInput
          type="text"
          placeholder="검색어를 입력하세요..."
          value={searchParams.title || ""}
          onChange={(e) => {
            handleSearchParams((prevState) => ({
              ...prevState,
              title: e.target.value,
            }));
          }}
          onKeyDown={handleKeyDown}
          /*           onFocus={handleAlwaysToggle}
          onBlur={handleToggleClick} */
        />
        <SearchButton type="button" onClick={handleSearch} aria-label="검색">
          <IconWrapper>
            <SearchIcon />
          </IconWrapper>
        </SearchButton>
      </SearchBarContainer>

      {/* 확장 가능한 태그 영역 */}
      <ExpandContainer isExpanded={isExpanded}>
        {isExpanded && (
          <>
            <DynamicDropdown
              id="category-select"
              label="카테고리"
              options={categories}
              selectedOption={searchParams.categoryId}
              onOptionSelect={handleCategorySelect}
              placeholder="카테고리를 선택하세요"
              loading={isCategoryLoading}
              error={categoryError}
              optionLabelKey="name"
              optionValueKey="categoryId"
              isMultiSelect={true}
            />
            <DynamicDropdown
              id="gu-select"
              label="지역"
              options={gus}
              selectedOption={searchParams.gu}
              onOptionSelect={handleGuSelect}
              placeholder="지역을 선택하세요"
              /*         loading={isCategoryLoading}
        error={categoryError} */
              isMultiSelect={true}
            />
          </>
        )}
      </ExpandContainer>

      <ToggleArea>
        <ToggleButton onClick={handleToggleClick} aria-expanded={isExpanded}>
          {isExpanded ? <FiChevronUp /> : <FiChevronDown />}
        </ToggleButton>
      </ToggleArea>
    </Wrapper>
  );
};

export default ExpandableSearchFilter;
