import { Typography } from "@mui/material";
import TimeAgo from "safira-app/libs/timeago";
import { NotificationProps } from "safira-app/services/notifications";
import { Format } from 'safira-app/libs/timeago/types';
import { getDefaultLanguage } from "@/safira-app/utils/getDefaultLanguage";

const default_language = getDefaultLanguage();

TimeAgo.arguments = {
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