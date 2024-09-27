import React from 'react';
import { MenuItem, Stack, Typography, Box, Theme, SxProps } from '@mui/material';
import CircleIcon from '@mui/icons-material/Circle';
import { useHeaderProvider } from '@/safira-app/contexts/HeaderContext';
import { INotificationProps } from '@/safira-app/interfaces/Notification';
import RenderAvatar from '@/safira-app/components/RenderAvatar';
import { incicleNotificationModules } from '@/safira-app/utils/modules';

// TimeAgo
import moment from 'moment';
import TimeAgo from '@/safira-app/libs/timeago';
import { links } from '@/safira-app/config/links';
import { htmlDecode } from '@/safira-app/utils/htmlDecode';

interface IProps {
  notification?: INotificationProps;
  url?: string;
  onClick?: (ev?: any) => void;
}

TimeAgo.defaultProps = {
  format: 'pt-BR',
  timeStyle: 'mini',
};

export const preventRedirect = (e: any) => {
  e.preventDefault();
};

const markAsReaded = (e: any, notification: INotificationProps, api: any, url?: string) => {
  e.preventDefault();
  api
    .patch(`${links.api.notification}/notifications/${notification._id}`)
    .then((response: any) => {
      if (response.status === 204 && url) {
        window.location.href = url;
      }
    })
    .catch(() => {
      if (url) {
        window.location.href = url;
      }
    });
};

export function formatNotificationContent(notification: INotificationProps): INotificationProps {
  if (!notification?.common?.content && typeof notification?.common?.content !== 'string') return notification;

  return {
    ...notification,
    common: {
      ...notification?.common,
      content: htmlDecode(notification.common?.content),
    },
  };
}

export const NotificationContainer: React.FC<React.PropsWithChildren<IProps>> = ({
  notification,
  url,
  onClick,
  children,
}) => {
  const { api } = useHeaderProvider();

  function handleClick(ev?: any) {
    if (onClick) {
      onClick(ev);
    }

    if (notification) {
      markAsReaded(ev, notification, api, url);
    }
  }

  return (
    <MenuItem
      style={{
        whiteSpace: 'normal',
        paddingTop: '10px',
        paddingBottom: '10px',
        backgroundColor: notification?.saw ? 'initial' : '#EEEEEE',
      }}
      sx={{
        '&:hover': {
          backgroundColor: '#F2F3F4!important',
        },
      }}
      component={url ? 'a' : 'div'}
      href={url}
      onClick={handleClick}
    >
      <Stack direction="row" style={{ width: '100%' }} alignItems="center">
        <Box sx={{ position: 'relative' }}>
          <RenderAvatar src={notification?.sender.avatar_url} />

          {!!notification?.module && (
            <Box
              sx={{
                position: 'absolute',
                bottom: '-4px',
                left: '-4px',
                width: '16px',
                height: '16px',
                border: '1px solid #00568b',
                backgroundColor: '#fff',
                borderRadius: '50%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <img
                src={incicleNotificationModules.find(incicleModule => incicleModule.slug === notification.module)?.icon}
                alt={notification.module}
                style={{ width: '100%', height: 'auto' }}
              />
            </Box>
          )}
        </Box>
        <Stack direction="column" spacing={1} style={{ width: '100%', marginRight: '10px' }}>
          {children}
        </Stack>
        {!notification?.read && <CircleIcon sx={{ fill: '#00adcb', width: 10 }} />}
      </Stack>
    </MenuItem>
  );
};

export const NotificationContentText: React.FC<React.PropsWithChildren<{ notification: INotificationProps }>> = ({
  notification,
  children,
}) => {
  return (
    <Typography
      sx={{
        lineHeight: '15px',
        fontSize: '13px !important',
        width: '100%',
        overflowWrap: 'anywhere',
        marginRight: '10px',
        label: { fontSize: '13px' },
        '*': { cursor: 'pointer' },
      }}
    >
      {children}
      <small className="time-count" style={{ display: 'block', fontSize: 11 }}>
        <TimeAgo date={notification.createdAt} style={{ fontSize: 11 }} />
      </small>
    </Typography>
  );
};

export const NotificationHighlight: React.FC<React.PropsWithChildren<{ sx?: SxProps<Theme> }>> = ({ sx, children }) => {
  return (
    <Typography
      component="label"
      sx={{
        lineHeight: '15px',
        color: '#00558E',
        fontSize: '13px',
        ...sx,
      }}
    >
      {children}
    </Typography>
  );
};

export const reduceString = (value = '', length: number) => {
  /**
   * This function is used to add '...' on strings.
   *
   * params:
   *  value: the string to reduce
   *  length: number of max characters for the string
   *
   * return: string reduced
   */
  if (value?.length <= length) return value;
  return `${value.slice(0, length - 3)}...`;
};

export const dateFormat = (date: string | Date, format: string) => {
  /**
   * This function is used to format dates on notifications text
   *
   * params:
   *  date: a valid string date format or a javascript date object
   *  format: string representing the format for date string return (must be an moment valid format)
   *
   * return: formated date as string
   */
  return moment(date).locale('pt-br').format(format);
};
