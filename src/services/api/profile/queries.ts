import { useQuery } from '@tanstack/react-query';
import { useProfileStore } from '@/store/useProfileStore';
import { getMe } from './requests';
import { MINUTE_IN_MILLISECONDS } from '@/utils/constants';
import { useAuthStore } from '@/store/useAuthStore';

export function useGetMeQuery() {
  const { user } = useAuthStore();
  const { me, companyId, setMe } = useProfileStore();

  return useQuery({
    queryKey: ['auth', companyId],
    queryFn: () =>
      getMe().then(response => {
        setMe(response);
        return response;
      }),
    enabled: Boolean(user),
    staleTime: MINUTE_IN_MILLISECONDS * 3,
    refetchInterval: MINUTE_IN_MILLISECONDS * 3,
    initialData: me,
  });
}
