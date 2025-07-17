import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { IMe } from '@/interfaces/Me';

export interface ProfileStore {
  me: IMe;
  companyId: string | null;
  setMe: (me: IMe) => void;
  setCompanyId: (companyId: string) => void;
}

export const useProfileStore = create<ProfileStore>()(
  persist(
    (set, get) => ({
      me: {} as IMe,
      companyId: null,
      setMe: (me: IMe) => set({ me }),
      setCompanyId: (companyId: string) => {
        const selectedCompanyId = get().companyId;
        if (selectedCompanyId === companyId) return;
        set({ companyId });
      },
    }),
    {
      name: 'profile-storage',
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);
