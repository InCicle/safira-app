import React, {
  useCallback,
  useImperativeHandle,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import { NotificationEvent } from '@/services/emitters/NotificationEvent';
import { useNotifications } from '@/hooks/useNotifications';
import { useURLQuery } from '@/hooks/useURLQuery';
import { useRender } from '@/hooks/useRender';
import { NotificationsView } from '../view';
import {
  checkAllReadNotifications,
  NotificationsReadOptions,
} from '@/services/api/notifications';
import { DEFAULT_NOTIFICATION_PARAMS } from '@/utils/constants';
import { MODULES } from '@/interfaces/Modules';

type AnchorButton = EventTarget & HTMLButtonElement;

type NotificationsControllerProps = {
  openDropdown(anchorEl: AnchorButton): void;
  closeDropdown(): void;
};

export const NotificationsController: React.ForwardRefRenderFunction<
  NotificationsControllerProps
> = (_, ref) => {
  const {
    notifications,
    params,
    isLoading,
    dropdownOpened,
    badgeIsInvisible,
    markAllAsViewed,
    setNotifications,
    fetchNotifications,
    hasNextPage,
    isFetchingNextPage,
    handleCloseDropdown: handleClose,
  } = useNotifications();
  const { fn } = useRender();
  const query = useURLQuery();
  const [anchorElFilter, setAnchorElFilter] = useState<AnchorButton | null>(
    null,
  );
  const [anchorElOptions, setAnchorElOptions] = useState<AnchorButton | null>(
    null,
  );
  const anchorRef = useRef<HTMLButtonElement | null>(null);
  const observerNotificationsRef = useRef<HTMLDivElement | null>(null);
  const showNotificationsLoading =
    isLoading || isFetchingNextPage || hasNextPage;

  function handleOpenOptions(
    ev: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) {
    setAnchorElOptions(ev.currentTarget);
  }

  function handleCloseOptions() {
    setAnchorElOptions(null);
  }

  function handleCheckAllRead() {
    /**
     * This function is used to check all notifications as readed
     */
    checkAllReadNotifications();
    setNotifications((old) =>
      old?.map((notification) => {
        notification.read = true;
        return notification;
      }),
    );
  }

  const handleLoadMoreContent = useCallback(() => {
    if (!isLoading && hasNextPage)
      fetchNotifications({ page: params.page + 1 });
  }, [isLoading, params]); // eslint-disable-line

  function handleOpenFilters(
    ev: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) {
    setAnchorElFilter(ev.currentTarget);
  }

  function handleCloseFilters() {
    setAnchorElFilter(null);
  }

  function handleChangeNotificationsOption(value: NotificationsReadOptions) {
    fetchNotifications({
      ...DEFAULT_NOTIFICATION_PARAMS,
      read: value === NotificationsReadOptions.UNREAD ? value : undefined,
    });
  }

  function handleSetModuleFilter(value: MODULES) {
    fetchNotifications({
      ...DEFAULT_NOTIFICATION_PARAMS,
      read: value === MODULES.all ? undefined : NotificationsReadOptions.ALL,
      module: value === MODULES.all ? undefined : value,
    });
  }

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
      open={dropdownOpened}
      handleOpenMenu={handleOpenDropdown}
      handleCloseMenu={handleCloseDropdown}
      anchorElFilter={anchorElFilter}
      handleOpenFilters={handleOpenFilters}
      handleCloseFilters={handleCloseFilters}
      handleSetModuleFilter={handleSetModuleFilter}
      anchorElOptions={anchorElOptions}
      handleOpenOptions={handleOpenOptions}
      handleCloseOptions={handleCloseOptions}
      handleCheckAllRead={handleCheckAllRead}
      observerNotificationsRef={observerNotificationsRef}
      showNotificationsLoading={showNotificationsLoading}
      handleLoadMoreContent={handleLoadMoreContent}
      handleChangeNotificationsOption={handleChangeNotificationsOption}
      isLoading={isLoading}
    />
  );
};
