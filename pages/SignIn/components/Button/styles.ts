import styled from 'styled-components';

export const Container = styled.button<{ disabled: boolean }>`
  background: ${props => (props.disabled ? '#ccc' : '#00568b')};
  height: 56px;
  border-radius: 10px;
  border: 0;
  padding: 0 16px;
  color: #fff;
  width: 100%;
  font-weight: 500;
  margin-top: 16px;
  transition: background-color 0.2s;
  cursor: pointer;

  &:hover {
    ${props => !props.disabled && `background: #003d66`}; /* Static color replacing shade */
  }
`;

export const LoaderContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
