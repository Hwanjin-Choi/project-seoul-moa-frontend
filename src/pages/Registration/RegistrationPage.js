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
`;
const RegistrationTitle = styled.h1`
  font-size: 24px;
  font-weight: 600;
`;
const RegistrationTitleContainer = styled.div`
  margin-top: 100px;
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
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
  margin-bottom: 24px;
`;
const registrationFields = [
  { name: "name", type: "text", placeholder: "이름", required: true },
  { name: "email", type: "email", placeholder: "이메일", required: true },
  {
    name: "password",
    type: "password",
    placeholder: "비밀번호",
    required: true,
  },
];
const categoryFields = [
  { category: "cat1", isClicked: false },
  { category: "cat2", isClicked: false },
  { category: "cat3", isClicked: false },
  { category: "cat4", isClicked: false },
  { category: "cat5", isClicked: false },
];
const handleRegistration = (credentials, setErrors) => {
  const { username, password } = credentials;
  try {
    console.log(credentials);
    /* if (response.status === 200) {
    } */
  } catch (error) {}
};

const RegistrationPage = () => {
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
            />
          ))}
        </RegistrationButtonGrid>
      </RegistrationContainer>
    </MobileLayout>
  );
};

export default RegistrationPage;
