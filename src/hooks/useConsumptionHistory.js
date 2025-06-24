import { useQuery } from '@tanstack/react-query';
import { fetchConsumptionHistory } from '../api/httpRequests';

/**
 * Custom hook to fetch consumption history for a powermeter and user, given a time range.
 * @param {string} user_id
 * @param {string|number} powermeter_id
 * @param {string} start_utc - ISO string (UTC)
 * @param {string} end_utc - ISO string (UTC)
 * @param {string} mode - DEMO, DEV, PRODUCTION
 * @returns {object} React Query result
 */
export function useConsumptionHistory(user_id, powermeter_id, start_utc, end_utc, mode = 'PRODUCTION', options = {}) {
  return useQuery({
    queryKey: ['consumptionHistory', user_id, powermeter_id, start_utc, end_utc, mode],
    queryFn: () => fetchConsumptionHistory(user_id, powermeter_id, start_utc, end_utc, mode),
    enabled: !!user_id && !!powermeter_id && !!start_utc && !!end_utc && (options.enabled === undefined ? true : options.enabled),
    staleTime: 1000 * 60 * 5, // 5 minutes
    cacheTime: 1000 * 60 * 10, // 10 minutes
    ...options,
  });
}
