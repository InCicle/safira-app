import styled, { keyframes } from 'styled-components';

import signInBackgroundImg from '@/safira-app/assets/login.jpg';

export const Container = styled.div`
  height: 100vh;
  display: flex;
  align-items: stretch;
`;

export const Content = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 8px;
`;

interface BackgroundProps {
  flexShrink: number;
}

export const Background = styled.div<BackgroundProps>`
  flex-shrink: ${({ flexShrink }) => flexShrink};
  width: 100%;
  background: url(${signInBackgroundImg}) no-repeat center;
  background-size: cover;

  @media screen and (max-width: 830px) {
    display: none;
  }
`;

const appearFromLeft = keyframes`
  form {
    opacity: 0;
    transform: translateX(-50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
  max-width: 1280px;
  margin: 0 auto;
  height: 100%;
  box-sizing: border-box;
`;

export const GridItem = styled.div`
  box-sizing: border-box;
`;

export const GridRow = styled.div`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 16px;
  box-sizing: border-box;
`;

interface ColProps {
  children: React.ReactNode;
  xs?: number;
  sm?: number;
  md?: number;
  lg?: number;
}

export const GridCol = styled(GridItem)<ColProps>`
  ${({ xs }) => xs && `grid-column: span ${xs};`}
  ${({ sm }) => sm && `@media (min-width: 600px) { grid-column: span ${sm}; }`}
  ${({ md }) => md && `@media (min-width: 960px) { grid-column: span ${md}; }`}
  ${({ lg }) => lg && `@media (min-width: 1280px) { grid-column: span ${lg}; }`}
  box-sizing: border-box;
`;

interface AnimationContainerProps {
  width?: number;
}

export const AnimationContainer = styled.div<AnimationContainerProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: ${({ width }) => (width ? `${width}px` : `340px`)};
  min-width: 270px;

  animation: ${appearFromLeft} 1s;

  form {
    margin: 15px 0;
    width: 100%;
    text-align: center;

    img {
      margin: 0 auto;
      width: 180px;
      height: 180px;
      margin-bottom: 18px;
    }

    h2 {
      color: #00568b;
      margin-bottom: 18px;
    }

    h1 {
      margin-bottom: 10px;
    }

    a {
      color: #00568b;
      display: block;
      margin-top: 12px;
      margin-bottom: 18px;
      text-decoration: none;
      transition: color 0.2s;
      text-align: left;
      font-weight: 500;

      &:hover {
        color: #003d66;
      }
    }
  }

  > a {
    color: #00568b;
    display: block;
    text-decoration: none;
    transition: color 0.2s;

    display: flex;
    align-items: center;

    svg {
      margin-right: 16px;
    }

    &:hover {
      color: #003d66;
    }
  }
`;
