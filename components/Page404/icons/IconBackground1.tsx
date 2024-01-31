import React from 'react';
import { FunctionComponent } from 'react';
import { Box, BoxProps } from '@mui/material';

const IconBackground1: FunctionComponent<React.PropsWithChildren<BoxProps>> = props => (
  <Box {...props}>
    <svg width="1105" height="636" viewBox="0 0 1105 636" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M86.6937 482.958C80.0563 496.235 72.497 538.28 69.547 557.642C55.8297 739.097 136.474 730.246 178.511 703.138C216.861 645.972 312.919 554.655 390.355 646.71C487.15 761.779 1275.9 834.804 1071.24 646.71C866.589 458.616 952.322 360.144 1018.14 237.33C1083.96 114.516 937.941 208.563 903.095 116.729C875.218 43.2615 783.068 8.29825 740.478 0C290.794 158.773 409.161 -51.4491 158.046 41.4912C-93.0694 134.432 21.4258 347.42 57.3785 390.018C93.3311 432.615 94.9904 466.361 86.6937 482.958Z"
        fill="#F2F2F2"
      />
    </svg>
  </Box>
);

export default IconBackground1;
