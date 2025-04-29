import React, { useState, useEffect, useRef } from "react"; // useRef 임포트 추가
import { useNavigate } from "react-router-dom"; // useNavigate 임포트 추가

import styled from "styled-components";
import logo from "../../assets/seoulmoa.svg";
import MobileLayout from "../../components/Layout/MobileLayout";
import Button from "../../components/Button/Button";
import AuthForm from "../../components/AuthForm/AuthForm";

import { loginUser } from "../../api/login";

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 60px);
`;
const Logo = styled.img`
  width: 200px;
  height: 200px;
`;

const LoginDescription = styled.div`
  margin: 20px 0px;
  font-size: 16px;
  color: #9c9ba6;
  line-height: 30px;
  font-weight: 700;
`;
const LoginTitle = styled.div`
  font-size: 40px;
  font-weight: 900;
  color: #8478ff;
  margin-bottom: 30px;
`;
const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 300px;
  width: 100%;
`;
const loginFields = [
  {
    name: "username",
    label: "아이디",
    type: "text",
    placeholder: "이메일을 입력하세요",
    required: true,
  },
  {
    name: "password",
    label: "비밀번호",
    type: "password",
    placeholder: "비밀번호를 입력하세요",
    required: true,
  },
];

const Login = () => {
  const handleLogin = async (credentials) => {
    const { username, password } = credentials;
    setError("");
    setSuccess("");
    setLoading(true);
    try {
      const formData = {
        username: username,
        password: password,
      };
      console.log(formData);
      const response = await loginUser(formData);
      setSuccess("로그인 성공");
      setFormKey((prevKey) => prevKey + 1);
      navigate("/view-more-page");
      localStorage.setItem("nickname", "문어체");
      localStorage.setItem("isLoggedIn", true);
    } catch (error) {
      setError(error.message || "로그인 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  const [formKey, setFormKey] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();
  return (
    <MobileLayout>
      <LoginContainer>
        <Logo src={logo} />
        <LoginDescription>
          서울 곳곳의 문화행사를 <br /> 한눈에 모아주는 플랫폼
        </LoginDescription>
        <LoginTitle>Seoul Moa</LoginTitle>
        <FormContainer>
          <AuthForm
            key={formKey}
            fields={loginFields}
            submitText="로그인"
            onSubmit={handleLogin}
          />
        </FormContainer>
        <Button
          fullWidth
          variant="text"
          onClick={() => navigate("/registration-page")}
        >
          회원가입
        </Button>
      </LoginContainer>
    </MobileLayout>
  );
};

export default Login;
