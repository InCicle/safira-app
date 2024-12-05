import React, { useState } from 'react';
import { ListItemIcon, Menu, MenuItem, Stack } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

import {
  DEFAULT_NOTIFICATION_PARAMS,
  MODULE_TYPES,
  NotificationFilterOptions,
} from 'safira-app/services/notifications';
import { useNotifications } from 'safira-app/hooks/useNotifications';
import { useHeaderProvider } from 'safira-app/contexts/HeaderContext';

import { incicleNotificationModules } from 'safira-app/utils/modules';
import { ButtonNotification } from '../style';
import { useTranslation } from 'react-i18next';
import { translation } from 'safira-app/utils/translation';

type AnchorButton = EventTarget & HTMLButtonElement;

const IncicleModulesDropdown: React.FC = () => {
  const { user } = useHeaderProvider();
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

  function handleChangeNotificationOption(value: NotificationFilterOptions) {
    fetchNotifications({
      ...DEFAULT_NOTIFICATION_PARAMS,
      read: value === NotificationFilterOptions.UNREADED ? value : undefined,
    });
  }

  function handleSetNotificationsModuleFilter(value: MODULE_TYPES) {
    fetchNotifications({
      ...DEFAULT_NOTIFICATION_PARAMS,
      read: value === MODULE_TYPES.all ? undefined : NotificationFilterOptions.ALL,
      module: value === MODULE_TYPES.all ? undefined : value,
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
            onClick={() => handleChangeNotificationOption(NotificationFilterOptions.ALL)}
            active={params.read !== NotificationFilterOptions.UNREADED ? 1 : 0}
          >
            {translation(t, 'all')}
          </ButtonNotification>
          <ButtonNotification
            disabled={isLoading}
            onClick={() => handleChangeNotificationOption(NotificationFilterOptions.UNREADED)}
            active={params.read === NotificationFilterOptions.UNREADED ? 1 : 0}
          >
            {translation(t, 'unread')}
          </ButtonNotification>
        </Stack>

        <ButtonNotification disabled={isLoading} onClick={handleOpenDropdown}>
          {translation(
            t,
            `modules.${
              incicleNotificationModules.find(module => module.slug === (params.module || MODULE_TYPES.all))?.title ??
              ''
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
        PaperProps={{
          elevation: 0,
          sx: { boxShadow: '0 0px 8px 1px rgba(0, 0, 0, 0.1)' },
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
                onClick={() => handleSetNotificationsModuleFilter(module.slug)}
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

export default IncicleModulesDropdown;
