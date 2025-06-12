import { useQuery } from '@tanstack/react-query';
import { fetchThdProfile } from '../services/api/httpRequests';

/**
 * Custom hook to fetch consumption profile for a powermeter and user, given a time range and interval.
 * @param {string} user_id
 * @param {string|number} powermeter_id
 * @param {string} time_interval - 'hour', 'day', 'month', etc.
 * @param {string} start_utc - ISO string (UTC)
 * @param {string} end_utc - ISO string (UTC)
 * @param {string} mode - DEMO, DEV, PRODUCTION
 * @param {object} options - React Query options
 * @returns {object} React Query result
 */
export function useThdProfile(user_id, powermeter_id, time_interval, start_utc, end_utc, mode = 'PRODUCTION', options = {}) {
  return useQuery({
    queryKey: ['ThdProfile', user_id, powermeter_id, time_interval, start_utc, end_utc, mode],
    queryFn: () => fetchThdProfile(user_id, powermeter_id, time_interval, start_utc, end_utc, mode),
    enabled: !!user_id && !!powermeter_id && !!time_interval && !!start_utc && !!end_utc && (options.enabled === undefined ? true : options.enabled),
    staleTime: 1000 * 60 * 5, // 5 minutes
    cacheTime: 1000 * 60 * 10, // 10 minutes
    ...options,
  });
}
