export enum NotificationsReadOptions {
  ALL = 'ALL',
  UNREAD = 'UNREADED',
}

export type NotificationFiltersType = {
  read?: string;
  module?: string;
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
  module: string;
  read: boolean;
  recipient_email?: string;
  recipient_id: string;
  common?: any;
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
