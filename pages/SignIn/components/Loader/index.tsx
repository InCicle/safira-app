import React from 'react';

import { Loader as StyledLoader } from './styles';

interface Props {
  size?: string;
}

const Loader: React.FC<React.PropsWithChildren<Props>> = ({ size = '30' }) => {
  return <StyledLoader size={size} />;
};

export default Loader;
