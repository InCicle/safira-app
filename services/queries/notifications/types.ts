import { ModulesType } from '@/safira-app/interfaces/Modules';

export const NotificationsReadOptions = {
  ALL: 'ALL',
  UNREADED: 'UNREADED',
};

export type NotificationReadOptionsType = keyof typeof NotificationsReadOptions;

export type NotificationFiltersType = {
  read?: NotificationReadOptionsType;
  module?: ModulesType;
};

export type NotificationParamsType = Partial<NotificationFiltersType> & {
  page: number;
  perPage?: number;
};

export type NotificationHeadersType = {
  language: string;
};

export type NotificationCommon = {
  title_activity: string;
};

export type NotificationSender = {
  avatar_url: string;
  id: string;
  name: string;
  username: string;
  type: 'person' | 'company';
};

export type NotificationProps = {
  id: string;
  common: any;
  module: ModulesType;
  read: boolean;
  recipient_email?: string;
  recipient_id: string;
  saw: boolean;
  sender: NotificationSender;
  type: string;
  createdAt: string;
  updatedAt: string;
  actionUrl: string;
  content: string;
};

export type NotificationWrapper = {
  currentPage: number;
  data: NotificationProps[];
  saw: number;
  size: number;
  total: number;
  totalPage: number;
};
