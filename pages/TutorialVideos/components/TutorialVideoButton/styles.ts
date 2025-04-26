import styled from 'styled-components';

export const Layout = styled.div`
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
