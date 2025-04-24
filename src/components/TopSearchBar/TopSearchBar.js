import React, { useState } from "react";
import styled from "styled-components";
// react-icons에서 아이콘 가져오기 (Feather Icons 사용)
import { FiSearch, FiFilter, FiX, FiChevronDown } from "react-icons/fi";

const TopSearchWrapper = styled.div`
  padding: 15px;
  background-color: #f8f9fa; /* 밝은 배경색 예시 */
  border-radius: 10px; /* 둥근 모서리 */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05); /* 은은한 그림자 */
  margin-bottom: 10px; /* 다른 컴포넌트와의 간격 */
`;

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  background-color: white;
  border: 1px solid #e0e0e0; /* 옅은 테두리 */
  border-radius: 8px;
  padding: 8px 12px;
`;

const SearchInput = styled.input`
  flex-grow: 1;
  border: none;
  outline: none;
  font-size: 16px;
  margin-left: 8px; /* 검색 아이콘과의 간격 */
  &::placeholder {
    color: #adb5bd; /* 플레이스홀더 색상 */
  }
`;

const IconWrapper = styled.button`
  background: none;
  border: none;
  padding: 0;
  margin-left: 8px; /* 아이콘 간 간격 */
  cursor: pointer;
  color: #495057; /* 아이콘 색상 */
  display: flex; /* 아이콘 수직 정렬 */
  align-items: center;

  &:hover {
    color: #007bff; /* 호버 시 색상 변경 */
  }
`;

const TagArea = styled.div`
  margin-top: 10px;
  display: flex;
  flex-wrap: wrap;
  gap: 8px; /* 태그 간 간격 */
`;

const Tag = styled.div`
  display: inline-flex; /* 아이콘과 텍스트 정렬 */
  align-items: center;
  background-color: #e9ecef; /* 태그 배경색 */
  color: #495057; /* 태그 글자색 */
  padding: 4px 8px;
  border-radius: 15px; /* 둥근 태그 */
  font-size: 13px;
`;

const RemoveTagButton = styled.button`
  background: none;
  border: none;
  padding: 0;
  margin-left: 5px;
  cursor: pointer;
  color: #868e96; /* X 아이콘 색상 */
  display: flex;
  align-items: center;

  &:hover {
    color: #dc3545; /* 호버 시 붉은색 */
  }
`;
export const TopSearchBar = ({
  onSearch,
  onFilter,
  tags = [],
  onRemoveTag,
  onClick,
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = () => {
    if (onSearch) {
      onSearch(searchTerm);
    }
  };

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <TopSearchWrapper>
      <InputContainer>
        <IconWrapper onClick={handleSearch} aria-label="검색">
          <FiSearch size={20} />
        </IconWrapper>
        <SearchInput
          type="text"
          placeholder="검색어를 입력하세요..."
          value={searchTerm}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onClick={onClick}
        />
        <IconWrapper onClick={onFilter} aria-label="필터">
          <FiFilter size={20} />
        </IconWrapper>
      </InputContainer>
      {/* 태그가 있을 경우에만 TagArea 표시 */}
      {tags.length > 0 && (
        <TagArea>
          {tags.map((tag, index) => (
            <Tag key={index}>
              {tag}
              <RemoveTagButton
                onClick={() => onRemoveTag && onRemoveTag(tag)}
                aria-label={`${tag} 태그 제거`}
              >
                <FiX size={14} />
              </RemoveTagButton>
            </Tag>
          ))}
        </TagArea>
      )}
    </TopSearchWrapper>
  );
};
