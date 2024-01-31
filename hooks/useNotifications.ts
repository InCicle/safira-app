import { useContext } from 'react';
import { NotificationSocketContext } from '../contexts/NotificationSocketContext';

export function useNotifications() {
  const notificationsContextData = useContext(NotificationSocketContext);
  return notificationsContextData;
}
