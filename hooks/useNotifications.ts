import { useContext } from 'react';
import { NotificationContext } from '../contexts/NotificationProvider';

export function useNotifications() {
  const notificationsContextData = useContext(NotificationContext);
  return notificationsContextData;
}
