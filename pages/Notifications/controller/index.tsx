import React, { useCallback, useImperativeHandle, useLayoutEffect, useRef, useState } from 'react';
import { NotificationEvent } from '@/safira-app/services/emitters/NotificationEvent';
import { useNotifications } from '@/safira-app/hooks/useNotifications';
import { useQuery } from '@/safira-app/hooks/useQuery';
import { useRender } from '@/safira-app/hooks/useRender';
import { NotificationsView } from '../view';
import { NotificationReadOptionsType, NotificationsReadOptions } from '@/safira-app/services/queries/notifications';
import { DEFAULT_NOTIFICATION_PARAMS } from '@/safira-app/utils/constants';
import { MODULES, ModulesType } from '@/safira-app/interfaces/Modules';
import { useIntersectionObserver } from '@/safira-app/hooks/useIntersectionObserver';

type AnchorButton = EventTarget & HTMLButtonElement;

type NotificationsRef = {
  openDropdown(anchorEl: AnchorButton): void;
  closeDropdown(): void;
};

export const NotificationsController: React.ForwardRefRenderFunction<NotificationsRef> = (_, ref) => {
  const {
    notifications,
    params,
    isLoading,
    fetchNotifications,
    hasNextPage,
    isFetchingNextPage,
    badgeIsInvisible,
    dropdownOpened,
    markAllAsViewed,
    handleCloseDropdown: handleClose,
  } = useNotifications();
  const { fn } = useRender();
  const query = useQuery();

  const anchorRef = useRef<HTMLButtonElement | null>(null);

  const [anchorElFilter, setAnchorElFilter] = useState<AnchorButton | null>(null);
  const openFilters = Boolean(anchorElFilter);

  const showLoading = isLoading || isFetchingNextPage || hasNextPage;
  const observerRef = useRef<HTMLDivElement | null>(null);

  const handleLoadMoreContent = useCallback(() => {
    if (!isLoading && hasNextPage) fetchNotifications({ page: params.page + 1 });
  }, [isLoading, params]); // eslint-disable-line

  useIntersectionObserver({ observerRef, hasNextPage, isFetchingNextPage, fetchNextPage: handleLoadMoreContent });

  function handleOpenFilters(ev: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    setAnchorElFilter(ev.currentTarget);
  }

  function handleCloseFilters() {
    setAnchorElFilter(null);
  }

  function handleChangeNotificationOption(value: NotificationReadOptionsType) {
    fetchNotifications({
      ...DEFAULT_NOTIFICATION_PARAMS,
      read: value === NotificationsReadOptions.UNREADED ? value : undefined,
    });
  }

  function handleSetNotificationsModuleFilter(value: ModulesType) {
    fetchNotifications({
      ...DEFAULT_NOTIFICATION_PARAMS,
      read: value === MODULES.all ? undefined : (NotificationsReadOptions.ALL as NotificationReadOptionsType),
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
      dropdownOpened={dropdownOpened}
      handleOpenDropdown={handleOpenDropdown}
      handleCloseDropdown={handleCloseDropdown}
      observerRef={observerRef}
      showLoading={showLoading}
      handleSetNotificationsModuleFilter={handleSetNotificationsModuleFilter}
      handleOpenFilters={handleOpenFilters}
      handleCloseFilters={handleCloseFilters}
      anchorElFilter={anchorElFilter}
      openFilters={openFilters}
      handleLoadMoreContent={handleLoadMoreContent}
      handleChangeNotificationOption={handleChangeNotificationOption}
      isLoading={isLoading}
    />
  );
};
