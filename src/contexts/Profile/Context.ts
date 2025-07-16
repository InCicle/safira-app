import { createContext } from 'react';

// interfaces
import { IMe } from '@/interfaces/Me';
import { ISetState } from '@/interfaces/SetState';

export interface IProfileContext {
  me: IMe;
  setMe: ISetState<IMe>;
  getMe: () => Promise<IMe>;
}

export const ProfileContext = createContext<IProfileContext>(
  {} as IProfileContext,
);
