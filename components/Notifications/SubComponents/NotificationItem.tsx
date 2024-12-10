import React, { useMemo } from 'react';

import { NotificationDTO } from '../DTO/NotificationDTO';
import { NotificationProps } from '@/safira-app/services/notifications';

interface Props {
  data: NotificationProps;
}

const NotificationItem: React.FC<Props> = ({ data }) => {
  const notificationDTO = useMemo(() => {
    return new NotificationDTO(data);
  }, [data]);

  return notificationDTO.toDropdown();
};

export default NotificationItem;
