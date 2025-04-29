import React, { useState } from 'react';
import { ListItemIcon, Menu, MenuItem, Stack } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

import { useNotifications } from '@/safira-app/hooks/useNotifications';

import { incicleNotificationModules } from '@/safira-app/utils/modules';
import { ButtonNotification } from '../style';
import { useTranslation } from 'react-i18next';
import { translation } from '@/safira-app/utils/translation';
import { DEFAULT_NOTIFICATION_PARAMS } from '@/safira-app/utils/constants';
import { MODULES, ModulesType } from '@/safira-app/interfaces/Modules';
import { NotificationsReadOptions, NotificationReadOptionsType } from '@/safira-app/services/queries/notifications';
import { useAuth } from '@/safira-app/hooks/useAuth';

type AnchorButton = EventTarget & HTMLButtonElement;

export const IncicleModulesDropdown: React.FC = () => {
  const { user } = useAuth();
  const { params, isLoading, fetchNotifications } = useNotifications();
  const { t } = useTranslation();

  const [anchorEl, setAnchorEl] = useState<AnchorButton | null>(null);

  const open = Boolean(anchorEl);

  function handleOpenDropdown(ev: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    setAnchorEl(ev.currentTarget);
  }

  function handleCloseDropdown() {
    setAnchorEl(null);
  }

  function handleChangeNotificationOption(value: NotificationReadOptionsType) {
    fetchNotifications({
      ...DEFAULT_NOTIFICATION_PARAMS,
      read: value === NotificationsReadOptions.UNREADED ? value : undefined,
    });
  }

  function handleSetNotificationsModuleFilter(value: ModulesType) {
    fetchNotifications({
      ...DEFAULT_NOTIFICATION_PARAMS,
      read: value === MODULES.all ? undefined : (NotificationsReadOptions.ALL as NotificationReadOptionsType),
      module: value === MODULES.all ? undefined : value,
    });
  }

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
            onClick={() => handleChangeNotificationOption(NotificationsReadOptions.ALL as NotificationReadOptionsType)}
            active={params.read !== NotificationsReadOptions.UNREADED ? 1 : 0}
          >
            {translation(t, 'all')}
          </ButtonNotification>
          <ButtonNotification
            disabled={isLoading}
            onClick={() =>
              handleChangeNotificationOption(NotificationsReadOptions.UNREADED as NotificationReadOptionsType)
            }
            active={params.read === NotificationsReadOptions.UNREADED ? 1 : 0}
          >
            {translation(t, 'unread')}
          </ButtonNotification>
        </Stack>

        <ButtonNotification disabled={isLoading} onClick={handleOpenDropdown}>
          {translation(
            t,
            `modules.${
              incicleNotificationModules.find(module => module.slug === (params.module || MODULES.all))?.title ?? ''
            }`,
          )}
          <ArrowDropDownIcon
            fontSize="small"
            style={{
              transition: 'transform 500ms ease',
              transform: open ? 'rotate(180deg)' : 'rotate(0)',
              marginLeft: '5px',
            }}
          />
        </ButtonNotification>
      </Stack>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleCloseDropdown}
        slotProps={{
          paper: {
            elevation: 0,
            sx: { boxShadow: '0 0px 8px 1px rgba(0, 0, 0, 0.1)' },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        {incicleNotificationModules.map((module, index) => {
          if (module.linkKey === 'disabled') {
            return <React.Fragment key={index}></React.Fragment>;
          }
          if (module.userType === 'BOTH' || user.type === module.userType) {
            return (
              <MenuItem
                key={module.slug}
                disabled={isLoading}
                onClick={() => handleSetNotificationsModuleFilter(module.slug as ModulesType)}
                sx={{ fontSize: '14px' }}
                value={module.slug}
              >
                <ListItemIcon>
                  <img src={module.icon} style={{ width: 24, height: 24 }} alt={module.icon} />
                </ListItemIcon>
                {translation(t, 'modules.'.concat(module.title))}
              </MenuItem>
            );
          }
          return <React.Fragment key={index}></React.Fragment>;
        })}
      </Menu>
    </>
  );
};
