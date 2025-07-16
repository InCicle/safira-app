import { useQuery } from '@tanstack/react-query';
import { useProfile } from '@/hooks/useProfile';
import { getMe } from '../auth/requests.ts';
import { getUser } from '@/utils/getUser.ts';
import { usePermissions } from '@/hooks/usePermissions.ts';

export function useGetMeQuery() {
  const user = getUser();
  const { me: storedMe, setMe } = useProfile();
  const { companyId } = usePermissions();

  const { isLoading, refetch } = useQuery({
    queryKey: ['auth', companyId],
    queryFn: () =>
      getMe().then((response) => {
        setMe(response.data);
        return response;
      }),
    enabled: Boolean(user),
    staleTime: 1000 * 60 * 3,
    refetchInterval: 1000 * 60 * 3,
    initialData: {
      data: storedMe,
    },
  });

  return {
    isLoading,
    refetch,
  };
}
