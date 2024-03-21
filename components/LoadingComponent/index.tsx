import { FC } from 'react';
import { CircularProgress, Stack } from '@mui/material';

const LoadingComponent: FC<{ withoutProgress?: boolean }> = ({ withoutProgress }) => {
  return (
    <Stack
      sx={{
        position: 'absolute',
        zIndex: 1,
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {!withoutProgress && <CircularProgress color="secondary" />}
    </Stack>
  );
};

export default LoadingComponent;
