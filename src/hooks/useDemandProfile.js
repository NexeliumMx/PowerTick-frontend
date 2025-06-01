import { useQuery } from '@tanstack/react-query';
import { fetchDemandProfile } from '../services/api/httpRequests';

export function useDemandProfile(user_id, serial_number, time_interval, mode = 'PRODUCTION') {
  return useQuery({
    queryKey: ['demandProfile', user_id, serial_number, time_interval, mode],
    queryFn: () => fetchDemandProfile(user_id, serial_number, time_interval, mode),
    enabled: !!user_id && !!serial_number && !!time_interval,
    staleTime: 1000 * 60 * 5, // 5 minutes
    cacheTime: 1000 * 60 * 10, // 10 minutes
  });
}
