import React from 'react';
import { Stack, Typography, Box, Theme, SxProps } from '@mui/material';

import RenderAvatar from '@/safira-app/components/RenderAvatar';
import { incicleNotificationModules } from '@/safira-app/utils/modules';
import { NotificationEvent } from '@/safira-app/providers/NotificationEvent';
import { INotificationProps } from '@/safira-app/interfaces/Notification';

// TimeAgo
import moment from 'moment';
import TimeAgo from '@/safira-app/libs/timeago';

TimeAgo.defaultProps = {
  format: 'pt-BR',
  timeStyle: 'mini',
};

export const preventRedirect = (e: any) => {
  e.preventDefault();
};

export const NotificationContainer: React.FC<React.PropsWithChildren<unknown>> = ({ children }) => {
  function handleOpenDropdown() {
    NotificationEvent.emit('open_dropdown');
  }

  return (
    <Box
      onClick={handleOpenDropdown}
      sx={{
        maxWidth: '200px',
        margin: '0 auto',
        whiteSpace: 'normal',
        paddingTop: '10px',
        paddingBottom: '10px',
        backgroundColor: 'initial',
      }}
    >
      <Stack direction="row" style={{ width: '100%' }} alignItems="center">
        <Stack direction="column" spacing={1} style={{ width: '100%', marginRight: '10px' }}>
          {children}
        </Stack>
      </Stack>
    </Box>
  );
};

export const NotificationImageBox: React.FC<{ notification: INotificationProps }> = ({ notification }) => {
  return (
    <Box sx={{ position: 'relative' }}>
      <RenderAvatar src={notification.sender.avatar_url} />

      {!!notification.module && (
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
  );
};

export const NotificationContentText: React.FC<React.PropsWithChildren<unknown>> = ({ children }) => {
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
