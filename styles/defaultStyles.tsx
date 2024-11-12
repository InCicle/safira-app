import { Box, BoxProps, styled } from '@mui/material';

export const CSSDefault = styled(Box)<BoxProps & { component: React.ElementType }>`
  margin: 0;
  padding: 0;
  box-sizing: border-box;

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
`;
