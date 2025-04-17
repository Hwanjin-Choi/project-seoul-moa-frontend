import React, { useState } from "react";
import MobileLayout from "../../components/Layout/MobileLayout";
import styled from "styled-components";
import RegiForm from "../../components/RegiForm/RegiForm";
import CategoryButton from "../../components/CategoryButton/CategoryButton";

const RegistrationContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;
const RegistrationTitle = styled.h1`
  font-size: 24px;
  font-weight: 600;
  @media (max-width: 768px) {
    font-size: 18px;
    font-weight: 600;
  }
`;
const RegistrationTitleContainer = styled.div`
  padding: 15px;
  text-align: center;
`;
const RegistrationForm = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 300px;
  width: 100%;
  margin-top: 20px;
`;
const RegistrationButtonGrid = styled.div`
  @media (min-width: 768px) {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    margin-bottom: 24px;
    /*     max-height: 200px; */
    overflow-y: auto;
  }
  @media (max-width: 768px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    margin-bottom: 24px;
    /*     max-height: 200px; */
    overflow-y: auto;
  }
`;
const registrationFields = [
  { name: "userId", type: "text", placeholder: "아이디", required: true },
  {
    name: "password",
    type: "password",
    placeholder: "비밀번호",
    required: true,
  },
  {
    name: "nickname",
    type: "text",
    placeholder: "닉네임",
    required: true,
  },
  {
    name: "age",
    type: "number",
    placeholder: "나이",
    required: true,
  },
];

const categoryFieldsData = [
  { category: "교육/체험", isClicked: false },
  { category: "독주/독창회", isClicked: false },
  { category: "콘서트", isClicked: false },
  { category: "전시/미술", isClicked: false },
  { category: "클래식", isClicked: false },
  { category: "무용", isClicked: false },
  { category: "뮤지컬/오페라", isClicked: false },
  { category: "연극", isClicked: false },
  { category: "영화", isClicked: false },
  { category: "기타", isClicked: false },
  { category: "축제", isClicked: false },
  { category: "국악", isClicked: false },
];

const RegistrationPage = () => {
  const [categoryFields, setCategoryFields] = useState(categoryFieldsData);
  const handleCategoryClick = (category) => {
    setCategoryFields(
      categoryFields.map((item) =>
        item.category === category
          ? { ...item, isClicked: !item.isClicked }
          : item
      )
    );
  };
  const handleRegistration = (credentials, setErrors) => {
    const { userId, password, nickname, age, gender } = credentials;

    try {
      const formData = {
        userId: userId,
        password: password,
        nickname: nickname,
        age: age,
        gender: gender,
        category: categoryFields
          .filter((item) => item.isClicked)
          .map((item) => item.category),
      };
      console.log(formData);
      /* if (response.status === 200) {
    } */
    } catch (error) {}
  };
  return (
    <MobileLayout>
      <RegistrationContainer>
        <RegistrationTitleContainer>
          <RegistrationTitle>반갑습니다!</RegistrationTitle>
          <RegistrationTitle>본격적으로 시작하기 앞서</RegistrationTitle>
          <RegistrationTitle>
            프로필 생성에 필요한 기본 정보를 입력해주세요!
          </RegistrationTitle>
        </RegistrationTitleContainer>
        <RegistrationForm>
          <RegiForm
            fields={registrationFields}
            submitText="회원가입"
            onSubmit={handleRegistration}
          />
        </RegistrationForm>
        <RegistrationButtonGrid>
          {categoryFields.map((item) => (
            <CategoryButton
              key={item.category}
              category={item.category}
              isClicked={item.isClicked}
              onClick={() => handleCategoryClick(item.category)}
            />
          ))}
        </RegistrationButtonGrid>
      </RegistrationContainer>
    </MobileLayout>
  );
};

export default RegistrationPage;
