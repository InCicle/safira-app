import React, { Fragment, ReactNode, useEffect, useImperativeHandle, useState } from 'react';
import { Button, Dialog, DialogActions, SxProps, Theme } from '@mui/material';
import NotificationModalContent, { NotificationModalContentProps } from './NotificationModalContent';
import { useQuery } from '@/safira-app/hooks/useQuery';

export type NotificationModalProps = NotificationModalContentProps & {
  notificationParams?: {
    id: string;
    type: string;
  };
  openWhenParamsMatch?: boolean;
  sx?: SxProps<Theme>;
  renderOpener?: (handleOpenModal: () => void) => ReactNode;
};

export type NotificationModalRef = {
  openModal(): void;
  closeModal(): void;
};

const NotificationModal: React.ForwardRefRenderFunction<NotificationModalRef, NotificationModalProps> = (
  { title, content, notificationParams, openWhenParamsMatch, sx, renderOpener },
  ref,
) => {
  const query = useQuery();
  const [open, setOpen] = useState(false);

  function handleOpenModal(ev?: any) {
    ev?.stopPropagation();

    setOpen(true);
  }

  function handleCloseModal(ev?: any) {
    ev?.stopPropagation();

    setOpen(false);

    query.delete('notification_id');
    query.delete('notification_type');
  }

  useImperativeHandle(ref, () => {
    return {
      openModal: handleOpenModal,
      closeModal: handleCloseModal,
    };
  });

  useEffect(() => {
    const notificationId = query.get('notification_id');
    const notificationType = query.get('notification_type');
    const { id, type } = notificationParams || {};

    const hasValue = Boolean(notificationId && notificationType);
    const paramsMatch = notificationId === id && notificationType === type;

    if (openWhenParamsMatch && hasValue && paramsMatch) {
      handleOpenModal();
    }
  }, [query, notificationParams, openWhenParamsMatch]); // eslint-disable-line

  return (
    <Fragment>
      {renderOpener && renderOpener(handleOpenModal)}
      <Dialog
        open={open}
        onClose={handleCloseModal}
        PaperProps={{
          sx: { width: 450, ...sx },
        }}
      >
        {open && (
          <Fragment>
            <NotificationModalContent title={title} content={content} />
            <DialogActions sx={{ py: 1.5, px: 1.5, pt: 1 }}>
              <Button
                variant="outlined"
                onClick={handleCloseModal}
                sx={{
                  textTransform: 'capitalize',
                  fontSize: '15px',
                  color: '#00558E',
                  padding: '5px 15px',
                }}
              >
                Entendido
              </Button>
            </DialogActions>
          </Fragment>
        )}
      </Dialog>
    </Fragment>
  );
};

export default React.forwardRef(NotificationModal);
