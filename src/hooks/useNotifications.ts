import { useContext } from 'react';
import { NotificationContext } from '@/contexts/Notification/Context';

export function useNotifications() {
  const notificationsContextData = useContext(NotificationContext);
  return notificationsContextData;
}
