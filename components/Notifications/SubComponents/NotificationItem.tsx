import React, { useMemo } from 'react';

import { INotificationProps } from '@/safira-app/interfaces/Notification';

import { NotificationDTO } from '../DTO/NotificationDTO';

interface Props {
  data: INotificationProps;
}

const NotificationItem: React.FC<Props> = ({ data }) => {
  const notificationDTO = useMemo(() => {
    return new NotificationDTO(data);
  }, [data]);

  return notificationDTO.toDropdown();
};

export default NotificationItem;
