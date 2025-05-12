import { useQuery } from '@tanstack/react-query';
import { fetchRealTimeData } from '../api/httpRequests';

export function useRealTimeData(user_id, serial_number) {
  return useQuery({
    queryKey: ['realTimeData', user_id, serial_number],
    queryFn: () => fetchRealTimeData(user_id, serial_number),
    enabled: !!user_id && !!serial_number,
    staleTime: 1000 * 30, // 30 seconds
    cacheTime: 1000 * 60 * 5, // 5 minutes
  });
}
