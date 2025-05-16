import styled from 'styled-components';

export const Loader = styled.div<{ size: string }>`
  border: 4px solid #f3f3f3;
  border-radius: 50%;
  border-top: 5px solid #212121;
  width: ${props => props?.size || '30px'};
  height: ${props => props?.size || '30px'};
  -webkit-animation: spin 2s linear infinite;
  animation: spin 2s linear infinite;

  @-webkit-keyframes spin {
    0% {
      -webkit-transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
    }
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
