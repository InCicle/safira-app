import { NotificationFiltersType, NotificationParamsType } from './types';

export const NOTIFICATION_REQUEST_KEY = 'notifications';

export const DEFAULT_NOTIFICATION_PARAMS: NotificationParamsType = {
  page: 1,
  perPage: 30,
};

export const DEFAULT_NOTIFICATION_FILTERS: NotificationFiltersType = {
  read: undefined,
  module: undefined,
};
