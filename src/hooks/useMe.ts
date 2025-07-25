import { useEffect } from 'react';
import { useGetMeQuery } from '../services/api/profile';
import { useProfileStore } from '../store/useProfileStore';

export function useMe() {
  const { me } = useProfileStore();
  const { isLoading, refetch } = useGetMeQuery();
  const hasMe = me && Object.keys(me).length > 0;

  useEffect(() => {
    if (hasMe || isLoading) return;
    refetch();
  }, [hasMe, isLoading, refetch, me]);
}
