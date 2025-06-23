import { useQuery } from '@tanstack/react-query';
import { fetchRealTimeData } from '../api/httpRequests';

export function useRealTimeData(user_id, powermeter_id, mode = 'PRODUCTION', options = {}) {
  return useQuery({
    queryKey: ['realTimeData', user_id, powermeter_id, mode],
    queryFn: () => fetchRealTimeData(user_id, powermeter_id, mode),
    enabled: !!user_id && !!powermeter_id && (options.enabled === undefined ? true : options.enabled),
    staleTime: 1000 * 30, // 30 seconds
    cacheTime: 1000 * 60 * 5, // 5 minutes
    ...options,
  });
}
