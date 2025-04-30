import React, { useMemo } from 'react';

import { NotificationDTO } from '@/safira-app/services/notifications/DTO';
import { NotificationProps } from '@/safira-app/services/queries/notifications';

interface Props {
  data: NotificationProps;
}

export const NotificationItem: React.FC<Props> = ({ data }) => {
  const factory = useMemo(() => {
    return new NotificationDTO(data);
  }, [data]);

  return factory.toDropdown();
};
