import React from "react";
import styled from "styled-components";
import Container from "../../components/Layout/Container";
import Card from "../../components/Card/Card";
import SimpleCard from "../../components/SimpleCard/SimpleCard";
import MobileLayout from "../../components/Layout/MobileLayout";
import logo from "../../assets/seoulmoa.svg";
import Ribbon from "../../components/Ribbon/Ribbon";
import demoImage from "../../assets/Test.jpeg";
import Navigation from "../../components/Navigation/Navigation";
const Header = styled.header`
  background-color: #fff;
  padding: 16px 0;
  border-bottom: 1px solid #eee;
  position: sticky;
  top: 0;
  z-index: 100;
`;

const HeaderContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.img`
  width: 30px;
  height: 30px;
`;

const SearchIcon = styled.div`
  font-size: 20px;
  color: #333;
  cursor: pointer;
`;

const MainContent = styled.main`
  padding: 16px 0;

  overflow-y: auto;
  overflow-x: hidden;
`;

const SectionTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

const Title = styled.h2`
  font-size: 18px;
  font-weight: 600;
  color: #333;
  margin: 0;
`;

const ViewMore = styled.span`
  color: #666;
  font-size: 13px;
  cursor: pointer;
`;

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
  margin-bottom: 24px;
`;

const LocationInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 16px;
  color: #333;
  font-size: 14px;
`;

const DateRange = styled.div`
  color: #666;
  font-size: 13px;
`;

const DemoPage = () => {
  const dummyCardData = {
    image: demoImage,
    title: "2024 Seoul Art Exhibition",
    period: "2024.01.01 - 2024.12.31",
    address: "Seoul Museum of Art",
    dDay: 5,
    categories: ["Art", "Exhibition"],
    location: "Gangnam",
    count: "23",
  };

  const simpleCardData = {
    image: demoImage,
    title: "[서초문화재단] 2025 클래식악기 탐구생활 - 5월 프로그램 신청자 모집",
    period: "2025-05-10 ~ 2025-05-31",
    address: "서리풀청년아트센터 및 예술의전당 인근 악기공방",
    dDay: "Day",
    category: "category",
    location: "location",
    count: "count",
  };

  return (
    <MobileLayout>
      <Header>
        <Container>
          <HeaderContent>
            <Logo src={logo} alt="logo" />
          </HeaderContent>
        </Container>
      </Header>

      <MainContent>
        <Container>
          <LocationInfo>
            <span>Seoul</span>
            <span>|</span>
            <DateRange>2024.01.01 - 2024.12.31</DateRange>
          </LocationInfo>

          <SectionTitle>
            <Title>다가오는 나의 일정</Title>
            <ViewMore>더보기</ViewMore>
          </SectionTitle>
          <SimpleCard {...simpleCardData} style={{ marginBottom: "24px" }} />

          <SectionTitle>
            <Title>HOT 문화행사</Title>
            <ViewMore>더보기</ViewMore>
          </SectionTitle>

          <Ribbon text="HOT" />
          <CardGrid>
            {[...Array(4)].map((_, index) => (
              <SimpleCard key={index} {...simpleCardData} />
            ))}
          </CardGrid>
        </Container>
      </MainContent>
      <Navigation />
    </MobileLayout>
  );
};

export default DemoPage;
