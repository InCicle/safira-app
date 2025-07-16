import { useQuery } from '@tanstack/react-query';
import { getAllPermissions } from '.';
import { getUser } from '@/utils/getUser';
import { usePermissions } from '@/hooks/usePermissions';

export function useGetPermissionsQuery() {
  const user = getUser();
  const { permissions, companyId } = usePermissions();
  const isPersonWithoutCompany = user?.type === 'PERSON' && !companyId;

  const { data = [], isLoading } = useQuery({
    queryKey: ['permissions', companyId],
    queryFn: () =>
      getAllPermissions(companyId || user?.profile_id).then((response) => {
        return response;
      }),
    enabled: !isPersonWithoutCompany,
    staleTime: 1000 * 60 * 1,
    refetchInterval: 1000 * 60 * 1,
    initialData: permissions ? permissions : undefined,
  });

  return {
    data,
    isLoading,
  };
}
