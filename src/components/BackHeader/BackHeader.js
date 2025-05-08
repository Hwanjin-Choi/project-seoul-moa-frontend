// BackHeader.js
import React, { useState, useEffect, useRef } from "react";
import styled, { css } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { useLocation, useNavigate } from "react-router-dom";
import logo from "../../assets/seoulmoa.svg";
import { Color } from "../../styles/colorsheet";
import LogoutModal from "./LogoutModal";
import { logoutUser } from "../../api/logout";

// --- 기존 스타일 컴포넌트 ---
const Logo = styled.img`
  width: 45px;
  height: 45px;
  cursor: pointer;
  /* 로고와 닉네임/버튼 간 간격을 위해 왼쪽 마진 제거 또는 조정 가능 */
  /* margin-left: 10px; */
`;

const HeaderContent = styled.div`
  display: flex;
  align-items: center;
`;

const BackHeaderButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  transition: opacity 0.2s ease-in-out;
  &:active {
    opacity: 0.7;
  }
  /* margin-left: 10px; */ /* 좌우 정렬을 위해 제거 또는 조정 */
  padding: 10px; // 버튼 영역 확보
  display: flex;
  align-items: center;
`;

const Icon = styled(FontAwesomeIcon)`
  color: #91909c;
  width: 25px;
  height: 25px;
  @media (max-width: 768px) {
    width: 20px;
    height: 20px;
  }
`;

// --- 신규 스타일 컴포넌트 ---
const LoginStatusWrapper = styled.div`
  position: relative; // 드롭다운 위치 기준점
  margin-right: 15px; // 오른쪽 여백
`;

const NicknameDisplay = styled.span`
  cursor: pointer;
  /* font-weight: bold; */
  color: #333; // 적절한 색상 지정
  padding: 5px;
  transition: color 0.2s ease; // 부드러운 색상 전환 효과

  strong {
    margin-right: 2px;
  }
  &:hover {
    color: ${Color.MC1}; /* 호버 시 테마 색상 사용 (예시) */
    /* 호버 시 굵은 글씨 부분의 색상도 변경하려면 아래처럼 추가 */
    strong {
      /* color: ${Color.MC1}; */
    }
  }
`;

const LoginButton = styled.button`
  cursor: pointer;
  background: linear-gradient(
    135deg,
    ${Color.MC1} 0%,
    ${Color.MC2} 100%
  ); /* 그라데이션 배경 적용 */
  color: #ffffff; /* 흰색 텍스트로 가독성 확보 */
  border: none;
  padding: 10px 20px; /* 패딩을 조금 더 넉넉하게 */
  border-radius: 20px; /* 둥근 모서리로 부드러운 느낌 */
  font-weight: 600; /* 글꼴 두께 강조 */
  font-size: 14px;
  line-height: 1; /* 텍스트 높이 일관성 유지 */
  transition: all 0.3s ease; /* 부드러운 전환 효과 */
  box-shadow: 0 3px 6px rgba(132, 120, 255, 0.3); /* 테마 색상 기반 그림자 */
  white-space: nowrap; /* 버튼 텍스트 줄바꿈 방지 */

  &:hover {
    background: linear-gradient(
      135deg,
      ${Color.MC2} 0%,
      ${Color.MC1} 100%
    ); /* 호버 시 그라데이션 반전 */
    transform: translateY(-2px); /* 살짝 떠오르는 효과 */
    box-shadow: 0 5px 10px rgba(132, 120, 255, 0.5); /* 호버 시 그림자 강조 */
  }

  &:active {
    /* 클릭 시 효과 */
    transform: translateY(0px);
    box-shadow: 0 2px 4px rgba(132, 120, 255, 0.3); /* 그림자 원래대로 */
    background: linear-gradient(
      135deg,
      ${Color.MC1} 0%,
      #7165e6 100%
    ); /* 클릭 시 약간 더 어둡게 (MC1 기반) */
  }
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: 100%; // 닉네임 바로 아래
  right: 0; // 오른쪽 정렬
  background-color: white;
  border: 1px solid #eee;
  border-radius: 4px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  z-index: 110; // 다른 요소 위에 표시
  min-width: 100px; // 최소 너비
  margin-top: 5px; // 닉네임과의 간격
`;
const LogoutIcon = styled(FontAwesomeIcon)`
  margin-right: 8px; /* 아이콘과 텍스트 사이 간격 */
  color: #6c757d; /* 아이콘 색상 (회색 계열) */
  width: 16px; /* 아이콘 크기 조정 */
  height: 16px;
`;

const DropdownItem = styled.button`
  display: flex; /* 아이콘과 텍스트를 가로 정렬 */
  align-items: center; /* 수직 중앙 정렬 */
  width: 100%;
  background: none;
  border: none;
  text-align: left; /* 텍스트 왼쪽 정렬 */
  padding: 12px 15px; /* 패딩 조정으로 버튼 영역 확보 및 보기 좋게 */
  cursor: pointer;
  color: #343a40; /* 텍스트 색상을 약간 더 진하게 */
  font-size: 14px; /* 폰트 크기 명확하게 */
  white-space: nowrap; /* 텍스트가 줄바꿈되지 않도록 */

  &:hover {
    background-color: #f8f9fa; /* 호버 시 부드러운 배경색 변경 */
    color: #212529; /* 호버 시 텍스트 색상 강조 */
    ${LogoutIcon} {
      /* 호버 시 아이콘 색상도 함께 변경 */
      color: #212529;
    }
  }
`;

// --- BackHeaderContainer 수정 ---
const BackHeaderContainer = styled.div`
  z-index: 100;
  width: 100%;
  position: sticky;
  top: 0;
  display: flex; // Flexbox 활성화
  align-items: center; // 수직 중앙 정렬
  justify-content: space-between; // 양쪽 끝 정렬

  ${({ isDefaultPage }) =>
    isDefaultPage
      ? css`
          background-color: #fff;
          padding: 10px 15px; // 패딩 조정 (좌우 추가)
          border-bottom: 1px solid #eee;
          min-height: 61px; /* 로고 높이 고려한 최소 높이 */
        `
      : css`
          background: transparent;
          padding: 10px 15px; // 패딩 조정 (좌우 추가)
          min-height: 45px; /* 뒤로가기 버튼 높이 고려 */
        `}

  /* 반응형 최대 너비 설정 (공통 적용) */
  @media (min-width: 768px) {
    max-width: 720px;
    margin: 0 auto;
    padding-left: 15px; // 최대 너비일 때 좌우 패딩 유지
    padding-right: 15px;
  }

  @media (min-width: 1024px) {
    max-width: 960px;
    margin: 0 auto;
    padding-left: 15px;
    padding-right: 15px;
  }
`;

// --- BackHeader 컴포넌트 ---
const BackHeader = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isDefaultPage = location.pathname === "/";

  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true" ? true : false
  );
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [nickname] = useState(localStorage.getItem("nickname") || "");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const openLogoutModal = () => {
    setIsLogoutModalOpen(true);
    // 드롭다운은 닫아주는 것이 좋습니다.
    setIsDropdownOpen(false);
  };

  const closeLogoutModal = () => {
    setIsLogoutModalOpen(false);
  };

  // --- 로그아웃 핸들러 ---
  const handleLogout = async () => {
    const res = await logoutUser();
    console.log(res);
    if (res && res.status === "SUCCESS") {
      closeLogoutModal(); // 모달 닫기
      setIsLoggedIn(false);
      navigate("/"); // 홈으로 이동
    } else {
      console.log("api client handling");
    }
  };

  // --- 로그인 버튼 핸들러 ---
  const handleLogin = () => {
    navigate("/login-page");
  };

  // --- 드롭다운 외부 클릭 시 닫기 ---
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <BackHeaderContainer isDefaultPage={isDefaultPage}>
      {isDefaultPage ? (
        <HeaderContent onClick={() => navigate("/")}>
          <Logo src={logo} alt="logo" />
        </HeaderContent>
      ) : (
        <BackHeaderButton onClick={() => navigate(-1)}>
          <Icon icon={faChevronLeft} />
        </BackHeaderButton>
      )}

      <LoginStatusWrapper ref={dropdownRef}>
        {isLoggedIn ? (
          <>
            <NicknameDisplay onClick={toggleDropdown}>
              <strong>{nickname}</strong> 님
            </NicknameDisplay>
            {isDropdownOpen && (
              <DropdownMenu>
                <DropdownItem onClick={openLogoutModal}>
                  <LogoutIcon icon={faRightFromBracket} />
                  로그아웃
                </DropdownItem>
              </DropdownMenu>
            )}
          </>
        ) : (
          <LoginButton onClick={handleLogin}>로그인</LoginButton>
        )}
      </LoginStatusWrapper>

      <LogoutModal
        isOpen={isLogoutModalOpen}
        onClose={closeLogoutModal}
        onConfirm={handleLogout}
        message="정말로 로그아웃 하시겠습니까?"
      />
    </BackHeaderContainer>
  );
};

export default BackHeader;
