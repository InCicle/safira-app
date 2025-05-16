import React, { ButtonHTMLAttributes } from 'react';

import Loader from '../Loader';
import { Container, LoaderContainer } from './styles';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  disabled?: boolean;
}

const Button: React.FC<React.PropsWithChildren<Props>> = ({ children, loading = false, disabled = false, ...rest }) => {
  return (
    <Container disabled={disabled} type="button" {...rest}>
      {loading ? (
        <LoaderContainer>
          <Loader size="20" />
        </LoaderContainer>
      ) : (
        children
      )}
    </Container>
  );
};

export default Button;
