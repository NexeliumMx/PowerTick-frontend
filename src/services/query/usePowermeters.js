import { useQuery } from '@tanstack/react-query';
import { fetchPowermetersByUserAccess } from '../api/httpRequests';

export function usePowermeters(user_id) {
  return useQuery({
    queryKey: ['powermeters', user_id],
    queryFn: () => fetchPowermetersByUserAccess(user_id),
    enabled: !!user_id, // Only run if user_id is available
    staleTime: 1000 * 60 * 5, // 5 minutes
    cacheTime: 1000 * 60 * 10, // 10 minutes
  });
}