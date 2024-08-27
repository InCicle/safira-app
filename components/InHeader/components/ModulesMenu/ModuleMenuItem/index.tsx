import { Box, Icon, IconButton, Stack, Tooltip, Typography, useTheme, Link as MUILink } from '@mui/material';
import { MenuModulesType } from 'safira-app/utils/modules';
import { useAuth } from 'safira-app/hooks/useAuth';
import React from 'react';

interface ModuleMenuItemProps {
  module: MenuModulesType;
}

const ModuleMenuItem: React.FC<ModuleMenuItemProps> = ({ module }) => {
  const { user } = useAuth();
  const { breakpoints } = useTheme();

  const breakpointValue = 700;

  return (
    <Tooltip
      data-cy="Tooltip"
      key={module.slug}
      title={!module.url ? 'Módulo disponível em breve' : ''}
      placement="top"
      arrow
      PopperProps={{
        sx: {
          '*': {
            fontSize: '11px !important',
          },
          bottom: '-20px !important',
        },
      }}
    >
      <IconButton
        data-cy={`module-${module.slug}`}
        key={module.title}
        sx={{
          width: '49%',
          height: 'max-content',
          borderRadius: '0 !important',
          fontSize: '18px !important',
          [breakpoints.down(breakpointValue)]: {
            width: '100%',
          },
        }}
      >
        <MUILink
          href={module.url || ''}
          underline="none"
          sx={{
            width: '100%',
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'center',
            gap: '5px',
            pointerEvents: !module.url ? 'none' : '',
          }}
        >
          <Stack justifyContent="center" alignItems="center" sx={{ minWidth: 60, minHeight: 60 }}>
            <Icon
              component={Stack}
              direction="row"
              justifyContent="center"
              alignItems="center"
              padding={1}
              width={`${module.iconSize}px !important`}
              height={`${module.iconSize}px !important`}
            >
              <img src={module.icon} alt={module.title} style={{ width: '100%', height: 'auto' }} />
            </Icon>
          </Stack>
          <Box
            sx={{
              textAlign: 'left',
            }}
          >
            <Typography
              sx={{
                color: !module.url ? '#848484' : '#008AC1',
                fontWeight: 'bold',
                fontSize: '16px',
              }}
            >
              {module.title}
            </Typography>
            <Typography
              sx={{
                color: !module.url ? '#848484' : '#535353',
                fontSize: '14px',
                lineHeight: '16px',
              }}
            >
              {user?.type && module.description ? module?.description[user?.type] : ''}
            </Typography>
          </Box>
        </MUILink>
      </IconButton>
    </Tooltip>
  );
};

export default ModuleMenuItem;
