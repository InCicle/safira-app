import React, { useImperativeHandle, useState } from 'react';
import {
  Box,
  Divider,
  IconButton,
  Menu,
  Stack,
  Typography,
  useTheme,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useHeaderProvider } from '@/safira-app/contexts/HeaderContext';
import {
  incicleMenuModules,
  incicleCollaboratorsMenuModules,
  incicleManagerMenuModules,
} from '@/safira-app/utils/modules';
import ModuleMenuItem from './ModuleMenuItem';
import { usePermissions } from '@/safira-app/contexts/PermissionsContext';
import { useTranslation } from 'react-i18next';
import { translation } from '@/safira-app/utils/translation';

export type ModulesMenuRef = {
  openDropdown: (ev: any) => void;
  closeDropdown: (ev: any) => void;
};

type Props = {
  activeManagerMenu: boolean;
};

const breakpointValue = 700;

enum RedirectTypeEnum {
  STEPONE = 1,
  THREEPONTO = 2,
  RECRUITMENT = 3,
}

const moduleRedirectType = {
  corporative_university: RedirectTypeEnum.STEPONE,
  in_point: RedirectTypeEnum.THREEPONTO,
  recruitment: RedirectTypeEnum.RECRUITMENT,
} as const;

const ModulesMenu: React.ForwardRefRenderFunction<ModulesMenuRef, Props> = (
  props,
  ref
) => {
  const { t } = useTranslation();
  const { user, profiles } = useHeaderProvider();
  const { breakpoints } = useTheme();
  const { activeManagerMenu } = props;
  const { checkPermission, companyId } = usePermissions();
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const socialLinkByEnvironment = process.env.REACT_APP_SOCIAL_LINK || '';

  const integrationTitles = ['corporative_university', 'in_point'];

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

  function findRedirectUrlByType(redirects, type: RedirectTypeEnum) {
    const redirectEntry = redirects.find((redirect) => redirect.type === type);
    return redirectEntry ? redirectEntry.url : socialLinkByEnvironment;
  }

  const resolveModuleUrl = (moduleItem) => {
    if (!integrationTitles.includes(moduleItem.title)) {
      return moduleItem.url;
    }

    const redirects = profiles?.redirects;

    const redirectType = moduleRedirectType[moduleItem.title];

    if (profiles?.type === 'COMPANY') {
      return redirects && redirects.length > 0 && redirectType
        ? findRedirectUrlByType(redirects, redirectType)
        : socialLinkByEnvironment;
    } else if (
      profiles?.type === 'PERSON' &&
      profiles.collaborators &&
      profiles.collaborators.length > 0
    ) {
      const currentCompany = profiles.collaborators.find(
        (company) => company.id === companyId
      );
      if (
        currentCompany &&
        currentCompany.company.redirects &&
        currentCompany.company.redirects.length > 0 &&
        redirectType
      ) {
        return findRedirectUrlByType(
          currentCompany.company.redirects,
          redirectType
        );
      }
    }
    return socialLinkByEnvironment;
  };

  const filteredCollaboratorsModules = incicleCollaboratorsMenuModules
    .filter((item) => item.accountTypes.includes(user.type))
    .filter((moduleItem) => {
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
        position='relative'
        direction='row'
        justifyContent='space-between'
        alignItems='center'
        width='100%'
        padding='0 16px'
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
            {translation(t, 'modules.title')}
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
          .filter((item) => item.accountTypes.includes(user.type))
          .filter((itemModule) => {
            if (!itemModule.enableOnlyTo) return true;
            if (itemModule.enableOnlyTo.includes(companyId)) return true;
            return false;
          })
          .filter((moduleItem) => {
            if (!moduleItem.permission) return true;
            return checkPermission([moduleItem.permission]);
          })
          .map((moduleItem, index) => (
            <ModuleMenuItem
              key={index.toString()}
              module={{
                ...moduleItem,
                url: resolveModuleUrl(moduleItem),
              }}
            />
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
              {translation(t, 'company')}
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
              <ModuleMenuItem
                key={index.toString()}
                module={{
                  ...moduleItem,
                  url: resolveModuleUrl(moduleItem),
                }}
              />
            ))}

            {activeManagerMenu ? (
              <ModuleMenuItem module={incicleManagerMenuModules} />
            ) : null}
          </Box>
        </>
      ) : null}
    </Menu>
  );
};

export default React.forwardRef(ModulesMenu);
