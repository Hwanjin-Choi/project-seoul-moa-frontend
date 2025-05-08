import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";

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
  height: 100%;
  padding: 20px;
`;
const Logo = styled.img`
  width: 200px;
  height: 200px;
  @media (max-width: 768px) {
    width: 100px;
    height: 100px;
  }
`;

const LoginDescription = styled.div`
  margin: 20px 0px;
  font-size: 16px;
  color: #9c9ba6;
  line-height: 1.5;
  font-weight: 700;
  text-align: center;
`;
const LoginTitle = styled.div`
  font-size: 40px;
  font-weight: 900;
  color: #8478ff;
  margin-bottom: 30px;
  @media (max-width: 768px) {
    font-size: 32px;
  }
`;
const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 350px;
  width: 100%;
`;
const ErrorMessage = styled.div`
  color: red;
  margin: 10px 0px;
  font-size: 0.9em;
  text-align: center;
`;
const SuccessMessage = styled.div`
  color: green;
  margin: 10px 0px;
  font-size: 0.9em;
  text-align: center;
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
  const [formKey, setFormKey] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

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
      console.log("로그인 시도 정보:", formData);

      const response = await loginUser(formData);
      console.log("로그인 응답:", response);

      setSuccess("로그인 성공!");
      setFormKey((prevKey) => prevKey + 1);

      // 로그인 성공 후 리디렉션 로직
      let redirectUrlFromQuery = null;
      const params = new URLSearchParams(location.search);
      redirectUrlFromQuery = params.get("redirectUrl");
      console.log("URL 쿼리에서 가져온 redirectUrl:", redirectUrlFromQuery);

      let finalRedirectUrl = null;

      if (redirectUrlFromQuery) {
        finalRedirectUrl = decodeURIComponent(redirectUrlFromQuery);
        console.log("쿼리에서 초기에 디코딩된 redirectUrl:", finalRedirectUrl);

        const loginPagePathPattern = "/login-page";
        const redirectUrlParamString = "redirectUrl=";
        let searchStringForExtraction = finalRedirectUrl;

        if (
          (searchStringForExtraction.startsWith(loginPagePathPattern) ||
            searchStringForExtraction.startsWith("/login")) &&
          searchStringForExtraction.includes(redirectUrlParamString)
        ) {
          const parts = searchStringForExtraction.split(redirectUrlParamString);
          if (parts.length > 1) {
            let extractedPath = parts[1].split("&")[0];
            if (extractedPath.startsWith("/")) {
              console.log(
                "중첩된 redirectUrl 감지, 실제 경로 추출 시도:",
                extractedPath
              );
              finalRedirectUrl = extractedPath; // 정제된 URL로 업데이트
            } else {
              console.warn(
                "중첩된 redirectUrl에서 추출된 경로가 유효하지 않음 ('/'로 시작 안함):",
                extractedPath
              );
            }
          }
        }
      } else if (location.pathname.includes("redirectUrl=")) {
        const pathParts = location.pathname.split("redirectUrl=");
        if (pathParts.length > 1) {
          const potentialUrl = pathParts[1].split("&")[0];
          if (potentialUrl) {
            finalRedirectUrl = decodeURIComponent(potentialUrl);
            console.log(
              "경로(pathname)에서 redirectUrl 추출 및 디코딩:",
              finalRedirectUrl
            );
          }
        }
      }

      console.log("리디렉션 URL (정제 후 최종):", finalRedirectUrl);

      if (finalRedirectUrl) {
        try {
          if (
            finalRedirectUrl.startsWith("/") &&
            !finalRedirectUrl.startsWith("/login-page") &&
            !finalRedirectUrl.startsWith("/login")
          ) {
            navigate(finalRedirectUrl, { replace: true });
          } else {
            console.warn(
              "유효하지 않거나 안전하지 않은 redirectUrl 형식 (최종):",
              finalRedirectUrl,
              "기본 페이지로 이동합니다."
            );
            navigate("/view-more-page", { replace: true });
          }
        } catch (e) {
          console.error(
            "redirectUrl 처리 중 예외 발생:",
            e,
            "기본 페이지로 이동합니다."
          );
          navigate("/view-more-page", { replace: true });
        }
      } else {
        console.log("redirectUrl을 결정할 수 없음, 기본 페이지로 이동합니다.");
        navigate("/view-more-page", { replace: true });
      }
    } catch (err) {
      console.error("로그인 중 오류 발생:", err);
      setError(
        err.response?.data?.message ||
          err.message ||
          "로그인 중 오류가 발생했습니다."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <MobileLayout>
      <LoginContainer>
        <Logo src={logo} alt="Seoul Moa Logo" />
        <LoginDescription>
          서울 곳곳의 문화행사를 <br /> 한눈에 모아주는 플랫폼
        </LoginDescription>
        <LoginTitle>Seoul Moa</LoginTitle>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        {success && <SuccessMessage>{success}</SuccessMessage>}
        <FormContainer>
          <AuthForm
            key={formKey}
            fields={loginFields}
            submitText="로그인"
            onSubmit={handleLogin}
            isLoading={loading}
          />
        </FormContainer>
        <Button
          fullWidth
          variant="text"
          onClick={() => navigate("/registration-page")}
          style={{ marginTop: "20px" }}
          disabled={loading}
        >
          회원가입
        </Button>
      </LoginContainer>
    </MobileLayout>
  );
};

export default Login;
