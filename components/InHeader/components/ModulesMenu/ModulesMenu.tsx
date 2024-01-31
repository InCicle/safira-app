import React, { useContext, useEffect, useImperativeHandle, useState } from 'react';
import { Box, Divider, IconButton, Menu, Stack, Typography, useTheme } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useHeaderProvider } from 'safira-app/contexts/HeaderContext';
import {
  incicleCollaboratorsModules,
  incicleManagerModule,
  incicleModules,
} from 'safira-app/components/InHeader/data/modules';
import { usePermissions } from 'contexts/Permissions';
import ModuleMenuItem from './ModuleMenuItem';
import { ProfileContext } from 'contexts/ProfileContext';

export type ModulesMenuRef = {
  openDropdown: (ev: any) => void;
  closeDropdown: (ev: any) => void;
};

type Props = {};

const breakpointValue = 700;

const ModulesMenu: React.ForwardRefRenderFunction<ModulesMenuRef, Props> = (props, ref) => {
  const { user } = useHeaderProvider();
  const { breakpoints } = useTheme();
  const { me: profiles } = useContext(ProfileContext);
  const { checkPermission, companyId } = usePermissions();
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [activeManagerPanel, setActiveManagerPanel] = useState<boolean>(false);

  useEffect(() => {
    if (user.type === 'COMPANY' || !profiles || !profiles.companies) return;

    const selectedCompany = profiles.companies.find(company => company.id === companyId);
    if (!selectedCompany) return;

    if (!!selectedCompany.is_manager_competence || checkPermission(['managers_vacations_list'])) {
      setActiveManagerPanel(true);
    }
  }, [profiles]);

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

  const filteredCollaboratorsModules = incicleCollaboratorsModules
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
        {incicleModules
          .filter(item => item.accountTypes.includes(user.type))
          .filter(moduleItem => {
            if (!moduleItem.permission) return true;
            return checkPermission([moduleItem.permission]);
          })
          .map((moduleItem, index) => (
            <ModuleMenuItem key={index.toString()} module={moduleItem} />
          ))}
      </Box>

      {filteredCollaboratorsModules.length > 0 || activeManagerPanel ? (
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

            {activeManagerPanel ? <ModuleMenuItem module={incicleManagerModule} /> : null}
          </Box>
        </>
      ) : null}
    </Menu>
  );
};

export default React.forwardRef(ModulesMenu);
