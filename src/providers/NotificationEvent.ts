import { createEmitter } from './Emitter';

export type NotificationEventList = {
  open_dropdown: undefined;
  close_dropdown: undefined;
  update_schedule_module: undefined;
  update_projects_module: undefined;
  update_personal_department_module: undefined;
};

export const NotificationEvent = createEmitter<NotificationEventList>();
