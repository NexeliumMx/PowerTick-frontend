import { useQuery } from '@tanstack/react-query';
import { fetchRealTimeData } from '../services/api/httpRequests';

export function useRealTimeData(user_id, powermeter_id, mode = 'PRODUCTION') {
  return useQuery({
    queryKey: ['realTimeData', user_id, powermeter_id, mode],
    queryFn: () => fetchRealTimeData(user_id, powermeter_id, mode),
    enabled: !!user_id && !!powermeter_id,
    staleTime: 1000 * 30, // 30 seconds
    cacheTime: 1000 * 60 * 5, // 5 minutes
  });
}
