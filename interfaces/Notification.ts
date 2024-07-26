export enum MODULE_TYPES {
  all = '',
  schedule = 'schedule',
  personal_department = 'personal_department',
  organizational_engineering = 'organizational_engineering',
  endomarketing = 'endomarketing',
  feedback = 'feedback',
  project = 'project',
  evaluation360 = '360',
  group = 'group',
  social_network = 'social_network',
  recruitment = 'recruitment',
  ombudsman = 'ombudsman',
  climate_research = 'climate_research',
  task_manager = 'task_manager',
  policy = 'policy',
  okr = 'okr',
  in_point = 'in_point',
  in_check = 'in_check',
}

export interface INotificationCommon {
  title_activity: string;
}

export interface INotificationSender {
  avatar_url: string;
  id: string;
  name: string;
  username: string;
  type: 'person' | 'company';
}

export interface INotificationProps {
  _id: string;
  common: any;
  module: MODULE_TYPES;
  read: boolean;
  recipient_email?: string;
  recipient_id: string;
  saw: boolean;
  sender: INotificationSender;
  type: string;
  createdAt: string;
  updatedAt: string;
}

export interface INotificationWrapper {
  currentPage: number;
  data: INotificationProps[];
  saw: number;
  size: number;
  total: number;
  totalPages: number;
}
