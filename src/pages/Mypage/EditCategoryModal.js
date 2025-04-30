import styled from "styled-components";
import { useEffect, useState } from "react";

import Typography from "../../components/Typography/Typography";
import Button from "../../components/Button/Button";
import { Color } from "../../styles/colorsheet";
import CategoryButton from "../../components/CategoryButton/CategoryButton";

import { fetchCategories } from "../../api/category"
import { updateUserInterests } from "../../api/user";

const ModalWrapper = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 1000;
`;

const SlideModal = styled.div`
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: 960px;
  height: 55vh;
  background-color: white;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  display: flex;
  flex-direction: column;
  z-index: 1001;

  @media (min-width: 768px) and (max-width: 1023px) {
    max-width: 720px;
  }

  @media (min-width: 1024px) {
    max-width: 960px;
  }
`;

const Header = styled.div`
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-shrink: 0;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: ${Color.MC1};
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
`;

const ScrollableContent = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 0 20px;
`;

const ButtonGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: space-between;
`;

const BottomRow = styled.div`
  padding: 20px;
  display: flex;
  gap: 10px;
  flex-shrink: 0;
`;

const EditCategoryModal = ({ isOpen, onClose, selected, setSelected, userInfo }) => {
  const [categoryList, setCategoryList] = useState([]);

  useEffect(() => {
    if (isOpen) {
      fetchCategories()
        .then((data) => setCategoryList(data))
        .catch((err) => console.error("카테고리 목록 로드 실패:", err));
    }
  }, [isOpen]);

  const toggleCategory = (cat) => {
    if (selected.includes(cat)) {
      setSelected(selected.filter((c) => c !== cat));
    } else {
      setSelected([...selected, cat]);
    }
  };

  const handleSave = async () => {
    try {
      const selectedCategoryIds = categoryList
        .filter((cat) => selected.includes(cat.name))
        .map((cat) => cat.categoryId);
      if (!userInfo) {
        alert("유저 정보를 찾을 수 없습니다.");
        return;
      }
      if (selectedCategoryIds.length === 0) {
        alert("하나 이상의 관심사를 선택해주세요.");
        return;
      }
      await updateUserInterests(userInfo, selectedCategoryIds);
      alert("관심사가 저장되었습니다.");
      onClose();
    } catch (err) {
      console.error("저장 중 오류:", err);
      alert("관심사 저장 중 문제가 발생했습니다.");
    }
  };

  if (!isOpen) return null;

  return (
    <ModalWrapper onClick={onClose}>
      <SlideModal onClick={(e) => e.stopPropagation()}>
        <Header>
          <Typography variant="h3">관심사 수정</Typography>
          <CloseButton onClick={onClose}>닫기</CloseButton>
        </Header>

        <ScrollableContent>
          <ButtonGrid>
            {categoryList.map((field) => (
              <CategoryButton
                key={field.categoryId}
                category={field.name}
                isClicked={selected.includes(field.name)}
                onClick={() => toggleCategory(field.name)}
              />
            ))}
          </ButtonGrid>
        </ScrollableContent>

        <BottomRow>
          <Button variant="secondary" fullWidth onClick={onClose}>취소</Button>
          <Button variant="primary" fullWidth onClick={handleSave}>저장</Button>
        </BottomRow>
      </SlideModal>
    </ModalWrapper>
  );
};

export default EditCategoryModal;