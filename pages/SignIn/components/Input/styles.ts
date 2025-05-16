import styled, { css } from 'styled-components';

interface ContainerProps {
  isFocused: boolean;
  isFilled: boolean;
  isErrored: boolean;
  fieldType?: 'input' | 'select';
}

export const Container = styled.div<ContainerProps>`
  background: #fff;
  border-radius: 10px;
  border: 2px solid #c4c4c4;
  padding: ${({ fieldType }) => (fieldType ? (fieldType === 'select' ? `0px` : `16px`) : `16px`)};
  width: 100%;
  color: #666360;

  display: flex;
  align-items: center;

  & + div {
    margin-top: 8px;
  }

  ${props =>
    props.isErrored &&
    css`
      border-color: #c53030;
    `}

  ${props =>
    props.isFocused &&
    css`
      color: #00568b;
      border-color: #00568b;
    `}

  ${props =>
    props.isFilled &&
    css`
      color: #00568b;
    `}

  input {
    flex: 1;
    background: transparent;
    border: 0;

    &::placeholder {
      color: #666360;
    }
    &::-ms-reveal,
    &::-ms-clear {
      display: none;
    }
  }

  input[type='date']::-webkit-calendar-picker-indicator {
    display: none;
  }

  select {
    flex: 1;
    background: transparent;
    border: 0;
    padding: 16px;

    &::placeholder {
      color: #666360;
    }
    &::-ms-reveal,
    &::-ms-clear {
      display: none;
    }
  }

  svg {
    margin-right: 16px;
  }

  .svg-button-container {
    color: ${props => (props.isFocused ? '#00568b' : '#666360')};
  }
`;
