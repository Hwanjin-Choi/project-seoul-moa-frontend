import React from "react";
import styled from "styled-components";
import BackHeader from "../../components/BackHeader/BackHeader";
import MobileLayout from "../../components/Layout/MobileLayout";
const ViewMorePageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const ViewMorePage = () => {
  return (
    <ViewMorePageContainer>
      <MobileLayout>
        <BackHeader />
      </MobileLayout>
    </ViewMorePageContainer>
  );
};

export default ViewMorePage;
