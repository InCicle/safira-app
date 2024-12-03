import { MODULE_TYPES, NotificationFilterOptions } from './enums';
import { NotificationFiltersType, NotificationParamsType } from './types';

export const DEFAULT_NOTIFICATION_PARAMS: NotificationParamsType = {
  page: 1,
  perPage: 30,
};

export const DEFAULT_NOTIFICATION_FILTERS: NotificationFiltersType = {
  read: NotificationFilterOptions.ALL,
  module: MODULE_TYPES.all,
};
