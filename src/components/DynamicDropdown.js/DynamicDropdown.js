// DynamicDropdown.jsx
import React, { useState, useEffect, useRef } from "react";
import styled, { css } from "styled-components"; // css 임포트 추가
import { FiChevronDown, FiChevronUp, FiCheck } from "react-icons/fi"; // FiCheck 아이콘 추가

// --- 스타일 컴포넌트 (이전과 유사) ---
const DropdownContainer = styled.div`
  position: relative;
  width: 100%; // 부모 요소에 맞게 너비 조정 용이하도록
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const Label = styled.label`
  display: block;

  font-weight: bold;
  font-size: 0.9rem;
  width: 50px;
  margin-right: 10px;
  white-space: nowrap;
  flex-shrink: 0;
`;

const FakeDropdownButton = styled.button`
  flex-grow: 1;
  min-width: 0;
  padding: 10px 15px;
  border: 1px solid #adb5bd;
  border-radius: 25px;
  background-color: ${(props) => (props.disabled ? "#e9ecef" : "white")};
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  text-align: left;
  font-size: 1rem;
  color: ${(props) => (props.hasValue ? "#212529" : "#adb5bd")};
  opacity: ${(props) => (props.disabled ? 0.65 : 1)};

  &:focus {
    outline: none;
    border-color: #80bdff;
    box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
  }
`;

const DropdownList = styled.ul`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background-color: white;
  border: 1px solid #ced4da;
  border-top: none;
  border-radius: 0 0 4px 4px;
  list-style: none;
  padding: 0;
  margin: 0;
  max-height: 200px;
  overflow-y: auto;
  z-index: 10;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.15);
`;
const DropdownItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 15px;
  cursor: pointer;
  color: #212529;

  &:hover {
    background-color: #f8f9fa;
  }

  &.disabled {
    color: #6c757d;
    cursor: default;
    background-color: transparent;
  }

  /* 선택된 항목 스타일 */
  ${({ isSelected }) =>
    isSelected &&
    css`
      background-color: #e7f5ff; /* 선택 시 배경색 예시 */
      font-weight: 500;
      /* 체크 아이콘 공간 확보가 필요하다면 padding-right 조정 */
    `}

  /* 체크 아이콘 스타일 (선택 사항) */
  .check-icon {
    color: #198754; /* 체크 아이콘 색상 예시 */
    margin-left: 10px;
  }
`;

const LoadingIndicator = styled(DropdownItem).attrs({
  as: "div",
  className: "disabled",
})``;
const NoOptionsIndicator = styled(DropdownItem).attrs({
  as: "div",
  className: "disabled",
})``;

function DynamicDropdown({
  label, // 라벨 텍스트
  options = [], // 드롭다운 옵션 목록 (배열)
  selectedOption, // 현재 선택된 옵션 (부모로부터 받음)
  onOptionSelect, // 옵션 선택 시 부모에게 알릴 콜백 함수
  placeholder = "선택하세요", // 플레이스홀더 텍스트
  loading = false, // 로딩 상태 (부모로부터 받음)
  error = null, // 에러 상태 (부모로부터 받음)
  optionLabelKey = null, // 옵션이 객체일 경우 표시될 텍스트의 키
  optionValueKey = null, // 옵션이 객체일 경우 전달될 값의 키 (null이면 옵션 객체/값 전체 전달)
  id, // HTML id 속성
  isMultiSelect = false, // 다중 선택 모드 플래그 추가 (기본값: false)
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const getDisplayLabel = () => {
    if (loading) return "로딩 중...";
    if (error) return "오류 발생";

    if (isMultiSelect) {
      if (Array.isArray(selectedOption) && selectedOption.length > 0) {
        const selectedLabels = selectedOption
          .map((selectedValue) => {
            const foundOption = options.find(
              (opt) => getOptionValue(opt) === selectedValue
            );
            return foundOption ? getOptionLabel(foundOption) : null;
          })
          .filter((label) => label !== null);
        if (selectedLabels.length > 0) {
          return selectedLabels.join(", ");
        } else {
          return placeholder;
        }
      }
      return placeholder;
    } else {
      if (selectedOption !== null && selectedOption !== undefined) {
        const foundOption = options.find(
          (opt) => getOptionValue(opt) === selectedOption
        );
        return foundOption
          ? getOptionLabel(foundOption)
          : String(selectedOption);
      }
      return placeholder;
    }
  };

  // 특정 옵션이 현재 선택되었는지 확인하는 함수 (다중 선택 배열 확인)
  const isOptionSelected = (option) => {
    if (!selectedOption) return false;
    const value = getOptionValue(option);
    if (isMultiSelect) {
      return Array.isArray(selectedOption) && selectedOption.includes(value);
    } else {
      return selectedOption === value;
    }
  };

  const getOptionLabel = (option) => {
    if (option === null || option === undefined) return "";
    if (optionLabelKey && typeof option === "object" && option !== null) {
      // optionLabelKey가 'name'으로 제대로 전달되었는지, option['name']에 값이 있는지 확인
      return option[optionLabelKey] ?? "";
    }
    return String(option);
  };

  const getOptionValue = (option) => {
    if (optionValueKey && typeof option === "object" && option !== null) {
      return option[optionValueKey] ?? option; // 키가 있으면 해당 값, 없으면 객체 전체
    }
    return option; // 객체가 아니거나 키가 없으면 옵션 자체
  };

  // 드롭다운 토글 핸들러
  const handleDropdownToggle = () => {
    if (loading || error) return; // 로딩 중이거나 에러 시 토글 방지
    setIsOpen((prev) => !prev);
  };

  const handleOptionClick = (option) => {
    const valueToEmit = getOptionValue(option);
    onOptionSelect(valueToEmit); // 값만 부모에게 전달하는 것은 동일

    // 다중 선택 모드가 아닐 경우에만 드롭다운을 닫음
    if (!isMultiSelect) {
      setIsOpen(false);
    }
  };
  // 외부 클릭 감지하여 드롭다운 닫기
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const displayLabel =
    selectedOption !== null && selectedOption !== undefined
      ? getOptionLabel(
          options.find(
            (opt) => getOptionValue(opt) === getOptionValue(selectedOption)
          ) ?? selectedOption
        ) // 선택된 '값'에 해당하는 '레이블' 찾기
      : placeholder;

  return (
    <DropdownContainer ref={dropdownRef}>
      {label && <Label htmlFor={id}>{label}</Label>}
      <FakeDropdownButton
        id={id}
        onClick={handleDropdownToggle}
        disabled={loading || !!error}
        hasValue={
          isMultiSelect
            ? Array.isArray(selectedOption) && selectedOption.length > 0
            : selectedOption !== null && selectedOption !== undefined
        }
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span>{getDisplayLabel()}</span>
        {isOpen ? (
          <FiChevronUp size={18} color="#adb5bd" />
        ) : (
          <FiChevronDown size={18} color="#adb5bd" />
        )}
      </FakeDropdownButton>

      {isOpen && (
        <DropdownList role="listbox" aria-multiselectable={isMultiSelect}>
          {loading ? (
            <LoadingIndicator>로딩 중...</LoadingIndicator>
          ) : options.length > 0 ? (
            options.map((option, index) => {
              const label = getOptionLabel(option);
              const value = getOptionValue(option);
              const isSelected = isOptionSelected(option); // 현재 옵션이 선택되었는지 확인

              if (label === null || label === undefined || label === "")
                return null;

              return (
                <DropdownItem
                  key={value ?? index} // 값(value)을 key로 사용, 없으면 index
                  onClick={() => handleOptionClick(option)}
                  role="option"
                  aria-selected={isSelected}
                  isSelected={isSelected} // 스타일링을 위한 prop 전달
                >
                  <span>{label}</span>
                  {/* 선택된 경우 체크 아이콘 표시 (선택 사항) */}
                  {isSelected && isMultiSelect && (
                    <FiCheck size={16} className="check-icon" />
                  )}
                </DropdownItem>
              );
            })
          ) : (
            <NoOptionsIndicator>옵션 없음</NoOptionsIndicator>
          )}
        </DropdownList>
      )}
    </DropdownContainer>
  );
}

export default DynamicDropdown;
