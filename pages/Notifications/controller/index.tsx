import React, { useImperativeHandle, useLayoutEffect, useRef } from 'react';
import { NotificationEvent } from '@/safira-app/services/emitters/NotificationEvent';
import { useNotifications } from '@/safira-app/hooks/useNotifications';
import { useQuery } from '@/safira-app/hooks/useQuery';
import { useRender } from '@/safira-app/hooks/useRender';
import { NotificationsView } from '../view';

type AnchorButton = EventTarget & HTMLButtonElement;

type NotificationsRef = {
  openDropdown(anchorEl: AnchorButton): void;
  closeDropdown(): void;
};

export const NotificationsController: React.ForwardRefRenderFunction<NotificationsRef> = (_, ref) => {
  const {
    badgeIsInvisible,
    dropdownOpened,
    notifications,
    markAllAsViewed,
    handleCloseDropdown: handleClose,
  } = useNotifications();
  const { fn } = useRender();
  const query = useQuery();

  const anchorRef = useRef<HTMLButtonElement | null>(null);

  function handleOpenDropdown(ev?: any) {
    ev?.stopPropagation();
    NotificationEvent.emit('open_dropdown');
  }

  function handleCloseDropdown(ev?: any) {
    ev?.stopPropagation();
    handleClose();
    markAllAsViewed();
    NotificationEvent.emit('close_dropdown');
  }

  useLayoutEffect(() => {
    if (!notifications?.length) return;

    fn('open dropdown by url params', () => {
      const openNotificationDropdown = query.get('notifications') === 'open';

      if (openNotificationDropdown) {
        query.delete('notifications');
        NotificationEvent.emit('open_dropdown');
      }
    });
  }, [query, fn, notifications]);

  useImperativeHandle(ref, () => {
    return {
      openDropdown: handleOpenDropdown,
      closeDropdown: handleCloseDropdown,
    };
  });

  return (
    <NotificationsView
      anchorRef={anchorRef}
      badgeIsInvisible={badgeIsInvisible}
      dropdownOpened={dropdownOpened}
      handleOpenDropdown={handleOpenDropdown}
      handleCloseDropdown={handleCloseDropdown}
    />
  );
};
