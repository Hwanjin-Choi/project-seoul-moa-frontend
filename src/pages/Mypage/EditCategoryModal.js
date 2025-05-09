import styled from "styled-components";
import { useEffect, useState } from "react";

import Typography from "../../components/Typography/Typography";
import Button from "../../components/Button/Button"; // 사용자 정의 버튼 컴포넌트
import { Color } from "../../styles/colorsheet";
import CategoryButton from "../../components/CategoryButton/CategoryButton";

import { fetchCategories } from "../../api/category";
import { updateUserInterests } from "../../api/user";
import { getIconForCategory } from "../../components/CategoryButton/categoryIcon";

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
  justify-content: center;
`;

const BottomRow = styled.div`
  padding: 20px;
  display: flex;
  gap: 10px;
  flex-shrink: 0;
`;

const EditCategoryModal = ({
  isOpen,
  onClose,
  selected,
  setSelected,
  userInfo,
}) => {
  const [categoryList, setCategoryList] = useState([]);
  const [isSaving, setIsSaving] = useState(false); // 저장 중 상태를 관리할 state 추가

  useEffect(() => {
    if (isOpen) {
      // 모달이 열릴 때 isSaving 상태 초기화
      setIsSaving(false);
      fetchCategories()
        .then((data) => setCategoryList(data))
        .catch((err) => console.error("카테고리 목록 로드 실패:", err));
    }
  }, [isOpen]);

  const toggleCategory = (catName) => {
    // 저장 중에는 카테고리 선택 변경 불가
    if (isSaving) return;

    setSelected((prevSelected) =>
      prevSelected.includes(catName)
        ? prevSelected.filter((c) => c !== catName)
        : [...prevSelected, catName]
    );
  };

  const handleSave = async () => {
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

    setIsSaving(true); // 저장 시작 시 버튼 비활성화

    try {
      await updateUserInterests(userInfo, selectedCategoryIds);
      localStorage.setItem("categoryId", JSON.stringify(selectedCategoryIds));
      // 기존 memberCategoryIds를 삭제하는 로직이 있다면,
      // 새로운 값으로 덮어쓰는 것이므로 그대로 두거나, 명시적으로 삭제 후 setItem 하셔도 됩니다.
      localStorage.removeItem("memberCategoryIds"); // 이 부분은 로직에 따라 필요 없을 수도 있습니다.

      alert("관심사가 성공적으로 저장되었습니다."); // 사용자에게 저장 완료 알림
      onClose(); // 모달 닫기
    } catch (err) {
      console.error("저장 중 오류:", err);
      alert("관심사 저장 중 문제가 발생했습니다. 다시 시도해 주세요.");
    } finally {
      setIsSaving(false); // 저장 완료/실패 후 버튼 다시 활성화
    }
  };

  // 모달 닫기 버튼 핸들러 (저장 중에는 닫기 버튼도 비활성화 고려 가능)
  const handleCloseModal = () => {
    if (isSaving) return; // 저장 중에는 닫기 방지 (선택 사항)
    onClose();
  };

  if (!isOpen) return null;

  return (
    <ModalWrapper onClick={handleCloseModal}>
      <SlideModal onClick={(e) => e.stopPropagation()}>
        <Header>
          <Typography variant="h3">관심사 수정</Typography>
          <CloseButton onClick={handleCloseModal} disabled={isSaving}>
            {" "}
            {/* 저장 중 닫기 버튼 비활성화 */}
            닫기
          </CloseButton>
        </Header>

        <ScrollableContent>
          <ButtonGrid>
            {categoryList.map((field) => (
              <CategoryButton
                key={field.categoryId}
                category={field.name}
                icon={getIconForCategory(field.categoryId)}
                isClicked={selected.includes(field.name)}
                onClick={() => toggleCategory(field.name)}
                disabled={isSaving} // 저장 중 카테고리 버튼 비활성화
              />
            ))}
          </ButtonGrid>
        </ScrollableContent>

        <BottomRow>
          <Button
            variant="secondary"
            fullWidth
            onClick={handleCloseModal}
            disabled={isSaving} // 저장 중 취소 버튼 비활성화
          >
            취소
          </Button>
          <Button
            variant="primary"
            fullWidth
            onClick={handleSave}
            disabled={isSaving} // 저장 버튼 비활성화
          >
            {isSaving ? "저장 중..." : "저장"} {/* 저장 중 텍스트 변경 */}
          </Button>
        </BottomRow>
      </SlideModal>
    </ModalWrapper>
  );
};

export default EditCategoryModal;
