import React, { useMemo } from 'react';

import { NotificationDTO } from '@/services/notifications/DTO';
import { NotificationProps } from '@/services/api/notifications';

interface Props {
  data: NotificationProps;
}

export const NotificationItem: React.FC<Props> = ({ data }) => {
  const factory = useMemo(() => {
    return new NotificationDTO(data);
  }, [data]);

  return factory.toDropdown();
};
