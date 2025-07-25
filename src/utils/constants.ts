import { NotificationFiltersType, NotificationParamsType } from '@/services/api/notifications';

export const MINUTE_IN_MILLISECONDS = 60 * 1000;

export const NOTIFICATION_REQUEST_KEY = 'notifications';

export const DEFAULT_NOTIFICATION_PARAMS: NotificationParamsType = {
  page: 1,
  perPage: 30,
};

export const DEFAULT_NOTIFICATION_FILTERS: NotificationFiltersType = {
  read: undefined,
  module: undefined,
};

export const MODULE_PERMISSIONS = 'module_permissions';

export const URL_STEP_ONE = 'https://lp.stepone.com.br/';

export const INCICLE_LOGO = 'https://static-incicle.s3.amazonaws.com/logo_incicle.svg';

export const PERSON_LINK = 'https://www.incicle.com/tutoriais-de-suporte-person/';
export const COMPANY_LINK = 'https://www.incicle.com/tutoriais-de-suporte-company/';
