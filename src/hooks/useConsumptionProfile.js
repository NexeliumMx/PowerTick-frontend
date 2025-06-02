import { useQuery } from '@tanstack/react-query';
import { fetchConsumptionProfile } from '../services/api/httpRequests';

export function useConsumptionProfile(user_id, serial_number, time_interval, mode = 'PRODUCTION') {
  return useQuery({
    queryKey: ['consumptionProfile', user_id, serial_number, time_interval, mode],
    queryFn: () => fetchConsumptionProfile(user_id, serial_number, time_interval, mode),
    enabled: !!user_id && !!serial_number && !!time_interval,
    staleTime: 1000 * 60 * 5, // 5 minutes
    cacheTime: 1000 * 60 * 10, // 10 minutes
  });
}
