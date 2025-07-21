import { DefaultMainLayout } from '@/components/DefaultMainLayout';
import { useMe } from '@/hooks/useMe';
import { usePermissions } from '@/hooks/usePermissions';
import { FC, PropsWithChildren } from 'react';

export const ApplicationProvider: FC<PropsWithChildren> = ({ children }) => {
  useMe();
  usePermissions();
  return <DefaultMainLayout>{children}</DefaultMainLayout>;
};
