import styled from "styled-components";
import Typography from "../../components/Typography/Typography";
import Button from "../../components/Button/Button";
import { Color } from "../../styles/colorsheet";
import { categoryFieldsData } from "./data";
import CategoryButton from "../../components/CategoryButton/CategoryButton";

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

const EditCategoryModal = ({ isOpen, onClose, selected, setSelected }) => {
  if (!isOpen) return null;

  const toggleCategory = (cat) => {
    if (selected.includes(cat)) {
      setSelected(selected.filter((c) => c !== cat));
    } else {
      setSelected([...selected, cat]);
    }
  };

  return (
    <ModalWrapper onClick={onClose}>
      <SlideModal onClick={(e) => e.stopPropagation()}>
        <Header>
          <Typography variant="h3">관심사 수정</Typography>
          <CloseButton onClick={onClose}>닫기</CloseButton>
        </Header>

        <ScrollableContent>
          <ButtonGrid>
            {categoryFieldsData.map((field, idx) => (
              <CategoryButton
                key={idx}
                category={field.category}
                isClicked={selected.includes(field.category)}
                onClick={() => toggleCategory(field.category)}
              />
            ))}
          </ButtonGrid>
        </ScrollableContent>

        <BottomRow>
          <Button variant="secondary" fullWidth onClick={onClose}>취소</Button>
          <Button variant="primary" fullWidth onClick={onClose}>저장</Button>
        </BottomRow>
      </SlideModal>
    </ModalWrapper>
  );
};

export default EditCategoryModal;
