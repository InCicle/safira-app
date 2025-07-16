import { Typography } from '@mui/material';
import TimeAgo from '@/components/TimeAgo';
import { NotificationProps } from '@/services/api/notifications';

export const NotificationContentText: React.FC<
  React.PropsWithChildren<{ notification: NotificationProps }>
> = ({ notification, children }) => {
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
        <TimeAgo
          date={notification.createdAt}
          style={{ fontSize: 11 }}
          timeStyle="mini"
        />
      </small>
    </Typography>
  );
};
