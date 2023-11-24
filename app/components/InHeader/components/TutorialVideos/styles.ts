import styled from "styled-components";

export const ModalLayout = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 16px;
  width: max-content;

  @media screen and (max-width: 700px) {
    width: 100%;
  }

  .modalLayoutWrapper {
    max-height: 90vh;
    background: linear-gradient(180deg, #c1daff 0%, #ffffff 29.69%);
    box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.25);
    border-radius: 10px;
    overflow-y: auto;
  }
`;

export const Logo = styled.div`
  display: flex;
  box-sizing: border-box;
  justify-content: center;
  align-items: center;
  padding-top: 32px;

  .tutorialLogoCircle {
    background-color: #ffffff;
    width: 110px;
    height: 110px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 120px;
    box-shadow: 0px 2.79701px 9.59px rgba(0, 0, 0, 0.12);

    img {
      height: 87px;
    }
  }
`;

export const Layout = styled.div`
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  text-align: center;

  .step7Title {
    max-width: 470px;
    margin: auto;
  }

  h3 {
    font-size: 18px;
    font-weight: 600;

    display: flex;
    justify-content: center;
    align-items: center;
    gap: 4px;
  }

  p {
    font-size: 16px;
    font-weight: 500;
  }

  .finalButton {
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;
  }
`;
