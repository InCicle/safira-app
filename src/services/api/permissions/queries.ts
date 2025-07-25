import { useQuery } from '@tanstack/react-query';
import { getAllPermissions } from '.';
import { useProfileStore } from '@/store/useProfileStore';
import { usePermissionsStore } from '@/store/usePermissionsStore';
import { useAuthStore } from '@/store/useAuthStore';
import { MINUTE_IN_MILLISECONDS } from '@/utils/constants';

export function useGetPermissionsQuery() {
  const user = useAuthStore(state => state.user);
  const { companyId } = useProfileStore();
  const { permissions, setPermissions } = usePermissionsStore();
  const isPersonWithoutCompany = user?.type === 'PERSON' && !companyId;

  return useQuery({
    queryKey: ['permissions', companyId],
    queryFn: () =>
      getAllPermissions().then(response => {
        setPermissions(response);
        return response;
      }),
    enabled: !isPersonWithoutCompany,
    staleTime: MINUTE_IN_MILLISECONDS * 3,
    refetchInterval: MINUTE_IN_MILLISECONDS * 3,
    initialData: permissions ? permissions : undefined,
  });
}
