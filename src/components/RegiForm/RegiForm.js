import React, { useState, useEffect } from "react"; // useEffect 추가
import styled from "styled-components";
import Button from "../Button/Button";
import Input from "../Input/Input";
import Radio from "../Radio/Radio";

const InputGroup = styled.div`
  margin-bottom: 15px; /* 간격 조정 */
`;
const ErrorMessage = styled.div`
  color: red;
  margin-top: 5px;
  font-size: 0.85em; /* 크기 미세 조정 */
  line-height: 1.2; /* 줄 간격 추가 */
`;
const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 350px; /* 너비 약간 증가 */
  width: 100%;
`;
const RadioContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 15px; /* 간격 조정 */
  justify-content: space-evenly;
  width: 100%; /* 너비 100% */
`;

const RegiForm = ({ fields, submitText, onSubmit, loading }) => {
  // 초기 formData 상태 설정 (fields 기반으로 초기화)
  const initialFormData = fields.reduce((acc, field) => {
    acc[field.name] = "";
    return acc;
  }, {});
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const [selectedGender, setSelectedGender] = useState(null); // 초기값 null

  // 입력 변경 핸들러: 값 업데이트 및 해당 필드 에러 초기화
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    // 입력이 변경되면 해당 필드의 에러 메시지를 지웁니다.
    if (errors[name]) {
      setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
    }
  };

  // 성별 변경 핸들러
  const handleGenderChange = (value) => {
    setSelectedGender(value);
    // 성별 선택 시 관련 에러가 있다면 초기화 (필요시 추가)
    // if (errors.gender) {
    //   setErrors((prevErrors) => ({ ...prevErrors, gender: "" }));
    // }
  };

  // 제출 핸들러: 유효성 검사 추가
  const handleSubmit = (e) => {
    e.preventDefault();
    let validationErrors = {};

    // --- 필수 필드 검사 (선택사항이지만 권장) ---
    fields.forEach((field) => {
      if (field.required && !formData[field.name]) {
        validationErrors[field.name] =
          `${field.placeholder || field.name}을(를) 입력해주세요.`;
      }
    });
    if (!selectedGender) {
      validationErrors.gender = "성별을 선택해주세요.";
    }

    // --- 비밀번호 유효성 검사 ---
    const passwordField = fields.find((field) => field.type === "password"); // 비밀번호 필드 찾기
    if (passwordField) {
      const passwordKey = passwordField.name;
      const passwordValue = formData[passwordKey];

      if (passwordValue) {
        // 비밀번호가 입력되었을 경우에만 정규식 검사
        const passwordRegex =
          /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+=-]).{8,}$/;
        if (!passwordRegex.test(passwordValue)) {
          // 정규식 불일치 시 에러 메시지 설정 (기존 에러 메시지 덮어쓰기 가능)
          validationErrors[passwordKey] =
            "비밀번호는 8자 이상이며, 영문자, 숫자, 특수문자(!@#$%^&*()_+=-)를 포함해야 합니다.";
        }
      } else if (passwordField.required) {
        // 비밀번호 필드가 필수인데 비어있는 경우 (위의 필수 필드 검사에서 이미 처리될 수 있음)
        if (!validationErrors[passwordKey]) {
          // 중복 에러 메시지 방지
          validationErrors[passwordKey] = "비밀번호를 입력해주세요.";
        }
      }
    }
    // --- 끝: 비밀번호 유효성 검사 ---

    if (Object.keys(validationErrors).length > 0) {
      // 유효성 검사 에러가 있으면 에러 상태 업데이트
      setErrors(validationErrors);
    } else {
      // 유효성 검사 통과 시 에러 상태 초기화 및 부모 컴포넌트의 onSubmit 호출
      setErrors({});
      onSubmit({ ...formData, gender: selectedGender }, setErrors);
    }
  };

  return (
    <FormContainer>
      <form
        style={{ width: "100%", maxWidth: "350px" }} // FormContainer와 너비 일치
        onSubmit={handleSubmit}
        noValidate
      >
        {fields.map((field) => (
          <InputGroup key={field.name}>
            <Input
              type={field.type}
              id={field.name}
              name={field.name}
              placeholder={field.placeholder}
              value={formData[field.name]} // 초기값 '' 적용됨
              onChange={handleChange}
              aria-invalid={!!errors[field.name]}
              aria-describedby={
                errors[field.name] ? `${field.name}-error` : undefined
              }
            />
            {errors[field.name] && (
              <ErrorMessage id={`${field.name}-error`}>
                {errors[field.name]}
              </ErrorMessage>
            )}
          </InputGroup>
        ))}
        <RadioContainer>
          <Radio
            label="남자"
            value="m"
            name="gender" // 라디오 그룹 이름 지정
            checked={selectedGender === "m"}
            onChange={() => handleGenderChange("m")}
          />
          <Radio
            label="여자"
            value="f"
            name="gender" // 라디오 그룹 이름 지정
            checked={selectedGender === "f"}
            onChange={() => handleGenderChange("f")}
          />
        </RadioContainer>
        {errors.gender && (
          <ErrorMessage
            style={{
              width: "100%",
              textAlign: "center",
              marginTop: "-5px",
              marginBottom: "10px",
            }}
          >
            {errors.gender}
          </ErrorMessage>
        )}

        <Button fullWidth type="submit" disabled={loading}>
          {" "}
          {!loading ? submitText : "가입 처리 중..."}
        </Button>
      </form>
    </FormContainer>
  );
};

export default RegiForm;
