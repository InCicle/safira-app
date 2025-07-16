import { FC } from 'react';
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
import { ManagerMenuModules, ModulesType } from '@/utils/modules';
import { ModuleMenuItem } from './moduleMenuItem';
import { useTranslation } from 'react-i18next';
import { translation } from '@/utils/translation';

export type ModulesMenuRef = {
  openModulesMenu: (ev) => void;
  closeModulesMenu: (ev) => void;
};

export interface ModulesMenuProps {
  activeManagerMenu: boolean;
  anchorMenuModulesEl: HTMLElement | null;
  filteredUserModules: ModulesType[];
  filteredCollaboratorsModules: ModulesType[];
  closeModulesMenu: (ev) => void;
  getModuleUrl: (item: ModulesType) => string;
}

const BREAKPOINT = 700;

const ModulesMenu: FC<ModulesMenuProps> = ({
  activeManagerMenu,
  filteredUserModules,
  anchorMenuModulesEl,
  filteredCollaboratorsModules,
  getModuleUrl,
  closeModulesMenu,
}) => {
  const { t } = useTranslation();
  const { breakpoints } = useTheme();
  return (
    <Menu
      anchorEl={anchorMenuModulesEl}
      onClose={closeModulesMenu}
      onClick={closeModulesMenu}
      open={Boolean(anchorMenuModulesEl)}
      slotProps={{
        paper: {
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
            {translation(t, 'modules.title')}
          </Typography>
        </Box>
        <IconButton sx={{ marginBottom: '8px' }} onClick={closeModulesMenu}>
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
          [breakpoints.down(BREAKPOINT)]: {
            display: 'flex',
            flexDirection: 'column',
          },
        }}
      >
        {filteredUserModules.map((moduleItem, index) => (
          <ModuleMenuItem
            key={index.toString()}
            module={{
              ...moduleItem,
              url: getModuleUrl(moduleItem),
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
              [breakpoints.down(BREAKPOINT)]: {
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
                  url: getModuleUrl(moduleItem),
                }}
              />
            ))}

            {activeManagerMenu ? (
              <ModuleMenuItem module={ManagerMenuModules} />
            ) : null}
          </Box>
        </>
      ) : null}
    </Menu>
  );
};

export default ModulesMenu;
