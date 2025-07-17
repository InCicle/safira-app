import { create } from 'zustand';
import { IPermission } from '@/services/api/permissions/types';
import { createJSONStorage, persist } from 'zustand/middleware';

export interface PermissionsStore {
  permissions: IPermission[];
  checkPermission: (slugs: string[]) => boolean;
  setPermissions: (permissions: IPermission[]) => void;
}

export const usePermissionsStore = create<PermissionsStore>()(
  persist(
    (set, get) => {
      return {
        permissions: [],
        setPermissions: (permissions: IPermission[]) => set({ permissions }),
        checkPermission: (slugs: string[]) => {
          const { permissions } = get();
          return slugs.every(slug => permissions.some(permission => permission.slug === slug));
        },
      };
    },
    {
      name: 'permissions-storage',
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);
