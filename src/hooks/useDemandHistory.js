import { useQuery } from '@tanstack/react-query';
import { fetchDemandHistory } from '../services/api/httpRequests';

/**
 * Custom hook to fetch demand history for a powermeter and user, given a time range.
 * @param {string} user_id
 * @param {string|number} powermeter_id
 * @param {string} start_utc - ISO string (UTC)
 * @param {string} end_utc - ISO string (UTC)
 * @param {string} mode - DEMO, DEV, PRODUCTION
 * @returns {object} React Query result
 */
export function useDemandHistory(user_id, powermeter_id, start_utc, end_utc, mode = 'PRODUCTION') {
  return useQuery({
    queryKey: ['demandHistory', user_id, powermeter_id, start_utc, end_utc, mode],
    queryFn: () => fetchDemandHistory(user_id, powermeter_id, start_utc, end_utc, mode),
    enabled: !!user_id && !!powermeter_id && !!start_utc && !!end_utc,
    staleTime: 1000 * 60 * 5, // 5 minutes
    cacheTime: 1000 * 60 * 10, // 10 minutes
  });
}
