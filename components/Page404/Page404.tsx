import React from 'react';
import { Divider, Stack, SxProps, Theme, Typography } from '@mui/material';
import { CSSDefault } from '@/safira-app/styles/defaultStyles';

// Icons
import Icon404 from './icons/Icon404';
import IconBackground from './icons/IconBackground2';

interface Page404Props {
  goToInitialPage: () => void;
  goBack: () => void;
  sx?: SxProps<Theme>;
}

const Page404: React.FC<React.PropsWithChildren<Page404Props>> = ({ goToInitialPage, goBack, sx }) => {
  return (
    <CSSDefault
      component={Stack}
      width="100%"
      height="100%"
      padding={2}
      justifyContent="center"
      alignItems="center"
      gap={1}
      sx={sx}
    >
      <Stack
        alignItems="center"
        gap={2}
        sx={{
          '@media (max-width: 600px)': {
            h1: {
              fontSize: '20px !important',
            },
            p: {
              fontSize: '14px !important',
            },
          },
        }}
      >
        <Typography variant="h1" color="#097DB7" fontSize={30} marginBottom={1}>
          Ops! Não conseguimos encontrar o que está procurando.
        </Typography>
      </Stack>
      <Stack
        position="relative"
        width="100%"
        justifyContent="center"
        alignItems="center"
        sx={{
          '@media (max-width: 600px)': {
            maxHeight: 300,
          },
        }}
      >
        <Icon404
          position="absolute"
          top="50%"
          left="50%"
          zIndex={2}
          component={Stack}
          justifyContent="center"
          alignItems="center"
          width="100%"
          sx={{
            transform: 'translate(-50%, -50%)',
            svg: {
              width: '90%',
              maxWidth: 500,
              maxHeight: 300,
              aspectRatio: 1,
            },
          }}
        />
        <IconBackground
          component={Stack}
          justifyContent="center"
          alignItems="center"
          width="100%"
          sx={{
            maxHeight: '100%',
            svg: {
              width: '100%',
              maxWidth: 500,
              maxHeight: 300,
              aspectRatio: 1,
            },
          }}
        />
      </Stack>
      <Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
        gap={1}
        marginTop={2}
        sx={{
          span: {
            cursor: 'pointer',
            fontSize: 12,
            ':hover': {
              textDecoration: 'underline',
            },
          },
        }}
      >
        <Typography color="#0084C6" fontWeight={600} fontSize={16} component="span" onClick={goBack}>
          Página Anterior
        </Typography>
        <Divider sx={{ height: 16, border: '1px solid #0084C6' }} />
        <Typography color="#0084C6" fontWeight={600} fontSize={16} component="span" onClick={goToInitialPage}>
          Ir para a página inicial
        </Typography>
      </Stack>
    </CSSDefault>
  );
};

export default Page404;
