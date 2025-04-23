import { useContext } from 'react';
import { NotificationContext } from '../contexts/NotificationContext';

export function useNotifications() {
  const notificationsContextData = useContext(NotificationContext);
  return notificationsContextData;
}
