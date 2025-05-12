import { useQuery } from '@tanstack/react-query';
import { fetchConsumptionHistory } from '../api/httpRequests';

export function useConsumptionHistory(user_id, serial_number, time_interval) {
  return useQuery({
    queryKey: ['consumptionHistory', user_id, serial_number, time_interval],
    queryFn: () => fetchConsumptionHistory(user_id, serial_number, time_interval),
    enabled: !!user_id && !!serial_number && !!time_interval,
    staleTime: 1000 * 60 * 5, // 5 minutes
    cacheTime: 1000 * 60 * 10, // 10 minutes
  });
}
