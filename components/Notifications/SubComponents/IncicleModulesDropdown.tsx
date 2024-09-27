import React, { useState } from 'react';
import { v4 as uuid } from 'uuid';
import { ListItemIcon, Menu, MenuItem, Stack } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

import { getNotifications } from '@/safira-app/services/notifier/notifications';
import { useNotifications } from '@/safira-app/hooks/useNotifications';
import { useHeaderProvider } from '@/safira-app/contexts/HeaderContext';

import { incicleNotificationModules } from '@/safira-app/utils/modules';
import { NotificationFilterOptions } from '../enums';
import { ButtonNotification } from '../style';
import { NotificationFiltersType } from '../types';

type AnchorButton = EventTarget & HTMLButtonElement;

type IncicleModulesProps = {
  notificationFilters: NotificationFiltersType;
  setNotificationFilters: React.Dispatch<React.SetStateAction<NotificationFiltersType>>;
};

const IncicleModulesDropdown: React.FC<IncicleModulesProps> = props => {
  const { notificationFilters, setNotificationFilters } = props;

  const { user } = useHeaderProvider();
  const { api, setNotifications } = useNotifications();

  const [anchorEl, setAnchorEl] = useState<AnchorButton | null>(null);

  const open = Boolean(anchorEl);

  function handleOpenDropdown(ev: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    setAnchorEl(ev.currentTarget);
  }

  function handleCloseDropdown() {
    setAnchorEl(null);
  }

  function handleChangeNotificationOption(value: NotificationFilterOptions) {
    /**
     * This function is used to set filter type on notifications
     */
    return () => {
      setNotificationFilters(oldState => ({ ...oldState, type: value }));

      getNotifications(api, {
        params: {
          module: notificationFilters.module_filter,
          read: value === NotificationFilterOptions.UNREADED ? value : null,
        },
      }).then(response => setNotifications(response?.data.data));
    };
  }

  function handleSetNotificationsModuleFilter(value: string) {
    /**
     * This function is used to set module filter on notifications
     */
    return () => {
      setNotificationFilters(oldState => ({
        ...oldState,
        module_filter: value,
      }));

      handleCloseDropdown();

      getNotifications(api, {
        params: {
          read: notificationFilters.type,
          module: value,
        },
      }).then(response => setNotifications(response?.data.data));
    };
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
            onClick={handleChangeNotificationOption(NotificationFilterOptions.ALL)}
            active={notificationFilters.type === NotificationFilterOptions.ALL ? 1 : 0}
          >
            Todas
          </ButtonNotification>
          <ButtonNotification
            onClick={handleChangeNotificationOption(NotificationFilterOptions.UNREADED)}
            active={notificationFilters.type === NotificationFilterOptions.UNREADED ? 1 : 0}
          >
            Não Lidas
          </ButtonNotification>
        </Stack>

        <ButtonNotification onClick={handleOpenDropdown}>
          {incicleNotificationModules.find(module => module.slug === notificationFilters.module_filter)?.title}
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
        {incicleNotificationModules.map(module => {
          if (module.linkKey === 'disabled') {
            return <React.Fragment key={uuid()}></React.Fragment>;
          }
          if (module.userType === 'BOTH' || user.type === module.userType) {
            return (
              <MenuItem
                key={uuid()}
                onClick={handleSetNotificationsModuleFilter(module.slug)}
                sx={{ fontSize: '14px' }}
                value={module.slug}
              >
                <ListItemIcon>
                  <img src={module.icon} style={{ width: 24, height: 24 }} alt={module.icon} />
                </ListItemIcon>
                {module.title}
              </MenuItem>
            );
          }
          return <React.Fragment key={uuid()}></React.Fragment>;
        })}
      </Menu>
    </>
  );
};

export default IncicleModulesDropdown;
