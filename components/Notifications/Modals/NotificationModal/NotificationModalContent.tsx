import React, { Fragment, ReactNode } from 'react';
import { DialogContent, DialogTitle, useTheme } from '@mui/material';

export type NotificationModalContentProps = {
  title?: ReactNode;
  content?: ReactNode;
};

const NotificationModalContent: React.FC<NotificationModalContentProps> = ({ title, content }) => {
  const { palette } = useTheme();

  return (
    <Fragment>
      <DialogTitle color={palette.primary.main} sx={{ padding: 2 }}>
        {title}
      </DialogTitle>
      <DialogContent sx={{ px: 2, py: 1 }}>{content}</DialogContent>
    </Fragment>
  );
};

export default NotificationModalContent;
