import styled from "styled-components";

export const StyledWrapper = styled.div`
  .outsideApp {
    display: flex;
    justify-content: center;
    background: linear-gradient(to right, rgb(238 240 238), #001529);
    align-items: center;
    background-color: rgba(101, 108, 133, 0.8);
    height: 100vh;
    width: 100vw;
  }
  .outsideApp::before {
    width: 100%;
    height: 100%;
    position: absolute;
    content: "";
    left: 0;
    top: -10px;
    background-image: url(https://qualitycuredmain.s3.ap-south-1.amazonaws.com/Public/background.png);
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
  }
`;
