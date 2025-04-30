import React, { createContext, useCallback, useEffect, useState } from 'react';
import { links } from '@/safira-app/config/links';
import { api } from '@/services/api';
import { AxiosResponse } from 'axios';
import { MeProps } from '@/safira-app/interfaces/Me';

export interface ProfileContextProps {
  me: MeProps;
  setMe: React.Dispatch<React.SetStateAction<MeProps>>;
  getMe: () => Promise<MeProps>;
}

const ProfileContext = createContext<ProfileContextProps>({} as any);

const ProfileProvider: React.FC<React.PropsWithChildren<unknown>> = ({ children }) => {
  const [me, setMe] = useState<MeProps>({} as MeProps);

  const getMe = useCallback(async () => {
    const response: AxiosResponse<MeProps> = await api.get(`${links.api.schedule}/auth/me`);
    return response.data;
  }, []);

  useEffect(() => {
    getMe().then(data => setMe(data));
  }, [getMe]);

  return (
    <ProfileContext.Provider
      value={{
        me,
        setMe,
        getMe,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

export { ProfileProvider, ProfileContext };
