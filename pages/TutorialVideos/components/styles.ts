import styled from 'styled-components';

export const ModalLayout = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: max-content;

  @media screen and (max-width: 700px) {
    width: 100%;
  }

  .modalLayoutWrapper {
    max-height: 90vh;
    background: linear-gradient(180deg, #c1daff 0%, #ffffff 29.69%);
    box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.25);
    border-radius: 10px;
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

export const MainLayout = styled.div`
  padding: 24px;
  display: flex;
  flex-direction: column;
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

export const TutorialDoubleVideoLayout = styled.div`
  text-align: left;
  border: 1px solid #bcbcbc;
  padding: 12px;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  gap: 4px;
  height: 100%;

  p {
    font-size: 10px;
  }

  .title {
    display: flex;
    align-items: center;
    gap: 4px;

    img {
      height: 22px;
    }

    p {
      font-size: 14px;
      font-weight: 600;
    }
  }
`;

export const TutorialVideoLayout = styled.div`
  text-align: left;
  border: 1px solid #bcbcbc;
  padding: 12px;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  gap: 4px;
  height: 100%;
  position: relative;

  .overlay {
    position: absolute;
    display: flex;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;

    .leftHalf {
      width: 50%;
      height: 100%;
    }

    .rightHalf {
      width: 50%;
      height: 100%;
    }
  }

  p {
    font-size: 10px;
  }

  .title {
    display: flex;
    align-items: center;
    gap: 4px;

    img {
      height: 22px;
    }

    p {
      font-size: 14px;
      font-weight: 600;
    }
  }
`;

export const FinalButtons = styled.div`
  height: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;

  .finalButtonsWrapper {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;

    p {
      font-size: 12px;
      font-weight: 500;
    }

    .finalButtonsItem {
      display: flex;
      align-items: center;
      gap: 4px;
    }
  }
`;

export const WatchButton = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  height: 100%;

  p {
    color: #008ac1;
    font-size: 12px;
    border-bottom: 1px dotted #008ac1;
  }
`;

export const ViewedButton = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  height: 100%;
  gap: 2px;

  p {
    font-size: 12px;
    color: #00a763;
  }

  svg {
    font-size: 14px;
    fill: #00a763;
  }
`;
