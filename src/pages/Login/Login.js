import React from "react";
import styled from "styled-components";
import Input from "../../components/Input/Input";
import logo from "../../assets/seoulmoa.svg";
import MobileLayout from "../../components/Layout/MobileLayout";
import Button from "../../components/Button/Button";
import AuthForm from "../../components/AuthForm/AuthForm";
import CategoryButton from "../../components/CategoryButton/CategoryButton";
import { useNavigate } from "react-router-dom";
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

const handleLogin = async (credentials) => {
  const { username, password } = credentials;

  const url = "";

  try {
    console.log(credentials);
    /* if (response.status === 200) {
    } */
  } catch (error) {}
};

const Login = () => {
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
