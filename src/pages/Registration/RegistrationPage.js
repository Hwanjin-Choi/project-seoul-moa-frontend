import MobileLayout from "../../components/Layout/MobileLayout";
import styled from "styled-components";
import RegiForm from "../../components/RegiForm/RegiForm";
import CategoryButton from "../../components/CategoryButton/CategoryButton";
import { fetchCategories } from "../../api/category";
import { registerUser } from "../../api/registration";

import React, { useState, useEffect, useRef } from "react"; // useRef 임포트 추가
import { useNavigate } from "react-router-dom"; // useNavigate 임포트 추가
const RegistrationContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  overflow-y: scroll;
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

const SuccessMessage = styled.div`
  color: #00a37f; // 진한 녹색 계열 텍스트

  margin-top: 20px; // 위쪽 여백
  font-weight: 600; // 굵은 글씨
  text-align: center;
  width: 100%;
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

const RegistrationPage = () => {
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);
        const categories = await fetchCategories();
        setAllCategories(categories);
      } catch (err) {
        setError(err.message);
        setAllCategories([]);
      } finally {
        setLoading(false);
      }
    };
    loadData();

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const [allCategories, setAllCategories] = useState([]);
  const [selectedCategoryIds, setSelectedCategoryIds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState("");
  const [formKey, setFormKey] = useState(0);
  const navigate = useNavigate();
  const timeoutRef = useRef(null);

  const handleCategoryClick = (categoryId) => {
    setSelectedCategoryIds((prevSelectedIds) => {
      if (prevSelectedIds.includes(categoryId)) {
        return prevSelectedIds.filter((id) => id !== categoryId);
      } else {
        return [...prevSelectedIds, categoryId];
      }
    });
  };
  const handleRegistration = async (credentials) => {
    const { userId, password, nickname, age, gender } = credentials;
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const formData = {
        username: userId,
        password: password,
        nickname: nickname,
        age: age,
        gender: gender,
        categoryIds: selectedCategoryIds,
      };
      console.log(formData);
      const response = await registerUser(formData);
      setSuccess(
        "회원가입이 성공적으로 완료되었습니다. 잠시후 로그인 페이지로 이동됩니다"
      );
      setFormKey((prevKey) => prevKey + 1);
      setSelectedCategoryIds([]);

      timeoutRef.current = setTimeout(() => {
        navigate("/login-page");
      }, 2000);
    } catch (error) {
      setError(error.message || "회원가입 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
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
          <SuccessMessage>{success && success}</SuccessMessage>
        </RegistrationTitleContainer>
        <RegistrationForm>
          <RegiForm
            key={formKey}
            fields={registrationFields}
            submitText="회원가입"
            onSubmit={handleRegistration}
            loading={loading}
          />
        </RegistrationForm>
        <RegistrationButtonGrid>
          {allCategories.map((item) => (
            <CategoryButton
              key={item.categoryId}
              category={item.name}
              isClicked={selectedCategoryIds.includes(item.categoryId)}
              onClick={() => handleCategoryClick(item.categoryId)}
            />
          ))}
        </RegistrationButtonGrid>
      </RegistrationContainer>
    </MobileLayout>
  );
};

export default RegistrationPage;
