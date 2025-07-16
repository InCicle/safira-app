import React from 'react';
import { ListItemIcon, Menu, MenuItem, Stack } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { FilterModules } from '@/utils/modules';
import { ButtonNotification } from './styles';
import { useTranslation } from 'react-i18next';
import { translation } from '@/utils/translation';
import { NotificationsReadOptions } from '@/services/api/notifications';
import { useNotifications } from '@/hooks/useNotifications';
import { MODULES } from '@/interfaces/Modules';
import { useAuth } from '@/hooks/useAuth';

interface NotificationsFiltersProps {
  isLoading: boolean;
  anchorEl: HTMLButtonElement | null;
  handleClose: () => void;
  handleSetModuleFilter: (module: MODULES) => void;
  handleOpen: (ev: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  handleChangeReadOptionReader: (value: NotificationsReadOptions) => void;
}

export const NotificationsFilters: React.FC<NotificationsFiltersProps> = ({
  anchorEl,
  isLoading,
  handleOpen,
  handleClose,
  handleChangeReadOptionReader,
  handleSetModuleFilter,
}) => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const { params } = useNotifications();

  return (
    <>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ padding: '0 15px', margin: '10px 0 20px' }}
      >
        <Stack direction="row" spacing={1}>
          <ButtonNotification
            disabled={isLoading}
            onClick={() =>
              handleChangeReadOptionReader(NotificationsReadOptions.ALL)
            }
            active={params.read !== NotificationsReadOptions.UNREAD ? 1 : 0}
          >
            {translation(t, 'all')}
          </ButtonNotification>
          <ButtonNotification
            disabled={isLoading}
            onClick={() =>
              handleChangeReadOptionReader(NotificationsReadOptions.UNREAD)
            }
            active={params.read === NotificationsReadOptions.UNREAD ? 1 : 0}
          >
            {translation(t, 'unread')}
          </ButtonNotification>
        </Stack>

        <ButtonNotification disabled={isLoading} onClick={handleOpen}>
          {translation(
            t,
            `modules.${
              FilterModules.find(
                (module) => module.slug === (params.module || MODULES.all),
              )?.title ?? ''
            }`,
          )}
          <ArrowDropDownIcon
            fontSize="small"
            style={{
              transition: 'transform 500ms ease',
              transform: anchorEl ? 'rotate(180deg)' : 'rotate(0)',
              marginLeft: '5px',
            }}
          />
        </ButtonNotification>
      </Stack>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        slotProps={{
          paper: {
            elevation: 0,
            sx: { boxShadow: '0 0px 8px 1px rgba(0, 0, 0, 0.1)' },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        {FilterModules.map((module, index) => {
          if (module.linkKey === 'disabled') {
            return <React.Fragment key={index}></React.Fragment>;
          }
          if (
            module.userType === 'BOTH' ||
            (user && user.type === module.userType)
          ) {
            return (
              <MenuItem
                key={module.slug}
                disabled={isLoading}
                onClick={() => handleSetModuleFilter(module.slug)}
                sx={{ fontSize: '14px' }}
                value={module.slug}
              >
                <ListItemIcon>
                  <img
                    src={module.icon}
                    style={{ width: 24, height: 24 }}
                    alt={module.icon}
                  />
                </ListItemIcon>
                {translation(t, 'modules.'.concat(module.title))}
              </MenuItem>
            );
          }
          return <React.Fragment key={index} />;
        })}
      </Menu>
    </>
  );
};
