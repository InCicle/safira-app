import React, { useMemo } from 'react';

import { NotificationFactory } from '../Factory/NotificationFactory';
import { NotificationProps } from 'safira-app/services/notifications';

interface Props {
  data: NotificationProps;
}

export const NotificationItem: React.FC<Props> = ({ data }) => {
  const factory = useMemo(() => {
    return new NotificationFactory(data);
  }, [data]);

  return factory.toDropdown();
};

