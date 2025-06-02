import { useQuery } from '@tanstack/react-query';
import { fetchDemandHistory } from '../services/api/httpRequests';

export function useDemandHistory(user_id, serial_number, time_interval, mode = 'PRODUCTION') {
  return useQuery({
    queryKey: ['demandHistory', user_id, serial_number, time_interval, mode],
    queryFn: () => fetchDemandHistory(user_id, serial_number, time_interval, mode),
    enabled: !!user_id && !!serial_number && !!time_interval,
    staleTime: 1000 * 60 * 5, // 5 minutes
    cacheTime: 1000 * 60 * 10, // 10 minutes
  });
}
