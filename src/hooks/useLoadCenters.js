import { useQuery } from '@tanstack/react-query';
import { fetchLoadCenters } from '../api/httpRequests';

/**
 * Custom hook to fetch demand history for a powermeter and user, given a time range.
 * @param {string} user_id
 * @param {string} mode - DEMO, DEV, PRODUCTION
 * @returns {object} React Query result
 */
export function useLoadCenters(user_id, mode = 'PRODUCTION', options = {}) {
  return useQuery({
    queryKey: ['loadCenters', user_id, mode],
    queryFn: () => fetchLoadCenters(user_id, mode),
    enabled: !!user_id && (options.enabled === undefined ? true : options.enabled),
    staleTime: 1000 * 60 * 5, // 5 minutes
    cacheTime: 1000 * 60 * 10, // 10 minutes
    ...options,
  });
}
