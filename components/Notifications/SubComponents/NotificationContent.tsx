import { Typography } from "@mui/material";
import Cookies from "js-cookie";
import TimeAgo from "safira-app/libs/timeago";
import { NotificationProps } from "safira-app/services/notifications";
import { Format } from 'safira-app/libs/timeago/types';

const default_language = Cookies.get('default_language') ?? 'en';

TimeAgo.defaultProps = {
  format: default_language as Format,
  timeStyle: 'mini',
};

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
        <TimeAgo date={notification.createdAt} style={{ fontSize: 11 }} />
      </small>
    </Typography>
  );
};