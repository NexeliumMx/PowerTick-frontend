import { useQuery } from '@tanstack/react-query';
import { fetchDemandProfile } from '../api/httpRequests';

export function useDemandProfile(user_id, serial_number, time_interval) {
  return useQuery({
    queryKey: ['demandProfile', user_id, serial_number, time_interval],
    queryFn: () => fetchDemandProfile(user_id, serial_number, time_interval),
    enabled: !!user_id && !!serial_number && !!time_interval,
    staleTime: 1000 * 60 * 5, // 5 minutes
    cacheTime: 1000 * 60 * 10, // 10 minutes
  });
}
