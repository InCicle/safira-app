import { useEffect } from 'react';
import { useGetMeQuery } from '../services/api/profile';
import { useProfile } from '../hooks/useProfile';

export function useMe() {
  const { me } = useProfile();
  const { isLoading, refetch } = useGetMeQuery();
  const hasMe = me && Object.keys(me).length > 0;

  useEffect(() => {
    if (hasMe || isLoading) return;
    refetch();
  }, [hasMe, isLoading, refetch]);

  return {
    isLoadingMe: isLoading,
  };
}
