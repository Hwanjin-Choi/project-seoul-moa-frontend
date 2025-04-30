import MobileLayout from "../../components/Layout/MobileLayout";
import styled from "styled-components";
import RegiForm from "../../components/RegiForm/RegiForm";
import CategoryButton from "../../components/CategoryButton/CategoryButton";
import Button from "../../components/Button/Button"; // 최종 제출 버튼 추가
import { fetchCategories } from "../../api/category";
import { registerUser } from "../../api/registration";
import { getIconForCategory } from "../../components/CategoryButton/categoryIcon";
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

// --- Styled Components (기존과 거의 동일, 일부 추가/수정) ---
const PageContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 0 15px 20px 15px; /* 좌우 패딩 및 하단 여백 추가 */
  justify-content: center;
  height: 100%;
  overflow-y: auto; /* 내용 많을 시 스크롤 (단계별로 내용이 줄어 덜 필요할 수 있음) */
`;

const RegistrationTitleContainer = styled.div`
  padding: 15px 0; /* 상하 패딩 조정 */
  text-align: center;
  width: 100%; /* 너비 확보 */
`;

const RegistrationTitle = styled.h1`
  font-size: 18px; /* 모바일 기준 크기 고정 */
  font-weight: 600;
  margin-bottom: 8px; /* 제목 간 간격 */
  &:last-child {
    margin-bottom: 0;
  }
`;

const RegistrationButtonGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr); /* 모바일 기본 2열 */
  width: 100%;
  max-width: 400px; /* 최대 너비 설정 (선택 사항) */
  margin-top: 20px;
  margin-bottom: 24px;
  place-items: center;
  max-height: 600px;
  overflow-y: scroll;
  @media (min-width: 768px) {
    /* 데스크탑 3열 */
    grid-template-columns: repeat(3, 1fr);
    max-width: 600px;
    max-height: unset;
    gap: 10px;
  }
`;

const ButtonContainer = styled.div`
  width: 100%;
  max-width: 300px;
  margin-top: 20px;
  display: flex;
  gap: 10px;
`;

const ErrorMessageDisplay = styled.div`
  color: red;
  margin-top: 15px;
  font-size: 0.9em;
  text-align: center;
  width: 100%;
`;

const SuccessMessage = styled.div`
  color: #00a37f;
  margin-top: 15px;
  font-weight: 600;
  text-align: center;
  width: 100%;
`;
// --- Styled Components 끝 ---

const registrationFields = [
  { name: "userId", type: "text", placeholder: "아이디", required: true },
  {
    name: "password",
    type: "password",
    placeholder: "비밀번호",
    required: true,
  },
  { name: "nickname", type: "text", placeholder: "닉네임", required: true },
  { name: "age", type: "number", placeholder: "나이", required: true },
];

const RegistrationPage = () => {
  const [step, setStep] = useState(1); // 1: 유저 정보 입력, 2: 카테고리 선택
  const [userInfo, setUserInfo] = useState(null); // 1단계에서 입력된 유저 정보 저장

  const [allCategories, setAllCategories] = useState([]);
  const [selectedCategoryIds, setSelectedCategoryIds] = useState([]);
  const [loading, setLoading] = useState(false); // API 로딩 상태 (카테고리 로딩+제출 로딩)
  const [formLoading, setFormLoading] = useState(false); // 폼 제출(다음/회원가입) 시 로딩 상태
  const [error, setError] = useState(null);
  const [formErrors, setFormErrors] = useState({}); // RegiForm 유효성 검사 에러
  const [success, setSuccess] = useState("");
  const [formKey, setFormKey] = useState(0); // 폼 초기화용 key
  const navigate = useNavigate();
  const timeoutRef = useRef(null);

  // 카테고리 데이터 로딩
  useEffect(() => {
    const loadCategories = async () => {
      try {
        setLoading(true);
        setError(null);
        const categories = await fetchCategories();
        setAllCategories(categories);
      } catch (err) {
        setError("카테고리를 불러오는 데 실패했습니다: " + err.message);
        setAllCategories([]);
      } finally {
        setLoading(false);
      }
    };
    loadCategories();

    // 컴포넌트 언마운트 시 타임아웃 클리어
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  // 카테고리 선택 핸들러
  const handleCategoryClick = (categoryId) => {
    setSelectedCategoryIds((prevSelectedIds) => {
      if (prevSelectedIds.includes(categoryId)) {
        return prevSelectedIds.filter((id) => id !== categoryId);
      } else {
        return [...prevSelectedIds, categoryId];
      }
    });
  };

  // 단계 1 (유저 정보 입력) 제출 핸들러
  const handleStep1Submit = (formData, setRegiFormErrors) => {
    // RegiForm 내부 유효성 검사 로직을 여기서 다시 호출하거나,
    // RegiForm이 자체적으로 유효성 검사를 통과했을 때만 onSubmit을 호출하도록 수정 필요.
    // 여기서는 RegiForm이 유효한 데이터만 전달한다고 가정.
    // (만약 RegiForm의 onSubmit이 유효성 실패 시 호출되지 않는다면 이 로직 사용)

    // 간단한 필수 필드 추가 확인 (RegiForm 내부 검증 보강)
    let validationErrors = {};
    registrationFields.forEach((field) => {
      if (field.required && !formData[field.name]) {
        validationErrors[field.name] =
          `${field.placeholder}을(를) 입력해주세요.`;
      }
    });
    // 성별 검사
    if (!formData.gender) {
      validationErrors.gender = "성별을 선택해주세요.";
    }
    // 비밀번호 정규식 검사 (RegiForm에서 이미 하고 있다면 중복)
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+=-]).{8,}$/;
    if (formData.password && !passwordRegex.test(formData.password)) {
      validationErrors.password =
        "비밀번호는 8자 이상이며, 영문자, 숫자, 특수문자를 포함해야 합니다.";
    }

    if (Object.keys(validationErrors).length > 0) {
      setRegiFormErrors(validationErrors); // RegiForm에 에러 상태 전달
      return; // 유효성 검사 실패 시 진행 중단
    }

    // 유효성 검사 통과 시
    setUserInfo(formData); // 유저 정보 저장
    setStep(2);
    setFormErrors({});
    setError(null);
  };

  const handleFinalRegistration = async () => {
    if (!userInfo) {
      setError("사용자 정보가 없습니다. 이전 단계로 돌아가 입력해주세요.");
      setStep(1);
      return;
    }

    setError(null);
    setSuccess("");
    setFormLoading(true);

    try {
      const finalFormData = {
        username: userInfo.userId,
        password: userInfo.password,
        nickname: userInfo.nickname,
        age: userInfo.age,
        gender: userInfo.gender,
        categoryIds: selectedCategoryIds,
      };
      console.log("Final Submission Data:", finalFormData);
      const response = await registerUser(finalFormData);
      setSuccess(
        "회원가입이 성공적으로 완료되었습니다. 잠시후 로그인 페이지로 이동됩니다"
      );

      // 폼과 상태 초기화 (선택사항)
      // setUserInfo(null);
      // setSelectedCategoryIds([]);
      // setStep(1); // 성공 후 첫 단계로? 아니면 로그인 페이지로 바로 감
      // setFormKey((prevKey) => prevKey + 1); // RegiForm 초기화

      // 2초 후 로그인 페이지로 이동
      timeoutRef.current = setTimeout(() => {
        navigate("/login-page");
      }, 2000);
    } catch (error) {
      setError(error.message || "회원가입 중 오류가 발생했습니다.");
    } finally {
      setFormLoading(false);
    }
  };

  // 이전 단계로 돌아가는 함수
  const goToPreviousStep = () => {
    if (step === 2) {
      setStep(1);
      setError(null);
    }
  };

  return (
    <MobileLayout>
      <PageContentWrapper>
        <RegistrationTitleContainer>
          {step === 1 && (
            <>
              <RegistrationTitle>반갑습니다!</RegistrationTitle>
              <RegistrationTitle>본격적으로 시작하기 앞서</RegistrationTitle>
              <RegistrationTitle>
                프로필 생성에 필요한 기본 정보를 입력해주세요!
              </RegistrationTitle>
            </>
          )}
          {step === 2 && (
            <RegistrationTitle>
              관심 있는 카테고리를 선택해주세요!
            </RegistrationTitle>
          )}

          {success && <SuccessMessage>{success}</SuccessMessage>}

          {error && <ErrorMessageDisplay>{error}</ErrorMessageDisplay>}
        </RegistrationTitleContainer>

        {step === 1 && (
          <RegiForm
            key={formKey}
            fields={registrationFields}
            submitText="다음"
            onSubmit={handleStep1Submit}
            loading={formLoading}
          />
        )}

        {step === 2 && (
          <>
            {loading && <p>카테고리 로딩 중...</p>}
            {!loading && allCategories.length > 0 && (
              <RegistrationButtonGrid>
                {allCategories.map((item) => {
                  const categoryIcon = getIconForCategory(item.categoryId); // item.categoryId를 인자로 함수 호출

                  return (
                    <CategoryButton
                      key={item.categoryId}
                      category={item.name}
                      icon={categoryIcon}
                      isClicked={selectedCategoryIds.includes(item.categoryId)}
                      onClick={() => handleCategoryClick(item.categoryId)}
                    />
                  );
                })}
              </RegistrationButtonGrid>
            )}
            {!loading && allCategories.length === 0 && !error && (
              <p>표시할 카테고리가 없습니다.</p>
            )}

            <ButtonContainer>
              <Button
                type="button"
                onClick={goToPreviousStep}
                disabled={formLoading}
                fullWidth={true}
                style={{ backgroundColor: "#6c757d" }}
              >
                이전
              </Button>
              <Button
                type="button"
                onClick={handleFinalRegistration}
                disabled={formLoading}
                fullWidth={true}
              >
                {formLoading ? "처리 중..." : "회원가입"}
              </Button>
            </ButtonContainer>
          </>
        )}
      </PageContentWrapper>
    </MobileLayout>
  );
};

export default RegistrationPage;
