import React, { useImperativeHandle, useState } from 'react';
import { Box, Divider, IconButton, Menu, Stack, Typography, useTheme } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useHeaderProvider } from 'safira-app/contexts/HeaderContext';
import {
  incicleMenuModules,
  incicleCollaboratorsMenuModules,
  incicleManagerMenuModules,
} from 'safira-app/utils/modules';
import ModuleMenuItem from './ModuleMenuItem';
import { usePermissions } from 'safira-app/contexts/Permissions';

export type ModulesMenuRef = {
  openDropdown: (ev: any) => void;
  closeDropdown: (ev: any) => void;
};

type Props = {
  activeManagerMenu: boolean;
};

const breakpointValue = 700;

const ModulesMenu: React.ForwardRefRenderFunction<ModulesMenuRef, Props> = (props, ref) => {
  const { user } = useHeaderProvider();
  const { breakpoints } = useTheme();
  // const { me: profiles } = useContext(ProfileContext);
  const { activeManagerMenu } = props;
  const { checkPermission, companyId } = usePermissions();
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  function openDropdown(ev: any) {
    setAnchorEl(ev.currentTarget);
  }

  function closeDropdown() {
    setAnchorEl(null);
  }

  useImperativeHandle(ref, () => {
    return {
      openDropdown,
      closeDropdown,
    };
  });

  const filteredCollaboratorsModules = incicleCollaboratorsMenuModules
    .filter(item => item.accountTypes.includes(user.type))
    .filter(moduleItem => {
      if (!moduleItem.permission) return true;
      return checkPermission([moduleItem.permission]);
    });

  return (
    <Menu
      open={Boolean(anchorEl)}
      onClose={closeDropdown}
      anchorEl={anchorEl}
      PaperProps={{
        sx: {
          maxWidth: 680,
          scrollbarWidth: 'thin',
          '&::-webkit-scrollbar': {
            width: '10px',
            height: '10px',
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: '#a5a5a5',
            borderRadius: '7px',
            boxShadow: 'none',
          },

          '&::-webkit-scrollbar-track': {
            backgroundColor: '#d8d9db',
            borderRadius: '7px',
            boxShadow: 'none',
          },
        },
      }}
    >
      <Stack
        position="relative"
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        width="100%"
        padding="0 16px"
        gap={2}
      >
        <Box
          sx={{
            width: '100%',
            marginTop: '12px',
            marginBottom: '16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
          }}
        >
          <Typography
            sx={{
              color: '#008AC1',
              fontSize: '22px',
              fontWeight: 'bold',
            }}
          >
            Módulos
          </Typography>
        </Box>
        <IconButton sx={{ marginBottom: '8px' }} onClick={closeDropdown}>
          <CloseIcon />
        </IconButton>
      </Stack>
      <Divider />
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          padding: '8px 8px 0',
          [breakpoints.down(breakpointValue)]: {
            display: 'flex',
            flexDirection: 'column',
          },
        }}
      >
        {incicleMenuModules
          .filter(item => item.accountTypes.includes(user.type))
          .filter(itemModule => {
            if (!itemModule.enableOnlyTo) return true;
            if (itemModule.enableOnlyTo.includes(companyId)) return true;
            return false;
          })
          .filter(moduleItem => {
            if (!moduleItem.permission) return true;
            return checkPermission([moduleItem.permission]);
          })
          .map((moduleItem, index) => (
            <ModuleMenuItem key={index.toString()} module={moduleItem} />
          ))}
      </Box>

      {filteredCollaboratorsModules.length > 0 || activeManagerMenu ? (
        <>
          <Divider />
          <Box
            sx={{
              width: '100%',
              marginTop: '12px',
              marginBottom: '16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
            }}
          >
            <Typography
              sx={{
                color: '#008AC1',
                fontSize: '22px',
                fontWeight: 'bold',
              }}
            >
              Company
            </Typography>
          </Box>
          <Divider />
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              padding: '8px 8px 0',
              [breakpoints.down(breakpointValue)]: {
                display: 'flex',
                flexDirection: 'column',
              },
            }}
          >
            {filteredCollaboratorsModules.map((moduleItem, index) => (
              <ModuleMenuItem key={index.toString()} module={moduleItem} />
            ))}

            {activeManagerMenu ? <ModuleMenuItem module={incicleManagerMenuModules} /> : null}
          </Box>
        </>
      ) : null}
    </Menu>
  );
};

export default React.forwardRef(ModulesMenu);
