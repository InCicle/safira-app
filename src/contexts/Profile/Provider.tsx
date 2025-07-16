import { ProfileContext } from '@/contexts/Profile/Context';
import { links } from '@/utils/links';
import { IMe } from '@/interfaces/Me';
import { api } from '@/services/api';
import { AxiosResponse } from 'axios';
import { useCallback, useEffect, useState } from 'react';

const ProfileProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [me, setMe] = useState<IMe>({} as IMe);

  const getMe = useCallback(async () => {
    const response: AxiosResponse<IMe> = await api.get(
      `${links.api.schedule}/auth/me`,
    );
    return response.data;
  }, []);

  useEffect(() => {
    getMe().then((data) => setMe(data));
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

export default ProfileProvider;
